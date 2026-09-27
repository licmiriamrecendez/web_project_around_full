import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import type {
  CardData,
  PopupConfig,
} from "../../types/types";

import Card from "./Card/Card";
import NewCard from "./Popup/NewCard/NewCard";
import EditProfile from "./Popup/EditProfile/EditProfile";
import EditAvatar from "./Popup/EditAvatar/EditAvatar";
import Popup from "./Popup/Popup";

type MainProps = {
  cards: CardData[];
  popup: PopupConfig | null
  handleOpenPopup: (popup: PopupConfig) => void;
  handleClosePopup: () => void;
  handleCardLike: (card: CardData) => void;
  handleCardDelete: (card: CardData) => void;
};

function Main({
  cards,
  popup,
  handleOpenPopup,
  handleClosePopup,
  handleCardLike,
  handleCardDelete,
}: MainProps): React.JSX.Element {
  const { currentUser } = useContext(CurrentUserContext);

  const newCardPopup: PopupConfig = {
    title: "Nuevo lugar",
    children: <NewCard />,
  };

  const editProfilePopup: PopupConfig = {
    title: "Editar perfil",
    children: <EditProfile />,
  };

  const editAvatarPopup: PopupConfig = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar />,
  };

  return (
  <>
    <main className="content">
      <section className="profile page__section">
        <div className="profile__avatar-container">
          <img
            className="profile__image"
            src={currentUser?.avatar || ""}
            alt={currentUser?.name || "Avatar del usuario"}
          />

          <button
            className="profile__avatar-edit-button"
            type="button"
            aria-label="Editar avatar"
            onClick={() => handleOpenPopup(editAvatarPopup)}
          />
        </div>

        <div className="profile__info">
          <h1 className="profile__title">
            {currentUser?.name || ""}
          </h1>

          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={() => handleOpenPopup(editProfilePopup)}
          />

          <p className="profile__description">
            {currentUser?.about || ""}
          </p>
        </div>

        <button
          aria-label="Agregar tarjeta"
          className="profile__add-button"
          type="button"
          onClick={() => handleOpenPopup(newCardPopup)}
        />
      </section>

      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleOpenPopup={handleOpenPopup}
              handleCardLike={handleCardLike}
              handleCardDelete={handleCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>

    {popup && (
      <Popup
        title={popup.title}
        onClose={handleClosePopup}
        isOpen={true}
      >
        {popup.children}
      </Popup>
    )}
  </>
);
}

export default Main;