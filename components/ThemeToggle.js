import React, { useContext, useCallback } from "react";
import { Switch, FormControlLabel } from "@material-ui/core";

import { CustomThemeContext } from "./CustomThemeProvider";

export default function ThemeToggle() {
  const { currentTheme, setTheme } = useContext(CustomThemeContext);
  const isDark = Boolean(currentTheme === "dark");

  const handleThemeChange = useCallback(() => {
    if (isDark) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }, [setTheme, isDark]);

  return (
    <FormControlLabel
      control={<Switch checked={isDark} onChange={handleThemeChange} />}
      label="Theme"
    />
  );
}
