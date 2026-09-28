import { useState } from "react";

type LoginProps = {
  onLogin: (email: string, password: string) => void;
};

function Login({ onLogin }: LoginProps): React.JSX.Element {
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

    onLogin(email, password);
  };

  const isFormValid =
    email !== "" &&
    password.length >= 6;

  return (
    <main className="login-page">
      <div className="login">
        <h2 className="login__title">Inicia sesión</h2>

        <form
          className="login__form"
          onSubmit={handleSubmit}
          noValidate
        >
          <input
            className={`login__input ${
              emailError ? "login__input_type_error" : ""
            }`}
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={handleEmailChange}
            required
          />

          <span className="login__error">
            {emailError}
          </span>

          <input
            className={`login__input ${
              passwordError ? "login__input_type_error" : ""
            }`}
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={handlePasswordChange}
            minLength={6}
            required
          />

          <span className="login__error">
            {passwordError}
          </span>

          <button
            className="login__button"
            type="submit"
            disabled={!isFormValid}
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;