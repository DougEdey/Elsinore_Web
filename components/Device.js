import React, { useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
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
  FormControlLabel,
  Checkbox,
  IconButton,
  Typography,
  Snackbar,
  TextField,
  Grid,
  Select,
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

import PidSettingsForm from "./PidSettingsForm";
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

  const [heatConfigured, setHeatConfigured] = useState(
    temperatureController.heatSettings.configured
  );
  const [coolConfigured, setCoolConfigured] = useState(
    temperatureController.coolSettings.configured
  );
  const [manualConfigured, setManualConfigured] = useState(
    temperatureController.manualSettings.configured
  );

  const [
    updateController,
    { loading: controllerUpdating, error: updateError },
  ] = useMutation(UpdateTemperatureController, {
    refetchQueries: ["DeviceListQuery"],
    errorPolicy: "all",
  });
  const [formValue, setFormValue] = useState(
    _.cloneDeep(temperatureController)
  );

  async function onSubmit(event) {
    event.preventDefault();
    const submitValue = _.cloneDeep(formValue);
    delete submitValue.__typename;
    delete submitValue.coolSettings.__typename;
    delete submitValue.heatSettings.__typename;
    delete submitValue.hysteriaSettings.__typename;
    delete submitValue.manualSettings.__typename;
    delete submitValue.tempProbeDetails;
    delete submitValue.calculatedDuty;
    delete submitValue.dutyCycle;
    await updateController({
      variables: { controllerSettings: submitValue },
    });
    return { status: "success" };
  }

  const handleChange = (event) => {
    let value = event.target.value;

    switch (event.target.name) {
      case "manualSettings.configured": {
        value = event.target.checked;
        setManualConfigured(value);
        break;
      }
      case "heatSettings.configured": {
        value = event.target.checked;
        setHeatConfigured(value);
        break;
      }
      case "coolSettings.configured": {
        value = event.target.checked;
        setCoolConfigured(value);
        break;
      }
    }

    setFormValue(_.set(formValue, event.target.name, value));
  };

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
    <Grid container direction="row" justifyContent="flex-end">
      <form onSubmit={onSubmit} noValidate>
        <Grid item>
          <TextField
            label={i18n.translate("Device.input.name")}
            name="name"
            defaultValue={formValue.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <Select
            label={i18n.translate("Device.input.mode")}
            name="mode"
            defaultValue="off"
            value={formValue.mode}
            onChange={handleChange}
          >
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
        </Grid>
        <Grid item>
          <TextField
            name="setPoint"
            label={i18n.translate("Device.input.setPoint")}
            defaultValue={formValue.setPoint}
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                formControlProps={{ row: true }}
                name="heatSettings.configured"
                checked={formValue.heatSettings.configured}
                onChange={handleChange}
                aria-label="Heat Settings Configured"
              />
            }
            label={i18n.translate("Device.input.heatConfigured")}
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                formControlProps={{ row: true }}
                name="coolSettings.configured"
                checked={formValue.coolSettings.configured}
                onChange={handleChange}
              />
            }
            label={i18n.translate("Device.input.coolConfigured")}
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                formControlProps={{ row: true }}
                name="manualSettings.configured"
                checked={formValue.manualSettings.configured}
                onChange={handleChange}
              />
            }
            label={i18n.translate("Device.input.manualConfigured")}
          />
        </Grid>
        <Grid item>
          <Button type="submit" value="submit">
            {i18n.translate("Device.input.save")}
          </Button>
        </Grid>
      </form>
    </Grid>
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
            aria-label="general settings"
            name="general"
          >
            <SettingsIcon color={settingsButtonColor} />
          </IconButton>
          <IconButton
            className={clsx(classes.expand)}
            onClick={() => handleExpandClick("heat")}
            aria-expanded={expandedHeat}
            aria-label="heat settings"
            disabled={!heatConfigured}
          >
            <WhatshotIcon color={heatButtonColor} />
          </IconButton>
          <IconButton
            className={clsx(classes.expand)}
            onClick={() => handleExpandClick("cool")}
            aria-expanded={expandedCool}
            aria-label="cool settings"
            disabled={!coolConfigured}
          >
            <AcUnitIcon color={coolButtonColor} />
          </IconButton>
          <IconButton
            className={clsx(classes.expand)}
            onClick={() => handleExpandClick("manual")}
            aria-expanded={expandedManual}
            aria-label="manual settings"
            disabled={!manualConfigured}
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
            <PidSettingsForm
              temperatureController={formValue}
              handleSubmit={onSubmit}
              handleChange={handleChange}
              type="heat"
            />
          </CardContent>
        </Collapse>
        <Collapse in={expandedCool} timeout="auto" unmountOnExit>
          <CardContent>
            <PidSettingsForm
              temperatureController={formValue}
              handleSubmit={onSubmit}
              handleChange={handleChange}
              type="cool"
            />
          </CardContent>
        </Collapse>
        <Collapse in={expandedManual} timeout="auto" unmountOnExit>
          <CardContent>
            <Grid container direction="row" justifyContent="flex-end">
              <form onSubmit={onSubmit} noValidate>
                <Grid item>
                  <TextField
                    label={i18n.translate("Device.input.gpio")}
                    name="heatSettings.gpio"
                    defaultValue={_.get(formValue, "heatSettings.gpio")}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label={i18n.translate("Device.input.dutyCycle")}
                    name="manualSettings.dutyCycle"
                    defaultValue={_.get(formValue, "manualSettings.dutyCycle")}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label={i18n.translate("Device.input.cycleTime")}
                    name="manualSettings.cycleTime"
                    defaultValue={_.get(formValue, "manualSettings.cycleTime")}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <FormControl>
                    <Button type="submit" value="submit">
                      {i18n.translate("Device.input.save")}
                    </Button>
                  </FormControl>
                </Grid>
              </form>
            </Grid>
          </CardContent>
        </Collapse>
      </Card>
      <Snackbar open={controllerUpdating} message="Controller updating" />
      <Snackbar
        open={updateError}
        message={`Error updating probe! ${updateError?.message}`}
      />
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
  i18n: PropTypes.object.isRequired,
};
