import React, { ChangeEvent } from "react";
import _ from "lodash";
import { useI18n } from "@shopify/react-i18n";
import { Button, TextField, Grid } from "@material-ui/core";

import { TemperatureControllerFieldsFragmentData } from "./graphql/TemperatureControllerFields.graphql";

type PidSettingsFormProps = {
  temperatureController: TemperatureControllerFieldsFragmentData;
  handleSubmit: (fieldValues: any) => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type: string;
};

export default function PidSettingsForm({
  temperatureController,
  handleSubmit,
  handleChange,
  type,
}: PidSettingsFormProps) {
  const [i18n] = useI18n();

  return (
    <Grid container direction="row" justifyContent="flex-end">
      <form onSubmit={handleSubmit} noValidate>
        <Grid item>
          <TextField
            label={i18n.translate("Device.input.gpio")}
            name={`${type}Settings.gpio`}
            defaultValue={_.get(temperatureController, `${type}Settings.gpio`)}
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <TextField
            label={i18n.translate("Device.input.cycleTime")}
            name={`${type}Settings.cycleTime`}
            defaultValue={_.get(
              temperatureController,
              `${type}Settings.cycleTime`
            )}
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <TextField
            label={i18n.translate("Device.input.proportional")}
            name={`${type}Settings.proportional`}
            defaultValue={_.get(
              temperatureController,
              `${type}Settings.proportional`
            )}
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <TextField
            label={i18n.translate("Device.input.integral")}
            name={`${type}Settings.integral`}
            defaultValue={_.get(
              temperatureController,
              `${type}Settings.integral`
            )}
          />
        </Grid>
        <Grid item>
          <TextField
            label={i18n.translate("Device.input.derivative")}
            name={`${type}Settings.derivative`}
            defaultValue={_.get(
              temperatureController,
              `${type}Settings.derivative`
            )}
            onChange={handleChange}
          />
        </Grid>
        <Grid item align="right">
          <Button type="submit" value="submit">
            {i18n.translate("Device.input.save")}
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}
