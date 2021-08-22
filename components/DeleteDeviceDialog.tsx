import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { useI18n } from "@shopify/react-i18n";

import DeleteTemperatureController from "./graphql/DeleteTemperatureController.graphql";
import { TemperatureControllerFieldsFragmentData } from "./graphql/TemperatureControllerFields.graphql";

type DeleteDeviceDialogProps = {
  device: TemperatureControllerFieldsFragmentData;
  open: boolean;
  setOpen: Function;
};

export default function DeleteDeviceDialog({
  device,
  open,
  setOpen,
}: DeleteDeviceDialogProps) {
  const [i18n] = useI18n();

  const deleteMutation = DeleteTemperatureController;
  // if (device.__typename === "TemperatureController") {
  //   deleteMutation = ;
  // }

  const [deleteDevice] = useMutation(deleteMutation);
  const [showDeleted, setShowDeleted] = useState(false);

  const handleDelete = async () => {
    await deleteDevice({
      variables: { id: device.id },
    });
    setOpen(false);
    setShowDeleted(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {i18n.translate("Device.deleteDialog.title", {
            name: device.name,
          })}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {i18n.translate("Device.deleteDialog.body", {
              name: device.name,
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
        message={i18n.translate("Device.deleteDialog.deleted", {
          name: device.name,
        })}
      />
    </>
  );
}
