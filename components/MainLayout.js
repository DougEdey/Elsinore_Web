import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";

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

export default function MainLayout() {
  const classes = useStyles();
  return (
    <App>
      <Header />
      <Toolbar />
      <Container className={classes.content} />
      <ActionFab />
    </App>
  );
}
