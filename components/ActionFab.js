import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useMutation, useLazyQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import {
  Snackbar,
  Fab,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  IconButton,
  Button,
  Select,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RefreshIcon from "@material-ui/icons/Refresh";
import { useField, useForm, getValues } from "@shopify/react-form";
import { useI18n } from "@shopify/react-i18n";

import AssignProbeMutation from "./graphql/AssignProbeMutation.graphql";
import getProbes from "./graphql/TempProbesQuery.graphql";

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
        i18n={i18n}
      />
    </div>
  );
}

function AssignTemperatureProbe({ open, setOpen, i18n }) {
  const classes = useStyles();
  const [assignProbe] = useMutation(AssignProbeMutation);
  const [lazyGetProbes, { loading, data }] = useLazyQuery(getProbes, {
    fetchPolicy: "network-only",
  });
  const [showCreated, setShowCreated] = useState(false);

  const fields = {
    name: useField({
      value: "",
      validates: [
        (name) => {
          if (name?.length < 3) {
            return "Name must be longer than 3 characters";
          }
        },
      ],
    }),
    address: useField({
      value: "",
      validates: [
        (address) => {
          if (address?.length <= 0) {
            return "Address must be provided";
          }
        },
      ],
    }),
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      lazyGetProbes();
    }
  }, [open, lazyGetProbes]);

  const { submit } = useForm({
    fields,
    onSubmit: async (fieldValues) => {
      const values = getValues(fieldValues);
      await assignProbe({
        variables: { name: values.name, address: values.address },
      });
      fields.name.value = "";
      fields.address.value = "";
      handleClose();
      setShowCreated(true);
      return { status: "success" };
    },
    makeCleanAfterSubmit: true,
  });

  if (loading) {
    return <div>{i18n.translate("ActionFab.assignProbeDialog.loading")}</div>;
  }

  const addressOptions =
    data?.probeList?.length > 0 ? (
      data?.probeList?.map((probe) => {
        return (
          <option
            key={probe.physAddr}
            aria-label={probe.physAddr}
            value={probe.physAddr}
          >
            {probe.physAddr}
          </option>
        );
      })
    ) : (
      <option value="">
        {i18n.translate("ActionFab.assignProbeDialog.noProbes")}
      </option>
    );

  const createdText = `Created ${fields.name.value}`;

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {i18n.translate("ActionFab.assignProbeDialog.title")}
        </DialogTitle>
        <form onSubmit={submit} className={classes.rootForm}>
          <DialogContent>
            <DialogContentText>
              {i18n.translate("ActionFab.assignProbeDialog.content")}
            </DialogContentText>
            <FormControl fullWidth>
              <InputLabel htmlFor="name">
                {i18n.translate("ActionFab.assignProbeDialog.form.name")}
              </InputLabel>
              <Input {...fields.name} />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="address">
                {i18n.translate("ActionFab.assignProbeDialog.form.address")}
              </InputLabel>
              <Select
                {...fields.address}
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton onClick={() => lazyGetProbes()}>
                      <RefreshIcon />
                    </IconButton>
                  </InputAdornment>
                }
              >
                {addressOptions}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              {i18n.translate("ActionFab.assignProbeDialog.form.cancel")}
            </Button>
            <Button type="submit" value="submit">
              {i18n.translate("ActionFab.assignProbeDialog.form.create")}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Snackbar
        open={showCreated}
        onClose={() => setShowCreated(false)}
        message={createdText}
      />
    </>
  );
}

AssignTemperatureProbe.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  i18n: PropTypes.func.isRequired,
};
