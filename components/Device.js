import React, { useState } from "react";
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
import SkipNextIcon from "@material-ui/icons/SkipNext";
import { useList, useSubmit, getValues } from "@shopify/react-form";
import clsx from "clsx";
import { useMutation } from "@apollo/client";

import CircularProgressWithLabel from "./CircularProgressWithLabel";
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
  const [expanded, setExpanded] = useState(false);
  const [expandedHeat, setExpandedHeat] = useState(false);
  const [expandedCool, setExpandedCool] = useState(false);
  const [expandedManual, setExpandedManual] = useState(false);
  const multipleProbes = temperatureController.tempProbeDetails.length > 1;

  const handleExpandClick = (pane) => {
    if (pane === "general") {
      setExpanded(!expanded);
      setExpandedHeat(false);
      setExpandedCool(false);
      setExpandedManual(false);
    } else if (pane === "heat") {
      setExpandedHeat(!expandedHeat);
      setExpanded(false);
      setExpandedCool(false);
      setExpandedManual(false);
    } else if (pane === "cool") {
      setExpandedCool(!expandedCool);
      setExpanded(false);
      setExpandedHeat(false);
      setExpandedManual(false);
    } else if (pane === "manual") {
      setExpandedManual(!expandedManual);
      setExpanded(false);
      setExpandedHeat(false);
      setExpandedCool(false);
    }
  };

  const [temperatureControllerSettings] = React.useState({
    ...temperatureController,
  });

  const fields = useList([temperatureControllerSettings])[0];
  fields.manualSettings = useList([
    temperatureControllerSettings.manualSettings,
  ])[0];
  fields.coolSettings = useList([
    temperatureControllerSettings.coolSettings,
  ])[0];
  fields.heatSettings = useList([
    temperatureControllerSettings.heatSettings,
  ])[0];
  fields.hysteriaSettings = useList([
    temperatureControllerSettings.hysteriaSettings,
  ])[0];
  delete fields.__typename;
  delete fields.coolSettings.__typename;
  delete fields.heatSettings.__typename;
  delete fields.hysteriaSettings.__typename;
  delete fields.manualSettings.__typename;
  delete fields.tempProbeDetails;
  delete fields.calculatedDuty;
  delete fields.dutyCycle;

  const [updateController] = useMutation(UpdateTemperatureController);

  const { submit } = useSubmit(async (fieldValues) => {
    await updateController({
      variables: { controllerSettings: getValues(fieldValues) },
    });
    return { status: "success" };
  }, fields);

  const settingsButtonColor = expanded ? "primary" : "";
  const heatButtonColor = expandedHeat ? "primary" : "";
  const coolButtonColor = expandedCool ? "primary" : "";
  const manualButtonColor = expandedManual ? "primary" : "";

  const currentState = () => {
    console.log(temperatureController.mode);
    if (temperatureController.mode === "auto") {
      return (
        <CircularProgressWithLabel
          value={temperatureController.calculatedDuty}
        />
      );
    } else if (temperatureController.mode === "manual") {
      return (
        <CircularProgressWithLabel
          value={temperatureController.manualSettings.dutyCycle}
        />
      );
    } else if (temperatureController.mode === "off") {
      return <Typography component="h2">Off</Typography>;
    }
  };

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
        {currentState()}
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
        <IconButton
          className={clsx(classes.expand)}
          onClick={() => handleExpandClick("manual")}
          aria-expanded={expandedManual}
          aria-label="show more"
        >
          <SkipNextIcon color={manualButtonColor} />
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
              <InputLabel htmlFor="dutyCycle">Cycle Time</InputLabel>
              <Input {...fields.heatSettings.cycleTime} />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="proportional">Proportional (P)</InputLabel>
              <Input {...fields.heatSettings.proportional} />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="integral">Integral (I)</InputLabel>
              <Input {...fields.heatSettings.integral} />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="derivative">Derivative (D)</InputLabel>
              <Input {...fields.heatSettings.derivative} />
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
              <InputLabel htmlFor="dutyCycle">Cycle Time</InputLabel>
              <Input {...fields.coolSettings.cycleTime} />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="proportional">Proportional (P)</InputLabel>
              <Input {...fields.coolSettings.proportional} />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="integral">Integral (I)</InputLabel>
              <Input {...fields.coolSettings.integral} />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="derivative">Derivative (D)</InputLabel>
              <Input {...fields.coolSettings.derivative} />
            </FormControl>
            <FormControl>
              <Button type="submit" value="submit">
                Save
              </Button>
            </FormControl>
          </form>
        </CardContent>
      </Collapse>
      <Collapse in={expandedManual} timeout="auto" unmountOnExit>
        <CardContent>
          <form onSubmit={submit} className={classes.rootForm}>
            <FormControl>
              <InputLabel htmlFor="heatSettings.gpio">GPIO</InputLabel>
              <Input {...fields.heatSettings.gpio} />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="name">Duty Cycle</InputLabel>
              <Input {...fields.manualSettings.dutyCycle} />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="setPoint">Cycle Time</InputLabel>
              <Input {...fields.manualSettings.cycleTime} />
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
