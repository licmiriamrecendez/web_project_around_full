import { useContext, useRef } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function EditAvatar(): React.JSX.Element {
  const { handleUpdateAvatar } =
    useContext(CurrentUserContext);

  const avatarRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();

    if (!avatarRef.current) {
      return;
    }

    handleUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  return (
    <form
      className="popup__form"
      name="edit-avatar"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="avatar-link-input"
        name="avatar"
        type="url"
        placeholder="Enlace de la imagen"
        ref={avatarRef}
        required
      />

      <span className="popup__error" />

      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}