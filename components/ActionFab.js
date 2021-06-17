import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation, useQuery } from "@apollo/client";
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
  InputLabel,
  Button,
  Select,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useField, useSubmit, getValues } from "@shopify/react-form";

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
          Assign Temperature Probe
        </MenuItem>
      </Menu>
      <AssignTemperatureProbe
        open={assignProbeOpen}
        setOpen={setAssignProbeOpen}
      />
    </div>
  );
}

function AssignTemperatureProbe({ open, setOpen }) {
  const classes = useStyles();
  const [assignProbe] = useMutation(AssignProbeMutation);
  const { loading, data } = useQuery(getProbes);
  const [showCreated, setShowCreated] = useState(false);

  const nameField = useField({
    value: "",
    validates: [
      (name) => {
        if (name.length < 3) {
          return "Name must be longer than 3 characters";
        }
      },
    ],
  });

  const addressField = useField({
    value: "",
    validates: [
      (address) => {
        if (address.length <= 0) {
          return "Address must be provided";
        }
      },
    ],
  });

  const handleClose = () => {
    setOpen(false);
  };

  const { submit } = useSubmit(
    async (fieldValues) => {
      const values = getValues(fieldValues);
      console.log(values);
      await assignProbe({
        variables: { name: values.nameField, address: values.addressField },
      });
      handleClose();
      setShowCreated(true);
      return { status: "success" };
    },
    { nameField, addressField }
  );

  if (loading) {
    return <div>Loading</div>;
  }

  const addressOptions = data?.probeList?.map((probe) => {
    return (
      <option
        key={probe.physAddr}
        aria-label={probe.physAddy}
        value={probe.physAddr}
      >
        {probe.physAddr}
      </option>
    );
  });

  const createdText = `Created ${nameField.value}`;

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Assign Temperature Probe
        </DialogTitle>
        <form onSubmit={submit} className={classes.rootForm}>
          <DialogContent>
            <DialogContentText>
              Assign a temperature probe to a controller.
            </DialogContentText>
            <FormControl fullWidth>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input {...nameField} />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="address">Address</InputLabel>
              <Select {...addressField}>{addressOptions}</Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" value="submit">
              Create
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
};
