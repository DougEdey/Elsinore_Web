import { DocumentNode } from "graphql-typed";
import { TemperatureControllerSettingsInput, ControllerMode } from "../../types/default-types";
export namespace UpdateTemperatureControllerMutationPartialData {
  export interface UpdateTemperatureControllerTempProbeDetails {
    __typename?: "TempProbeDetails" | null;
    id?: string | null;
    name?: string | null;
    reading?: string | null;
    physAddr?: string | null;
  }
  export interface UpdateTemperatureControllerHeatSettings {
    __typename?: "PidSettings" | null;
    configured?: boolean | null;
    gpio?: string | null;
    proportional?: number | null;
    integral?: number | null;
    derivative?: number | null;
    cycleTime?: number | null;
  }
  export interface UpdateTemperatureControllerCoolSettings {
    __typename?: "PidSettings" | null;
    configured?: boolean | null;
    gpio?: string | null;
    proportional?: number | null;
    integral?: number | null;
    derivative?: number | null;
    cycleTime?: number | null;
  }
  export interface UpdateTemperatureControllerManualSettings {
    __typename?: "ManualSettings" | null;
    configured?: boolean | null;
    dutyCycle?: number | null;
    cycleTime?: number | null;
  }
  export interface UpdateTemperatureControllerHysteriaSettings {
    __typename?: "HysteriaSettings" | null;
    configured?: boolean | null;
    minTime?: number | null;
    minTemp?: string | null;
    maxTemp?: string | null;
  }
  export interface UpdateTemperatureController {
    __typename?: "TemperatureController" | null;
    id?: string | null;
    name?: string | null;
    setPoint?: string | null;
    calculatedDuty?: number | null;
    dutyCycle?: number | null;
    mode?: ControllerMode | null;
    tempProbeDetails?: (UpdateTemperatureControllerMutationPartialData.UpdateTemperatureControllerTempProbeDetails | null)[] | null;
    heatSettings?: UpdateTemperatureControllerMutationPartialData.UpdateTemperatureControllerHeatSettings | null;
    coolSettings?: UpdateTemperatureControllerMutationPartialData.UpdateTemperatureControllerCoolSettings | null;
    manualSettings?: UpdateTemperatureControllerMutationPartialData.UpdateTemperatureControllerManualSettings | null;
    hysteriaSettings?: UpdateTemperatureControllerMutationPartialData.UpdateTemperatureControllerHysteriaSettings | null;
  }
}
export interface UpdateTemperatureControllerMutationPartialData {
  updateTemperatureController?: UpdateTemperatureControllerMutationPartialData.UpdateTemperatureController | null;
}
export namespace UpdateTemperatureControllerMutationData {
  export interface Variables {
    controllerSettings: TemperatureControllerSettingsInput;
  }
  export interface UpdateTemperatureControllerTempProbeDetails {
    __typename: "TempProbeDetails";
    id: string;
    name?: string | null;
    reading?: string | null;
    physAddr?: string | null;
  }
  export interface UpdateTemperatureControllerHeatSettings {
    __typename: "PidSettings";
    configured?: boolean | null;
    gpio?: string | null;
    proportional?: number | null;
    integral?: number | null;
    derivative?: number | null;
    cycleTime?: number | null;
  }
  export interface UpdateTemperatureControllerCoolSettings {
    __typename: "PidSettings";
    configured?: boolean | null;
    gpio?: string | null;
    proportional?: number | null;
    integral?: number | null;
    derivative?: number | null;
    cycleTime?: number | null;
  }
  export interface UpdateTemperatureControllerManualSettings {
    __typename: "ManualSettings";
    configured?: boolean | null;
    dutyCycle?: number | null;
    cycleTime?: number | null;
  }
  export interface UpdateTemperatureControllerHysteriaSettings {
    __typename: "HysteriaSettings";
    configured?: boolean | null;
    minTime?: number | null;
    minTemp?: string | null;
    maxTemp?: string | null;
  }
  export interface UpdateTemperatureController {
    __typename: "TemperatureController";
    id: string;
    name?: string | null;
    setPoint?: string | null;
    calculatedDuty?: number | null;
    dutyCycle?: number | null;
    mode?: ControllerMode | null;
    tempProbeDetails?: (UpdateTemperatureControllerMutationData.UpdateTemperatureControllerTempProbeDetails | null)[] | null;
    heatSettings?: UpdateTemperatureControllerMutationData.UpdateTemperatureControllerHeatSettings | null;
    coolSettings?: UpdateTemperatureControllerMutationData.UpdateTemperatureControllerCoolSettings | null;
    manualSettings?: UpdateTemperatureControllerMutationData.UpdateTemperatureControllerManualSettings | null;
    hysteriaSettings?: UpdateTemperatureControllerMutationData.UpdateTemperatureControllerHysteriaSettings | null;
  }
}
export interface UpdateTemperatureControllerMutationData {
  updateTemperatureController?: UpdateTemperatureControllerMutationData.UpdateTemperatureController | null;
}
declare const document: DocumentNode<UpdateTemperatureControllerMutationData, UpdateTemperatureControllerMutationData.Variables, UpdateTemperatureControllerMutationPartialData>;
export default document;