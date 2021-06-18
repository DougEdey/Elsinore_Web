import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import { I18nContext, I18nManager } from "@shopify/react-i18n";

import App from "./App";
import Header from "./Header";
import Container from "./Container";
import ActionFab from "./ActionFab";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
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
  return (
    <I18nContext.Provider value={i18nManager}>
      <App>
        <Header />
        <Toolbar />
        <Container className={classes.content} />
        <ActionFab />
      </App>
    </I18nContext.Provider>
  );
}
