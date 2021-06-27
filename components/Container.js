import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import DeviceList from "./DeviceList";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Container() {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div classname={classes.toolbar}>
        <DeviceList />
      </div>
    </main>
  );
}
