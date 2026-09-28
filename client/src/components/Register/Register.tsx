import { useState } from "react";
import { Link } from "react-router-dom";

type RegisterProps = {
  onRegister: (email: string, password: string) => void;
};

function Register({
  onRegister,
}: RegisterProps): React.JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target;

    setEmail(input.value);
    setEmailError(input.validationMessage);
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target;

    setPassword(input.value);
    setPasswordError(input.validationMessage);
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!event.currentTarget.checkValidity()) {
      return;
    }

    onRegister(email, password);
  };

  const isFormValid =
    email !== "" &&
    password.length >= 6;

  return (
    <main className="register-page">
      <div className="register">
        <h2 className="register__title">Regístrate</h2>

        <form
          className="register__form"
          onSubmit={handleSubmit}
          noValidate
        >
          <input
            className={`register__input ${
              emailError ? "register__input_type_error" : ""
            }`}
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={handleEmailChange}
            required
          />

          <span className="register__error">
            {emailError}
          </span>

          <input
            className={`register__input ${
              passwordError ? "register__input_type_error" : ""
            }`}
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={handlePasswordChange}
            minLength={6}
            required
          />

          <span className="register__error">
            {passwordError}
          </span>

          <button
            className="register__button"
            type="submit"
            disabled={!isFormValid}
          >
            Registrarse
          </button>

          <p className="register__login">
            ¿Ya eres miembro?{" "}
            <Link
              className="register__login-link"
              to="/signin"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default Register;