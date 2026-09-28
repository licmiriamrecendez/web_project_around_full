import { useContext, useState } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function EditProfile(): React.JSX.Element {
  const { currentUser, handleUpdateUser } =
    useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser?.name || "");
  const [description, setDescription] = useState(
    currentUser?.about || ""
  );

  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target;

    setName(input.value);
    setNameError(input.validationMessage);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target;

    setDescription(input.value);
    setDescriptionError(input.validationMessage);
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();

    if (!event.currentTarget.checkValidity()) {
      return;
    }

    handleUpdateUser({
      name,
      about: description,
    });
  };

  const isFormValid =
    name.length >= 2 &&
    name.length <= 40 &&
    description.length >= 2 &&
    description.length <= 200;

  return (
    <form
      className="popup__form"
      id="edit-profile-form"
      name="edit-profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          id="profile-name-input"
          className={`popup__input popup__input_type_name ${
            nameError ? "popup__input_type_error" : ""
          }`}
          name="name"
          placeholder="Nombre"
          minLength={2}
          maxLength={40}
          required
          type="text"
          value={name}
          onChange={handleNameChange}
        />

        <span
          className="popup__error popup__error_visible"
          id="profile-name-input-error"
        >
          {nameError}
        </span>
      </label>

      <label className="popup__field">
        <input
          id="profile-description-input"
          className={`popup__input popup__input_type_description ${
            descriptionError ? "popup__input_type_error" : ""
          }`}
          name="about"
          placeholder="Acerca de mí"
          minLength={2}
          maxLength={200}
          required
          type="text"
          value={description}
          onChange={handleDescriptionChange}
        />

        <span
          className="popup__error popup__error_visible"
          id="profile-description-input-error"
        >
          {descriptionError}
        </span>
      </label>

      <button
        className="button popup__button"
        type="submit"
        disabled={!isFormValid}
      >
        Guardar
      </button>
    </form>
  );
}