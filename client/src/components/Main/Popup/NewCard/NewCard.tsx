import { useContext, useState } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function NewCard(): React.JSX.Element {
  const { handleAddPlaceSubmit } =
    useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();

    handleAddPlaceSubmit({
      name,
      link,
    });
  };

  return (
    <form
      className="popup__form"
      name="new-card"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="card-name-input"
        name="name"
        type="text"
        placeholder="Título"
        minLength={1}
        maxLength={30}
        required
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <span className="popup__error" />

      <input
        className="popup__input"
        id="card-link-input"
        name="link"
        type="url"
        placeholder="Enlace de la imagen"
        required
        value={link}
        onChange={(event) => setLink(event.target.value)}
      />

      <span className="popup__error" />

      <button className="button popup__button" type="submit">
        Crear
      </button>
    </form>
  );
}
