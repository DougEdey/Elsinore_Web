import { DocumentNode } from "graphql-typed";
import { ControllerMode } from "../../types/default-types";
export namespace AssignProbeMutationMutationPartialData {
  export interface AssignProbeTempProbeDetails {
    __typename?: "TempProbeDetails" | null;
    id?: string | null;
    name?: string | null;
    reading?: string | null;
    physAddr?: string | null;
  }
  export interface AssignProbeHeatSettings {
    __typename?: "PidSettings" | null;
    configured?: boolean | null;
    gpio?: string | null;
    proportional?: number | null;
    integral?: number | null;
    derivative?: number | null;
    cycleTime?: number | null;
  }
  export interface AssignProbeCoolSettings {
    __typename?: "PidSettings" | null;
    configured?: boolean | null;
    gpio?: string | null;
    proportional?: number | null;
    integral?: number | null;
    derivative?: number | null;
    cycleTime?: number | null;
  }
  export interface AssignProbeManualSettings {
    __typename?: "ManualSettings" | null;
    configured?: boolean | null;
    dutyCycle?: number | null;
    cycleTime?: number | null;
  }
  export interface AssignProbeHysteriaSettings {
    __typename?: "HysteriaSettings" | null;
    configured?: boolean | null;
    minTime?: number | null;
    minTemp?: string | null;
    maxTemp?: string | null;
  }
  export interface AssignProbe {
    __typename?: "TemperatureController" | null;
    id?: string | null;
    name?: string | null;
    setPoint?: string | null;
    calculatedDuty?: number | null;
    dutyCycle?: number | null;
    mode?: ControllerMode | null;
    tempProbeDetails?: (AssignProbeMutationMutationPartialData.AssignProbeTempProbeDetails | null)[] | null;
    heatSettings?: AssignProbeMutationMutationPartialData.AssignProbeHeatSettings | null;
    coolSettings?: AssignProbeMutationMutationPartialData.AssignProbeCoolSettings | null;
    manualSettings?: AssignProbeMutationMutationPartialData.AssignProbeManualSettings | null;
    hysteriaSettings?: AssignProbeMutationMutationPartialData.AssignProbeHysteriaSettings | null;
  }
}
export interface AssignProbeMutationMutationPartialData {
  assignProbe?: AssignProbeMutationMutationPartialData.AssignProbe | null;
}
export namespace AssignProbeMutationMutationData {
  export interface Variables {
    name: string;
    address: string;
  }
  export interface AssignProbeTempProbeDetails {
    __typename: "TempProbeDetails";
    id: string;
    name?: string | null;
    reading?: string | null;
    physAddr?: string | null;
  }
  export interface AssignProbeHeatSettings {
    __typename: "PidSettings";
    configured?: boolean | null;
    gpio?: string | null;
    proportional?: number | null;
    integral?: number | null;
    derivative?: number | null;
    cycleTime?: number | null;
  }
  export interface AssignProbeCoolSettings {
    __typename: "PidSettings";
    configured?: boolean | null;
    gpio?: string | null;
    proportional?: number | null;
    integral?: number | null;
    derivative?: number | null;
    cycleTime?: number | null;
  }
  export interface AssignProbeManualSettings {
    __typename: "ManualSettings";
    configured?: boolean | null;
    dutyCycle?: number | null;
    cycleTime?: number | null;
  }
  export interface AssignProbeHysteriaSettings {
    __typename: "HysteriaSettings";
    configured?: boolean | null;
    minTime?: number | null;
    minTemp?: string | null;
    maxTemp?: string | null;
  }
  export interface AssignProbe {
    __typename: "TemperatureController";
    id: string;
    name?: string | null;
    setPoint?: string | null;
    calculatedDuty?: number | null;
    dutyCycle?: number | null;
    mode?: ControllerMode | null;
    tempProbeDetails?: (AssignProbeMutationMutationData.AssignProbeTempProbeDetails | null)[] | null;
    heatSettings?: AssignProbeMutationMutationData.AssignProbeHeatSettings | null;
    coolSettings?: AssignProbeMutationMutationData.AssignProbeCoolSettings | null;
    manualSettings?: AssignProbeMutationMutationData.AssignProbeManualSettings | null;
    hysteriaSettings?: AssignProbeMutationMutationData.AssignProbeHysteriaSettings | null;
  }
}
export interface AssignProbeMutationMutationData {
  assignProbe?: AssignProbeMutationMutationData.AssignProbe | null;
}
declare const document: DocumentNode<AssignProbeMutationMutationData, AssignProbeMutationMutationData.Variables, AssignProbeMutationMutationPartialData>;
export default document;