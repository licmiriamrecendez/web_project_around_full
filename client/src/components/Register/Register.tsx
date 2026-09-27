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


  const handleSubmit = (
  event: React.FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  onRegister(email, password);
};

  return (
  <main className="register-page">
    <div className="register">
      <h2 className="register__title">Regístrate</h2>

      <form className="register__form" onSubmit={handleSubmit}>
        <input
          className="register__input"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <input
          className="register__input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button className="register__button" type="submit">
          Registrarse
        </button>

        <p className="register__login">
           ¿Ya eres miembro?{" "}
        <Link className="register__login-link" to="/signin">
            Inicia sesión aquí
         </Link>
</p>
      </form>
    </div>
  </main>
);
}

export default Register;  