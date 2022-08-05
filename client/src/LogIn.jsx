import { useEffect, useState } from 'react';
import * as Formik from 'formik';
import * as Yup from 'yup';
import './LogIn.css';

// Ponerle más restricciones a cada campo (aprender RegEx)
const MAX_STRING_LENGTH = 100;
const maxStringLengthSchema = (label) => {
  return (
    Yup.string()
      .trim()
      .required(`El campo '${label}' es obligatorio`)
      .max(MAX_STRING_LENGTH,
        `${label} no puede exceder los ${MAX_STRING_LENGTH} caractéres`
      )
  );
};

const phoneNumberSchema = Yup.string()
  .trim()
  .required("El campo 'número de télefono' es obligatorio")
  .matches(/^\d+$/, "El número de teléfeno solo puede contener dígitos")
  .length(8, "El número de teléfono tiene que tener 8 dígitos");

const Field = ({
  label, className,
  updateErrorMessage,
  isSubmitting,
  ...props
}) => {
  const [field, meta] = Formik.useField({ ...props });

  useEffect(() => {
    if (isSubmitting && meta.error !== undefined)
      updateErrorMessage(meta.error);
  }, [meta.error, isSubmitting, updateErrorMessage]);

  return (
    <label className="Field">
      {label}

      <input
        {...field}
        {...props}
      />
    </label>
  );
};

const SignUpForm = ({ updateErrorMessage }) => {
  return (
    <Formik.Formik
      initialValues={{
        username: '',
        name: '',
        surname1: '',
        surname2: '',
        phoneNumber: '',
        password: ''
      }}
      validationSchema={Yup.object({
        username: maxStringLengthSchema("nombre de usuario"),
        name: maxStringLengthSchema("nombre"),
        surname1: maxStringLengthSchema("primer apellido"),
        surname2: maxStringLengthSchema("segundo apellido"),
        phoneNumber: phoneNumberSchema,
        password: maxStringLengthSchema("contraseña")
      })}
      onSubmit={(values, { setSubmitting }) => {
        console.log("Se creó una cuenta: " + JSON.stringify(values));
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Formik.Form className="SignUpForm">
          <Field
            updateErrorMessage={updateErrorMessage}
            isSubmitting={isSubmitting}
            name="username"
            label="Nombre de usuario"
            type="text"
          />
          <Field
            updateErrorMessage={updateErrorMessage}
            isSubmitting={isSubmitting}
            name="name"
            label="Nombre"
            type="text"
          />
          <Field
            updateErrorMessage={updateErrorMessage}
            isSubmitting={isSubmitting}
            name="surname1"
            label="Primer apellido"
            type="text"
          />
          <Field
            updateErrorMessage={updateErrorMessage}
            isSubmitting={isSubmitting}
            name="surname2"
            label="Segundo apellido"
            type="text"
          />
          <Field
            updateErrorMessage={updateErrorMessage}
            isSubmitting={isSubmitting}
            name="phoneNumber"
            label="Número de teléfono"
            type="tel"
          />
          <Field
            updateErrorMessage={updateErrorMessage}
            isSubmitting={isSubmitting}
            name="password"
            label="Contraseña"
            type="password"
          />

          <button type="submit">Crear cuenta</button>
        </Formik.Form>
      )}
    </Formik.Formik>
  );
};

const SignInForm = ({ updateErrorMessage }) => {
  return (
    <Formik.Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={Yup.object({
        username: maxStringLengthSchema("nombre de usuario"),
        password: maxStringLengthSchema("contraseña")
      })}
      onSubmit={(values, { setSubmitting }) => {
        console.log("Se inició sesión: " + JSON.stringify(values));
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Formik.Form className="SignInForm">
          <Field
            updateErrorMessage={updateErrorMessage}
            isSubmitting={isSubmitting}
            name="username"
            label="Nombre de usuario"
            type="text"
          />

          <Field
            updateErrorMessage={updateErrorMessage}
            isSubmitting={isSubmitting}
            name="password"
            label="Contraseña"
            type="password"
          />

          <button type="submit">Iniciar sesión</button>
        </Formik.Form>
      )}
    </Formik.Formik>
  );
};

const ModeSelect = ({
  isSigningUp, updateIsSigningUp
}) => {
  return (
    <div>
      <button
        className={
          isSigningUp ?
          "ModeSelect-selected" :
          null
        }
        onClick={() => updateIsSigningUp(true)}
      >
        Crear Cuenta
      </button>

      <button
        className={
          !isSigningUp ?
          "ModeSelect-selected" :
          null
        }
        onClick={() => updateIsSigningUp(false)}
      >
        Iniciar sesión
      </button>
    </div>
  );
};

const FormBox = ({ updateErrorMessage }) => {
  const [isSigningUp, setIsSigningUp] = useState(true);

  return (
    <div>
      <ModeSelect
        isSigningUp={isSigningUp}
        updateIsSigningUp={setIsSigningUp}
      />

      {
        isSigningUp ?
          <SignUpForm
            updateErrorMessage={updateErrorMessage}
          /> :
          <SignInForm
            updateErrorMessage={updateErrorMessage}
          />
      }
    </div>
  );
};

const ErrorBox = ({
  message, updateErrorMessage
}) => {
  return (
    <div
      className={[
        (
        message === "" ?
        "ErrorBox-invisible" :
        null
        ),
        "ErroxBox-div",
        "red"
      ]
      .join(" ")
      }
    >
      <button onClick={() => updateErrorMessage("")}>
        X
      </button>

      <span>
        {message}
      </span>
    </div>
  );
};

const LogIn = () => {
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div>
      <ErrorBox
        message={errorMessage}
        updateErrorMessage={setErrorMessage}
      />

      <FormBox
        updateErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default LogIn;