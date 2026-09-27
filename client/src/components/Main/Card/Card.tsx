import { useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import ImagePopup from "../Popup/ImagePopup/ImagePopup";
import type { CardData, PopupConfig } from "../../../types/types";

type CardProps = {
  card: CardData;
  handleOpenPopup: (popup: PopupConfig) => void;
  handleCardLike: (card: CardData) => void;
  handleCardDelete: (card: CardData) => void;
};

export default function Card(props: CardProps): React.JSX.Element {
  const {
    card,
    handleOpenPopup,
    handleCardLike,
    handleCardDelete,
  } = props;

  const { currentUser } = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser?._id;

  const { name, link } = card;

  const imageComponent: PopupConfig = {
    children: <ImagePopup card={card} />,
  };

  const cardLikeButtonClassName = `card__like-button ${
    card.isLiked ? "card__like-button_is-active" : ""
  }`;

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => handleOpenPopup(imageComponent)}
      />

      {isOwn && (
        <button
          aria-label="Delete card"
          className="card__delete-button"
          type="button"
          onClick={() => handleCardDelete(card)}
        />
      )}

      <div className="card__description">
        <h2 className="card__title">{name}</h2>

        <button
          aria-label="Like card"
          type="button"
          className={cardLikeButtonClassName}
          onClick={() => handleCardLike(card)}
        />
      </div>
    </li>
  );
}