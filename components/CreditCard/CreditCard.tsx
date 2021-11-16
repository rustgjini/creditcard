import { CreditCardProps } from "./CreditCard.model";
import styles from "styles/components/CreditCard.module.scss";
import { DEFAULT_CARD_INFO } from "./CreditCard.const";
import { getCardType } from "./CreditCard.utils";

export default CreditCard;

export { CreditCard };

function CreditCard({
  data,
  isEditEnabled = false,
  creditCardEditHandler
}: CreditCardProps): JSX.Element {
  const sendEditCardId = (id: number) => {
    creditCardEditHandler(id);
  };
  if (!data) {
    data = DEFAULT_CARD_INFO;
  }
  const company = getCardType(data.cardNumber);

  return (
    <>
      <div className={`${styles.creditCard} ${styles[`creditCard` + company]}`}>
        <div className={styles.creditCardFront}>
          <div className={styles.creditCardCover} />
          <img
            className={styles.creditCardCompany}
            src={`assets/${company.toLowerCase()}-logo.svg`}
            alt={company}
          />
          <div className={styles.creditCardTop}>
            <div className={styles.creditCardCcv}>
              <div className={styles.creditCardCcvText}>CVC</div>
              <div className={styles.creditCardCcvNumber}>{data.ccv}</div>
            </div>
            <div className={styles.creditCardExpires}>
              <div className={styles.creditCardExpiresText}>expires</div>
              <div className={styles.creditCardExpiresDate}>
                {data.expiryDate}
              </div>
            </div>
          </div>
          <div className={styles.creditCardInfo}>
            <div className={styles.creditCardInfoHolder}>{data.nameInCard}</div>
            <h1 className={styles.creditCardInfoNumber}>{data.cardNumber}</h1>
            {isEditEnabled && (
              <img
                className={styles.creditCardEdit}
                src={`assets/edit-icon.svg`}
                alt="Edit"
                onClick={() => sendEditCardId(data.id)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
