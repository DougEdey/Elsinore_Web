import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  IconButton,
  CardHeader,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useI18n } from "@shopify/react-i18n";

import AssignTemperatureProbe from "./AssignTemperatureProbe";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  addMoreButton: {
    marginLeft: "auto",
  },
}));

export default function NoDevices() {
  const [i18n] = useI18n();
  const [assignProbeOpen, setAssignProbeOpen] = useState(false);
  const classes = useStyles();

  const toggleAssignProbe = () => {
    setAssignProbeOpen(!assignProbeOpen);
  };

  return (
    <>
      <Card className={classes.root} key="no_devices">
        <CardHeader title={i18n.translate("Device.noDevices")} />
        <CardContent>
          <Typography paragraph>
            {i18n.translate("Device.noDevicesInstructions")}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            onClick={toggleAssignProbe}
            className={classes.addMoreButton}
          >
            <AddCircleIcon color="secondary" />
          </IconButton>
        </CardActions>
      </Card>
      <AssignTemperatureProbe
        open={assignProbeOpen}
        setOpen={setAssignProbeOpen}
      />
    </>
  );
}
