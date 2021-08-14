import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Typography, Switch } from "@material-ui/core";
import { useMutation } from "@apollo/client";

import ModifySwitchMutation from "./graphql/ModifySwitchMutation.graphql";

export default function SwitchDevice({ device }) {
  const [modifySwitch] = useMutation(ModifySwitchMutation);
  const toggleOutput = (event) => {
    const newState = event.target.checked ? "on" : "off";
    const newSettings = {
      id: device.id,
      state: newState,
    };
    modifySwitch({
      variables: { switchSettings: newSettings },
    });
  };

  return (
    <Card key={device.id} variant="outlined">
      <CardContent>
        <Typography colour="textSecondary" gutterBottom>
          {device.name}
        </Typography>
        <Switch checked={device.state === "on"} onChange={toggleOutput} />
      </CardContent>
    </Card>
  );
}

SwitchDevice.propTypes = {
  device: PropTypes.object.isRequired,
};
