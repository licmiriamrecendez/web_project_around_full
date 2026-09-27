import type { ReactNode } from "react";

type PopupProps = {
  title?: string;
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
};

export default function Popup({
  title,
  children,
  onClose,
  isOpen,
}: PopupProps): React.JSX.Element {
  return (
    <div className={`popup ${isOpen ? "popup_is-opened" : ""}`}>
      <div
        className={`popup__content ${
          !title ? "popup__content_content_image" : ""
        }`}
      >
        <button
          aria-label="Cerrar ventana"
          className="popup__close"
          type="button"
          onClick={onClose}
        />

        {title && <h3 className="popup__title">{title}</h3>}

        {children}
      </div>
    </div>
  );
}