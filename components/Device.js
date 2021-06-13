import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  FormControl,
  Input,
  InputLabel,
  IconButton,
  Typography,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import { useList, useSubmit, getValues } from "@shopify/react-form";
import clsx from "clsx";
import { useMutation } from "@apollo/client";

import UpdateTemperatureController from "./graphql/UpdateTemperatureController.graphql";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 400,
    margin: theme.spacing(2),
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  probe: {
    textAlign: "right",
  },
  expand: {
    marginLeft: "auto",
  },
  rootForm: {
    "& > *": {
      margin: theme.spacing(1),
      width: "95%",
    },
  },
}));

export default function Device({ temperatureController }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [expandedHeat, setExpandedHeat] = React.useState(false);
  const [expandedCool, setExpandedCool] = React.useState(false);
  const multipleProbes = temperatureController.tempProbeDetails.length > 1;

  const handleExpandClick = (pane) => {
    if (pane === "general") {
      setExpanded(!expanded);
      setExpandedHeat(false);
      setExpandedCool(false);
    } else if (pane === "heat") {
      setExpandedHeat(!expandedHeat);
      setExpanded(false);
      setExpandedCool(false);
    } else if (pane === "cool") {
      setExpandedCool(!expandedCool);
      setExpanded(false);
      setExpandedHeat(false);
    }
  };

  const [temperatureControllerSettings] = React.useState({
    ...temperatureController,
  });

  const fields = useList([temperatureControllerSettings])[0];

  const [updateController] = useMutation(UpdateTemperatureController);

  const { submit } = useSubmit(async (fieldValues) => {
    console.log(getValues(fieldValues));
    await updateController({
      variables: { controllerSettings: getValues(fieldValues) },
    });
    return { status: "success" };
  }, fields);

  const settingsButtonColor = expanded ? "primary" : "subdued";
  const heatButtonColor = expandedHeat ? "primary" : "subdued";
  const coolButtonColor = expandedCool ? "primary" : "subdued";

  return (
    <Card
      className={classes.root}
      key={temperatureController.id}
      variant="outlined"
    >
      <CardContent>
        <Typography colour="textSecondary" gutterBottom>
          {temperatureController.name}
        </Typography>
        {temperatureController.tempProbeDetails.map((probe) => {
          let probeDescription = probe.reading;
          if (multipleProbes) {
            probeDescription = `${probe.name} - ${probe.reading}`;
          }
          return (
            <Typography
              key={probe.physAddr}
              className={classes.probe}
              component="h2"
            >
              {probeDescription}
            </Typography>
          );
        })}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand)}
          onClick={() => handleExpandClick("general")}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <SettingsIcon color={settingsButtonColor} />
        </IconButton>
        <IconButton
          className={clsx(classes.expand)}
          onClick={() => handleExpandClick("heat")}
          aria-expanded={expandedHeat}
          aria-label="show more"
        >
          <WhatshotIcon color={heatButtonColor} />
        </IconButton>
        <IconButton
          className={clsx(classes.expand)}
          onClick={() => handleExpandClick("cool")}
          aria-expanded={expandedCool}
          aria-label="show more"
        >
          <AcUnitIcon color={coolButtonColor} />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <form onSubmit={submit} className={classes.rootForm}>
            <FormControl>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input {...fields.name} />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="mode">Mode</InputLabel>
              <Select {...fields.mode}>
                <option aria-label="Off" value="off">
                  Off
                </option>
                <option aria-label="Auto" value="auto">
                  Auto
                </option>
                <option aria-label="Manual" value="manual">
                  Manual
                </option>
                <option aria-label="Hysteria" value="hysteria">
                  Hysteria
                </option>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="setPoint">Set Point</InputLabel>
              <Input {...fields.setPoint} />
            </FormControl>
            <FormControl>
              <Button type="submit" value="submit">
                Save
              </Button>
            </FormControl>
          </form>
        </CardContent>
      </Collapse>
      <Collapse in={expandedHeat} timeout="auto" unmountOnExit>
        <CardContent>
          <form onSubmit={submit} className={classes.rootForm}>
            <FormControl>
              <InputLabel htmlFor="heatSettings.gpio">GPIO</InputLabel>
              <Input {...fields.heatSettings.gpio} />
            </FormControl>
            <FormControl>
              <Button type="submit" value="submit">
                Save
              </Button>
            </FormControl>
          </form>
        </CardContent>
      </Collapse>
      <Collapse in={expandedCool} timeout="auto" unmountOnExit>
        <CardContent>
          <form onSubmit={submit} className={classes.rootForm}>
            <FormControl>
              <InputLabel htmlFor="coolSettings.gpio">GPIO</InputLabel>
              <Input {...fields.coolSettings.gpio} />
            </FormControl>
            <FormControl>
              <Button type="submit" value="submit">
                Save
              </Button>
            </FormControl>
          </form>
        </CardContent>
      </Collapse>
    </Card>
  );
}

Device.propTypes = {
  temperatureController: PropTypes.object.isRequired,
};
