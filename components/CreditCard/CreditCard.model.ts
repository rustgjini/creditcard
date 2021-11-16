export interface CreditCardProps {
  isEditEnabled?: boolean;
  data?: CreditCardData;
  creditCardEditHandler?: any;
}

export enum CardTypes {
  Mastercard = "MasterCard",
  Visa = "Visa"
}

export interface CreditCardData {
  id: number;
  nameInCard: string;
  cardNumber: string;
  expiryDate: string;
  ccv: string;
}
