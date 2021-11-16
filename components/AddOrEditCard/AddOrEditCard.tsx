import * as Yup from "yup";
import { Formik } from "formik";

import {
  Button,
  ButtonVariants,
  CreditCard,
  CreditCardData,
  InputField
} from "components/index";
import { cardService } from "services";
import { AddOrEditCardProps } from "./AddOrEditCard.model";
import styles from "styles/components/AddOrEditCard.module.scss";
import {
  cardNumberFormatter,
  expiryDateFormatter
} from "./AddOrEditCard.utils";

export { AddOrEditCard };

function AddOrEditCard({
  cardToEdit,
  parentHandler
}: AddOrEditCardProps): JSX.Element {
  const card = cardToEdit;
  const isEditEnabled = !card;

  const validationSchema = Yup.object().shape({
    nameInCard: Yup.string().required("Please fill in your name"),
    cardNumber: Yup.string().required(
      "Please enter a valid credit card number"
    ),
    expiryDate: Yup.string().required("Please enter card expiration date"),
    ccv: Yup.string()
      .max(3, "CCV should not be more than 3 characters")
      .required("Please enter a valid security code")
  });

  function onSubmit(data) {
    console.error("please don't call this");
    return isEditEnabled ? createCard(data) : updateCard(card.id, data);
  }

  function createCard(data: CreditCardData) {
    return cardService.create(data).then(parentHandler);
  }

  function updateCard(id: number, data: CreditCardData) {
    return cardService.update(id, data).then(parentHandler);
  }

  function deleteCard(id: number) {
    cardService.delete(id).then(parentHandler);
  }

  function handleCreditCardValue(e, change) {
    if (e.target.value) {
      e.target.value = cardNumberFormatter(e.target.value);
    }
    change(e);
  }

  function handleExpiryDate(e, change) {
    if (e.target.value) {
      e.target.value = expiryDateFormatter(e.target.value);
    }
    change(e);
  }

  return (
    <div className="wrapper">
      <div className="row">
        <Formik
          initialValues={
            card || { nameInCard: "", cardNumber: "", expiryDate: "", ccv: "" }
          }
          onSubmit={async (values) => {
            await onSubmit(values);
          }}
          validationSchema={validationSchema}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit
            } = props;
            return (
              <form onSubmit={handleSubmit} className="col">
                {!isEditEnabled && (
                  <div className={styles.formCreditCard}>
                    <CreditCard data={props.values as CreditCardData} />
                  </div>
                )}
                <InputField
                  name={"nameInCard"}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.nameInCard}
                  placeholder={"John Doe"}
                  error={errors.nameInCard}
                  touched={touched.nameInCard}
                  label={"Name in card"}
                />
                <InputField
                  name={"cardNumber"}
                  handleChange={(e) => handleCreditCardValue(e, handleChange)}
                  handleBlur={handleBlur}
                  value={values.cardNumber}
                  placeholder={"0000 0000 0000 0000"}
                  error={errors.cardNumber}
                  touched={touched.cardNumber}
                  label={"Card number"}
                />
                <InputField
                  name={"expiryDate"}
                  handleChange={(e) => handleExpiryDate(e, handleChange)}
                  handleBlur={handleBlur}
                  value={values.expiryDate}
                  placeholder={"05/25"}
                  error={errors.expiryDate}
                  touched={touched.expiryDate}
                  label={"Expiry Date"}
                />
                <InputField
                  name={"ccv"}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.ccv}
                  placeholder={"333"}
                  error={errors.ccv}
                  touched={touched.ccv}
                  label={"CCV"}
                />
                <div>
                  {isEditEnabled ? (
                    <div className={styles.submitGroup}>
                      <Button
                        label={"Continue"}
                        variant={ButtonVariants.primary}
                        additionalData={{
                          type: "submit",
                          disabled: isSubmitting
                        }}
                      />
                    </div>
                  ) : (
                    <div className={styles.submitGroup}>
                      <Button
                        label={"Confirm"}
                        variant={ButtonVariants.primary}
                        additionalData={{
                          type: "submit",
                          disabled: isSubmitting
                        }}
                      />
                      <Button
                        label={"Delete Card"}
                        variant={ButtonVariants.secondary}
                        additionalData={{
                          type: "button",
                          disabled: isSubmitting,
                          onClick: () => deleteCard(card.id)
                        }}
                      />
                    </div>
                  )}
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
