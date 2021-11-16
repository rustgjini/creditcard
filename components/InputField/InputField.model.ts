import { ChangeEventHandler } from "react";
import { FormikErrors } from "formik";

export interface InputFieldProps {
  name: string;
  handleChange: ChangeEventHandler;
  handleBlur: ChangeEventHandler;
  value: string;
  placeholder: string;
  error?: string | FormikErrors<any> | string[] | FormikErrors<any>[];
  touched: any;
  label: string;
}
