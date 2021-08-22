import { ControllerMode } from "../../types/default-types";
export namespace TemperatureControllerFieldsFragmentData {
  export interface TempProbeDetails {
    __typename: "TempProbeDetails";
    id: string;
    name?: string | null;
    reading?: string | null;
    physAddr?: string | null;
  }
  export interface HeatSettings {
    __typename: "PidSettings";
    configured?: boolean | null;
    gpio?: string | null;
    proportional?: number | null;
    integral?: number | null;
    derivative?: number | null;
    cycleTime?: number | null;
  }
  export interface CoolSettings {
    __typename: "PidSettings";
    configured?: boolean | null;
    gpio?: string | null;
    proportional?: number | null;
    integral?: number | null;
    derivative?: number | null;
    cycleTime?: number | null;
  }
  export interface ManualSettings {
    __typename: "ManualSettings";
    configured?: boolean | null;
    dutyCycle?: number | null;
    cycleTime?: number | null;
  }
  export interface HysteriaSettings {
    __typename: "HysteriaSettings";
    configured?: boolean | null;
    minTime?: number | null;
    minTemp?: string | null;
    maxTemp?: string | null;
  }
}
export interface TemperatureControllerFieldsFragmentData {
  __typename: "TemperatureController";
  id: string;
  name?: string | null;
  setPoint?: string | null;
  calculatedDuty?: number | null;
  dutyCycle?: number | null;
  mode?: ControllerMode | null;
  tempProbeDetails?: (TemperatureControllerFieldsFragmentData.TempProbeDetails | null)[] | null;
  heatSettings?: TemperatureControllerFieldsFragmentData.HeatSettings | null;
  coolSettings?: TemperatureControllerFieldsFragmentData.CoolSettings | null;
  manualSettings?: TemperatureControllerFieldsFragmentData.ManualSettings | null;
  hysteriaSettings?: TemperatureControllerFieldsFragmentData.HysteriaSettings | null;
}