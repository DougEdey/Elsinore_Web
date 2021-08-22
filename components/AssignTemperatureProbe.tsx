import React, { useState, useEffect } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import {
  Snackbar,
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
import { useI18n } from "@shopify/react-i18n";
import RefreshIcon from "@material-ui/icons/Refresh";
import { useField, useForm, getValues } from "@shopify/react-form";

import AssignProbeMutation, {
  AssignProbeMutationMutationPartialData,
} from "./graphql/AssignProbeMutation.graphql";
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

type AssignProps = {
  open: boolean;
  setOpen: Function;
};
export default function AssignTemperatureProbe({ open, setOpen }: AssignProps) {
  const [i18n] = useI18n();
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

  const { submit } = useForm<typeof fields>({
    fields,
    onSubmit: async (fieldValues: any) => {
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
      data?.probeList?.map(
        (
          probe: AssignProbeMutationMutationPartialData.AssignProbeTempProbeDetails
        ) => {
          return (
            <option
              key={probe.physAddr}
              aria-label={probe.physAddr || ""}
              value={probe.physAddr || ""}
            >
              {probe.physAddr}
            </option>
          );
        }
      )
    ) : (
      <option value="">
        {i18n.translate("ActionFab.assignProbeDialog.noProbes")}
      </option>
    );

  const createdText = `Created ${fields.name.value}`;

  // @ts-ignore
  const selectInput = (
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
  );

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
              {selectInput}
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
