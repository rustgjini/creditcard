export interface ButtonProps {
  variant: ButtonVariants;
  label: string;
  handleClick?: any;
  additionalData?: any;
}

export enum ButtonVariants {
  primary = "buttonPrimary",
  secondary = "buttonSecondary"
}
