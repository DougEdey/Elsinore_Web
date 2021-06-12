import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import ThemeToggle from "./ThemeToggle";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
    alignSelf: "flex-end",
  },
}));

export default function Header() {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography vairant="h6" className={classes.title}>
          Elsinore
        </Typography>
        <ThemeToggle />
      </Toolbar>
    </AppBar>
  );
}
