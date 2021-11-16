import { ReactElement } from "react";
import { VoidMethod } from "types/cardId";

export interface ModalProps {
  show: boolean;
  close: VoidMethod;
  title: string;
  children: ReactElement;
}
