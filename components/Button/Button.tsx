import { ButtonProps } from "./Button.model";

export default Button;
import styles from "styles/components/Button.module.scss";

export { Button };

function Button({
  variant,
  label,
  handleClick,
  additionalData
}: ButtonProps): JSX.Element {
  const buttonVariant = styles[variant] ? styles[variant] : "";

  return (
    <button
      className={styles.button + " " + buttonVariant}
      onClick={handleClick}
      {...additionalData}
    >
      {label}
    </button>
  );
}
