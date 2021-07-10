import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Fab, Menu, MenuItem } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useI18n } from "@shopify/react-i18n";

import AssignTemperatureProbe from "./AssignTemperatureProbe";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  rootForm: {
    "& > *": {
      margin: theme.spacing(1),
      width: "95%",
    },
  },
}));

export default function ActionFab() {
  const [i18n] = useI18n();
  const [anchorEl, setAnchorEl] = useState(null);
  const [assignProbeOpen, setAssignProbeOpen] = useState(false);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleAssignProbe = () => {
    handleClose();
    setAssignProbeOpen(!assignProbeOpen);
  };

  return (
    <div className={classes.root}>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        aria-haspopup="true"
        aria-controls="simple-menu"
        onClick={handleClick}
      >
        <AddIcon />
      </Fab>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={toggleAssignProbe}>
          {i18n.translate("ActionFab.menu.assignProbe")}
        </MenuItem>
      </Menu>
      <AssignTemperatureProbe
        open={assignProbeOpen}
        setOpen={setAssignProbeOpen}
      />
    </div>
  );
}
