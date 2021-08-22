import React from "react";
import { Snackbar } from "@material-ui/core";

type ErrorMessageProps = {
  message: string;
};
export default function ErrorMessage({ message }: ErrorMessageProps) {
  return <Snackbar message={message} open />;
}
