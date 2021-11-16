import { InputFieldProps } from "./InputField.model";
import styles from "styles/components/InputField.module.scss";

export default InputField;

export { InputField };

function InputField(props: InputFieldProps): JSX.Element {
  return (
    <div className={styles.inputField}>
      <input
        id={props.name}
        placeholder={props.placeholder}
        type="text"
        value={props.value}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        className={styles.inputFieldElement}
      />
      <label className={styles.inputFieldLabel} htmlFor={props.name}>
        {props.label}
      </label>
      {!props.error && props.touched && (
        <img
          className={styles.inputFieldIcon}
          src={`assets/form-success.svg`}
          alt="error"
        />
      )}
      {props.error && props.touched && (
        <>
          <img
            className={styles.inputFieldIcon}
            src={`assets/form-error.svg`}
            alt="error"
          />
          <div className={styles.inputFieldError}>{props.error}</div>
        </>
      )}
    </div>
  );
}
