import type { ImagePopupData } from "../../../../types/types";

type ImagePopupProps = {
  card: ImagePopupData;
};

export default function ImagePopup({
  card,
}: ImagePopupProps): React.JSX.Element {
  return (
    <>
      <img
        className="popup__image"
        src={card.link}
        alt={card.name}
      />

      <p className="popup__caption">
        {card.name}
      </p>
    </>
  );
}