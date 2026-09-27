import { useState } from "react";

type LoginProps = {
  onLogin: (email: string, password: string) => void;
};

function Login({ onLogin }: LoginProps): React.JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleSubmit = (
  event: React.FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  onLogin(email, password);

};

return (
  <main className="login-page">
  <div className="login">
    <h2 className="login__title">Inicia sesión</h2>

    <form className="login__form" onSubmit={handleSubmit}>
      <input
        className="login__input"
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />

      <input
        className="login__input"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />

      <button className="login__button" type="submit">
        Iniciar sesión
      </button>
    </form>
      </div>
  </main>
);
}

export default Login;