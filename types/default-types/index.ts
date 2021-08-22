import { SwitchMode } from "./SwitchMode";
import { ControllerMode } from "./ControllerMode";

export { SwitchMode };
export { ControllerMode };
export type Time = string;
export interface TemperatureControllerSettingsInput {
  id: string;
  name?: string | null;
  mode?: ControllerMode | null;
  coolSettings?: PidSettingsInput | null;
  heatSettings?: PidSettingsInput | null;
  hysteriaSettings?: HysteriaSettingsInput | null;
  manualSettings?: ManualSettingsInput | null;
  setPoint?: string | null;
}
export interface PidSettingsInput {
  configured?: boolean | null;
  cycleTime?: number | null;
  delay?: number | null;
  derivative?: number | null;
  integral?: number | null;
  proportional?: number | null;
  gpio?: string | null;
}
export interface HysteriaSettingsInput {
  configured?: boolean | null;
  maxTemp?: string | null;
  minTemp?: string | null;
  minTime?: number | null;
}
export interface ManualSettingsInput {
  configured?: boolean | null;
  cycleTime?: number | null;
  dutyCycle?: number | null;
}
export interface SettingsInput {
  breweryName?: string | null;
}
export interface SwitchSettingsInput {
  id?: string | null;
  name?: string | null;
  gpio?: string | null;
  state?: SwitchMode | null;
}
