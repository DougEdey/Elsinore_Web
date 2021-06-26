import React, { useCallback, useState } from "react";
import _ from "lodash";
import { Form } from "react-final-form";
import { TextField } from "mui-rff";
import {
  AppBar,
  Toolbar,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useI18n } from "@shopify/react-i18n";
import { useQuery, useMutation } from "@apollo/client";
import PropTypes from "prop-types";

import ThemeToggle from "./ThemeToggle";
import BreweryDetailsQuery from "./graphql/BreweryDetailsQuery.graphql";
import UpdateBrewerySettings from "./graphql/UpdateBrewerySettings.graphql";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();
  const [i18n] = useI18n();
  const { data } = useQuery(BreweryDetailsQuery, {
    notifyOnNetworkStatusChange: true,
    pollInterval: 5000,
  });
  const [showDialog, setShowDialog] = useState(false);

  const settings = data?.settings;
  const breweryName = data?.settings?.breweryName
    ? data?.settings.breweryName
    : i18n.translate("Header.name");

  const toggleEditDialog = useCallback(() => {
    setShowDialog(!showDialog);
  }, [setShowDialog, showDialog]);

  if (!data) {
    return "Loading...";
  }

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            onDoubleClick={toggleEditDialog}
          >
            {breweryName}
          </Typography>
          <ThemeToggle />
        </Toolbar>
      </AppBar>
      <EditBreweryNameDialog
        settings={settings}
        open={showDialog}
        toggleVisibility={toggleEditDialog}
        i18n={i18n}
      />
    </>
  );
}

function EditBreweryNameDialog({ settings, open, toggleVisibility, i18n }) {
  const [showUpdated, setShowUpdated] = useState(false);
  const updatedText = i18n.translate("Header.editDialog.updatedText");

  const updatedSettings = settings ? _.cloneDeep(settings) : {};
  delete updatedSettings.__typename;

  const [updateBrewerySettings] = useMutation(UpdateBrewerySettings);
  async function onSubmit(values) {
    await updateBrewerySettings({
      variables: {
        updatedSettings: values,
      },
    });
    setShowUpdated(true);
    toggleVisibility();
  }

  const mainForm = (
    <Form
      onSubmit={onSubmit}
      initialValues={updatedSettings}
      render={({ handleSubmit, dirty }) => (
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label={i18n.translate("Header.editDialog.breweryName")}
            name="breweryName"
          />
          <DialogActions>
            <Button onClick={toggleVisibility} color="primary">
              {i18n.translate("Header.editDialog.cancel")}
            </Button>
            <Button onClick={handleSubmit} disabled={!dirty} color="secondary">
              {i18n.translate("Header.editDialog.update")}
            </Button>
          </DialogActions>
        </form>
      )}
    />
  );
  return (
    <>
      <Dialog
        open={open}
        onClose={toggleVisibility}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {i18n.translate("Header.editDialog.title", {
            name: settings.breweryName,
          })}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {i18n.translate("Header.editDialog.body", {
              name: settings.breweryName,
            })}
          </DialogContentText>
          {mainForm}
        </DialogContent>
      </Dialog>
      <Snackbar
        open={showUpdated}
        onClose={() => setShowUpdated(false)}
        message={updatedText}
      />
    </>
  );
}

EditBreweryNameDialog.propTypes = {
  settings: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
  i18n: PropTypes.func.isRequired,
};
