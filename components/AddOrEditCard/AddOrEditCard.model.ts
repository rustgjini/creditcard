import { CreditCardData } from "../CreditCard";
import { VoidMethod } from "types/cardId";

export interface AddOrEditCardProps {
  cardToEdit: CreditCardData;
  parentHandler: VoidMethod;
}
