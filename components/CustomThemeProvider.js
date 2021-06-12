import React, { createContext, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "@material-ui/core/styles";

import getTheme from "../themes";

export const CustomThemeContext = createContext({
  currentTheme: "light",
  setTheme: null,
});

const CustomThemeProvider = (props) => {
  const { children } = props;

  // Get current theme from localStorage
  const currentTheme =
    typeof window === "undefined"
      ? "light"
      : localStorage.getItem("appTheme") || "light";

  // State to hold selected theme
  const [themeName, _setThemeName] = useState(currentTheme);

  // Retrieve theme object by theme name
  const theme = getTheme(themeName);

  // Wrap _setThemeName to store new theme names in localStorage
  const setThemeName = useCallback(
    (name) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("appTheme", name);
      }
      _setThemeName(name);
    },
    [_setThemeName]
  );

  const contextValue = useMemo(
    () => ({
      currentTheme: themeName,
      setTheme: setThemeName,
    }),
    [themeName, setThemeName]
  );

  return (
    <CustomThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};

export default CustomThemeProvider;

CustomThemeProvider.propTypes = {
  children: PropTypes.func | PropTypes.arrayOf(PropTypes.func),
};
