import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { I18nContext, I18nManager } from "@shopify/react-i18n";
import clsx from "clsx";

import DrawerState from "./DrawerState";
import App from "./App";
import Header from "./Header";
import Container from "./Container";
import ActionFab from "./ActionFab";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  shiftTextLeft: {
    marginLeft: "0px",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  shiftTextRight: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const locale = "en";
const i18nManager = new I18nManager({
  locale,
  onError(error) {
    console.log(error);
  },
});

export default function MainLayout() {
  const classes = useStyles();
  const [drawerOpen, handleDrawerChange] = DrawerState();

  return (
    <I18nContext.Provider value={i18nManager}>
      <App>
        <Header drawerOpen={drawerOpen} setDrawerOpen={handleDrawerChange} />
        <main
          className={clsx(
            classes.content,
            drawerOpen && classes.shiftTextRight,
            !drawerOpen && classes.shiftTextLeft
          )}
        >
          <div className={classes.toolbar} />
          <Container />
        </main>
        <ActionFab />
      </App>
    </I18nContext.Provider>
  );
}
