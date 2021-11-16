import { CardTypes } from "./CreditCard.model";

export const getCardType = (number?: string): CardTypes => {
  let re = new RegExp("^4");
  if (number?.match(re) != null) return CardTypes.Visa;

  re = new RegExp("^5[1-5]");
  if (number?.match(re) != null) return CardTypes.Mastercard;

  return CardTypes.Visa;
};
