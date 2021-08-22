import React from "react";
import { Card, CardContent, Switch, CardHeader } from "@material-ui/core";
import { useMutation } from "@apollo/client";

import { SwitchesQueryData } from "./graphql/SwitchListQuery.graphql";
import ModifySwitchMutation from "./graphql/ModifySwitchMutation.graphql";

type SwitchProps = {
  device: SwitchesQueryData.Switches;
};

export default function SwitchDevice({ device }: SwitchProps) {
  const [modifySwitch] = useMutation(ModifySwitchMutation);
  const toggleOutput = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      <CardHeader title={device.name} />
      <CardContent>
        <Switch checked={device.state === "on"} onChange={toggleOutput} />
      </CardContent>
    </Card>
  );
}
