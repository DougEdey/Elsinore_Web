import React, { useEffect } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { useCurrentTheme } from "../utilities/themes";

import App from "./App";
import Header from "./Header";
import DeviceList from "./DeviceList";

export default function MainLayout() {
  const [theme] = useCurrentTheme();
  
  const themeConfig = createMuiTheme(theme);
  return (
    <MuiThemeProvider theme={themeConfig}>
      <App>
        <Header/>
        <DeviceList />
      </App>
    </MuiThemeProvider>
  );
}
