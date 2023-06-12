import "./SubmitButton.style.css";

type Props = {
  handleClick: () => void;
  disabled: boolean;
};
function SubmitButton({ handleClick, disabled }: Props) {
  return (
    <div
      onClick={() => {
        if (disabled) return;
        handleClick();
      }}
      className={`submit-btn  ${disabled && "disabled"}`}
    >
      Proveri
    </div>
  );
}

export default SubmitButton;
