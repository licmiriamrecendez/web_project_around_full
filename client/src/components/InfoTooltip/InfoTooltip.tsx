type InfoTooltipProps = {
  isOpen: boolean;
  message: string;
  isSuccess?: boolean;
  onClose: () => void;
};

function InfoTooltip({
  isOpen,
  message,
  isSuccess = true,
  onClose,
}: InfoTooltipProps): React.JSX.Element | null {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup popup_is-opened">
      <div className="popup__content popup__content_type_info">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
        />

        <div
  className={`popup__info-icon ${
    isSuccess
      ? "popup__info-icon_type_success"
      : "popup__info-icon_type_error"
  }`}
/>

        <h2 className="popup__title">
          {message}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;