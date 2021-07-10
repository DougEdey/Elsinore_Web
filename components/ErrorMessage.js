import React from "react";
import PropTypes from "prop-types";
import { Snackbar } from "@material-ui/core";

export default function ErrorMessage({ message }) {
  return <Snackbar message={message} open />;
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
