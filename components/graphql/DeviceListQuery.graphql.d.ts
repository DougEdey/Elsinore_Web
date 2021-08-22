import { DocumentNode } from "graphql-typed";
import { ControllerMode } from "../../types/default-types";
export namespace DeviceListQueryQueryPartialData {
  export interface TemperatureControllersTempProbeDetails {
    __typename?: "TempProbeDetails" | null;
    id?: string | null;
    name?: string | null;
    reading?: string | null;
    physAddr?: string | null;
  }
  export interface TemperatureControllersHeatSettings {
    __typename?: "PidSettings" | null;
    configured?: boolean | null;
    gpio?: string | null;
    proportional?: number | null;
    integral?: number | null;
    derivative?: number | null;
    cycleTime?: number | null;
  }
  export interface TemperatureControllersCoolSettings {
    __typename?: "PidSettings" | null;
    configured?: boolean | null;
    gpio?: string | null;
    proportional?: number | null;
    integral?: number | null;
    derivative?: number | null;
    cycleTime?: number | null;
  }
  export interface TemperatureControllersManualSettings {
    __typename?: "ManualSettings" | null;
    configured?: boolean | null;
    dutyCycle?: number | null;
    cycleTime?: number | null;
  }
  export interface TemperatureControllersHysteriaSettings {
    __typename?: "HysteriaSettings" | null;
    configured?: boolean | null;
    minTime?: number | null;
    minTemp?: string | null;
    maxTemp?: string | null;
  }
  export interface TemperatureControllers {
    __typename?: "TemperatureController" | null;
    id?: string | null;
    name?: string | null;
    setPoint?: string | null;
    calculatedDuty?: number | null;
    dutyCycle?: number | null;
    mode?: ControllerMode | null;
    tempProbeDetails?: (DeviceListQueryQueryPartialData.TemperatureControllersTempProbeDetails | null)[] | null;
    heatSettings?: DeviceListQueryQueryPartialData.TemperatureControllersHeatSettings | null;
    coolSettings?: DeviceListQueryQueryPartialData.TemperatureControllersCoolSettings | null;
    manualSettings?: DeviceListQueryQueryPartialData.TemperatureControllersManualSettings | null;
    hysteriaSettings?: DeviceListQueryQueryPartialData.TemperatureControllersHysteriaSettings | null;
  }
}
export interface DeviceListQueryQueryPartialData {
  temperatureControllers?: (DeviceListQueryQueryPartialData.TemperatureControllers | null)[] | null;
}
export namespace DeviceListQueryQueryData {
  export interface TemperatureControllersTempProbeDetails {
    __typename: "TempProbeDetails";
    id: string;
    name?: string | null;
    reading?: string | null;
    physAddr?: string | null;
  }
  export interface TemperatureControllersHeatSettings {
    __typename: "PidSettings";
    configured?: boolean | null;
    gpio?: string | null;
    proportional?: number | null;
    integral?: number | null;
    derivative?: number | null;
    cycleTime?: number | null;
  }
  export interface TemperatureControllersCoolSettings {
    __typename: "PidSettings";
    configured?: boolean | null;
    gpio?: string | null;
    proportional?: number | null;
    integral?: number | null;
    derivative?: number | null;
    cycleTime?: number | null;
  }
  export interface TemperatureControllersManualSettings {
    __typename: "ManualSettings";
    configured?: boolean | null;
    dutyCycle?: number | null;
    cycleTime?: number | null;
  }
  export interface TemperatureControllersHysteriaSettings {
    __typename: "HysteriaSettings";
    configured?: boolean | null;
    minTime?: number | null;
    minTemp?: string | null;
    maxTemp?: string | null;
  }
  export interface TemperatureControllers {
    __typename: "TemperatureController";
    id: string;
    name?: string | null;
    setPoint?: string | null;
    calculatedDuty?: number | null;
    dutyCycle?: number | null;
    mode?: ControllerMode | null;
    tempProbeDetails?: (DeviceListQueryQueryData.TemperatureControllersTempProbeDetails | null)[] | null;
    heatSettings?: DeviceListQueryQueryData.TemperatureControllersHeatSettings | null;
    coolSettings?: DeviceListQueryQueryData.TemperatureControllersCoolSettings | null;
    manualSettings?: DeviceListQueryQueryData.TemperatureControllersManualSettings | null;
    hysteriaSettings?: DeviceListQueryQueryData.TemperatureControllersHysteriaSettings | null;
  }
}
export interface DeviceListQueryQueryData {
  temperatureControllers?: (DeviceListQueryQueryData.TemperatureControllers | null)[] | null;
}
declare const document: DocumentNode<DeviceListQueryQueryData, never, DeviceListQueryQueryPartialData>;
export default document;