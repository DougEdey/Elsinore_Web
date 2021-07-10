import React, { useState } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { Form } from "react-final-form";
import { TextField, Checkboxes, Select } from "mui-rff";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  FormControl,
  FormGroup,
  IconButton,
  Typography,
  Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import DeleteIcon from "@material-ui/icons/Delete";
import clsx from "clsx";
import { useMutation } from "@apollo/client";
import { useI18n } from "@shopify/react-i18n";

import CircularProgressWithLabel from "./CircularProgressWithLabel";
import UpdateTemperatureController from "./graphql/UpdateTemperatureController.graphql";
import DeleteTemperatureController from "./graphql/DeleteTemperatureController.graphql";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 400,
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
  const [i18n] = useI18n();
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [expandedHeat, setExpandedHeat] = useState(false);
  const [expandedCool, setExpandedCool] = useState(false);
  const [expandedManual, setExpandedManual] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
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

  const [temperatureControllerState] = React.useState(
    _.cloneDeep(temperatureController)
  );
  delete temperatureControllerState.__typename;
  delete temperatureControllerState.coolSettings.__typename;
  delete temperatureControllerState.heatSettings.__typename;
  delete temperatureControllerState.hysteriaSettings.__typename;
  delete temperatureControllerState.manualSettings.__typename;
  delete temperatureControllerState.tempProbeDetails;
  delete temperatureControllerState.calculatedDuty;
  delete temperatureControllerState.dutyCycle;

  const [updateController] = useMutation(UpdateTemperatureController);
  async function onSubmit(values) {
    await updateController({
      variables: { controllerSettings: values },
    });
    return { status: "success" };
  }

  const settingsButtonColor = expanded ? "primary" : "inherit";
  const heatButtonColor = expandedHeat ? "primary" : "inherit";
  const coolButtonColor = expandedCool ? "primary" : "inherit";
  const manualButtonColor = expandedManual ? "primary" : "inherit";

  const currentState = () => {
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
      return (
        <Typography component="h2">
          {i18n.translate("Device.mode.off")}
        </Typography>
      );
    }
  };

  const mainForm = (
    <Form
      onSubmit={onSubmit}
      initialValues={temperatureControllerState}
      render={({ handleSubmit, pristine }) => (
        <form onSubmit={handleSubmit} noValidate>
          <TextField label={i18n.translate("Device.input.name")} name="name" />
          <Select label={i18n.translate("Device.input.mode")} name="mode">
            <option aria-label={i18n.translate("Device.mode.off")} value="off">
              {i18n.translate("Device.mode.off")}
            </option>
            <option
              aria-label={i18n.translate("Device.mode.auto")}
              value="auto"
            >
              {i18n.translate("Device.mode.auto")}
            </option>
            <option
              aria-label={i18n.translate("Device.mode.manual")}
              value="manual"
            >
              {i18n.translate("Device.mode.manual")}
            </option>
            <option
              aria-label={i18n.translate("Device.mode.hysteria")}
              value="hysteria"
            >
              {i18n.translate("Device.mode.hysteria")}
            </option>
          </Select>
          <TextField
            name="setPoint"
            label={i18n.translate("Device.input.setPoint")}
          />
          <FormGroup row>
            <Checkboxes
              formControlProps={{ row: true }}
              name="heatSettings.configured"
              data={{
                label: i18n.translate("Device.input.heatConfigured"),
                value: temperatureControllerState.heatSettings.configured,
              }}
            />
            <Checkboxes
              formControlProps={{ row: true }}
              name="coolSettings.configured"
              data={{
                label: i18n.translate("Device.input.coolConfigured"),
                value: temperatureControllerState.coolSettings.configured,
              }}
            />
            <Checkboxes
              formControlProps={{ row: true }}
              name="manualSettings.configured"
              data={{
                label: i18n.translate("Device.input.manualConfigured"),
                value: temperatureControllerState.manualSettings.configured,
              }}
            />
          </FormGroup>
          <FormControl>
            <Button type="submit" value="submit" disabled={pristine}>
              {i18n.translate("Device.input.save")}
            </Button>
          </FormControl>
        </form>
      )}
    />
  );

  return (
    <>
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
          <IconButton
            className={clsx(classes.expand)}
            onClick={() => setDeleteOpen(true)}
            aria-expanded={expandedManual}
            aria-label="delete"
          >
            <DeleteIcon color="secondary" />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>{mainForm}</CardContent>
        </Collapse>
        <Collapse in={expandedHeat} timeout="auto" unmountOnExit>
          <CardContent>
            <Form
              onSubmit={onSubmit}
              initialValues={temperatureControllerState}
              render={({ handleSubmit, pristine }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <TextField
                    label={i18n.translate("Device.input.gpio")}
                    name="heatSettings.gpio"
                  />
                  <TextField
                    label={i18n.translate("Device.input.cycleTime")}
                    name="heatSettings.cycleTime"
                  />
                  <TextField
                    label={i18n.translate("Device.input.proportional")}
                    name="heatSettings.proportional"
                  />
                  <TextField
                    label={i18n.translate("Device.input.integral")}
                    name="heatSettings.integral"
                  />
                  <TextField
                    label={i18n.translate("Device.input.derivative")}
                    name="heatSettings.derivative"
                  />
                  <FormControl>
                    <Button type="submit" value="submit" disabled={pristine}>
                      {i18n.translate("Device.input.save")}
                    </Button>
                  </FormControl>
                </form>
              )}
            />
          </CardContent>
        </Collapse>
        <Collapse in={expandedCool} timeout="auto" unmountOnExit>
          <CardContent>
            <Form
              onSubmit={onSubmit}
              initialValues={temperatureControllerState}
              render={({ handleSubmit, pristine }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <TextField
                    label={i18n.translate("Device.input.gpio")}
                    name="coolSettings.gpio"
                  />
                  <TextField
                    label={i18n.translate("Device.input.cycleTime")}
                    name="coolSettings.cycleTime"
                  />
                  <TextField
                    label={i18n.translate("Device.input.proportional")}
                    name="coolSettings.proportional"
                  />
                  <TextField
                    label={i18n.translate("Device.input.integral")}
                    name="coolSettings.integral"
                  />
                  <TextField
                    label={i18n.translate("Device.input.derivative")}
                    name="coolSettings.derivative"
                  />
                  <FormControl>
                    <Button type="submit" value="submit" disabled={pristine}>
                      {i18n.translate("Device.input.save")}
                    </Button>
                  </FormControl>
                </form>
              )}
            />
          </CardContent>
        </Collapse>
        <Collapse in={expandedManual} timeout="auto" unmountOnExit>
          <CardContent>
            <Form
              onSubmit={onSubmit}
              initialValues={temperatureControllerState}
              render={({ handleSubmit, pristine }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <TextField
                    label={i18n.translate("Device.input.gpio")}
                    name="heatSettings.gpio"
                  />
                  <TextField
                    label={i18n.translate("Device.input.dutyCycle")}
                    name="heatSettings.dutyCycle"
                  />
                  <TextField
                    label={i18n.translate("Device.input.cycleTime")}
                    name="heatSettings.cycleTime"
                  />
                  <FormControl>
                    <Button type="submit" value="submit" disabled={pristine}>
                      {i18n.translate("Device.input.save")}
                    </Button>
                  </FormControl>
                </form>
              )}
            />
          </CardContent>
        </Collapse>
      </Card>
      <DeleteProbeDialog
        temperatureController={temperatureController}
        open={deleteOpen}
        setOpen={setDeleteOpen}
        i18n={i18n}
      />
    </>
  );
}

Device.propTypes = {
  temperatureController: PropTypes.object.isRequired,
};

function DeleteProbeDialog({ temperatureController, open, setOpen, i18n }) {
  const [deleteController] = useMutation(DeleteTemperatureController);
  const [showDeleted, setShowDeleted] = useState(false);

  const handleDelete = async () => {
    await deleteController({
      variables: { id: temperatureController.id },
    });
    setOpen(false);
    setShowDeleted(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deletedText = `Deleted ${temperatureController.name}`;

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {i18n.translate("Device.deleteDialog.title", {
            name: temperatureController.name,
          })}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {i18n.translate("Device.deleteDialog.body", {
              name: temperatureController.name,
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {i18n.translate("Device.deleteDialog.cancel")}
          </Button>
          <Button onClick={handleDelete} color="secondary">
            {i18n.translate("Device.deleteDialog.delete")}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showDeleted}
        onClose={() => setShowDeleted(false)}
        message={deletedText}
      />
    </>
  );
}

DeleteProbeDialog.propTypes = {
  temperatureController: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  i18n: PropTypes.func.isRequired,
};
