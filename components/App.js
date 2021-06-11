import React from "react";
import PropTypes from "prop-types";

export default function App({ children }) {
  return <main>{children}</main>;
}

App.propTypes = {
  children: PropTypes.func | PropTypes.arrayOf(PropTypes.fun),
};
