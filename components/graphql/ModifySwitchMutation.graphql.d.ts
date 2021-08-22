import { DocumentNode } from "graphql-typed";
import { SwitchSettingsInput, SwitchMode } from "../../types/default-types";
export namespace ModifySwitchMutationMutationPartialData {
  export interface ModifySwitch {
    __typename?: "Switch" | null;
    id?: string | null;
    name?: string | null;
    gpio?: string | null;
    state?: SwitchMode | null;
  }
}
export interface ModifySwitchMutationMutationPartialData {
  modifySwitch?: ModifySwitchMutationMutationPartialData.ModifySwitch | null;
}
export namespace ModifySwitchMutationMutationData {
  export interface Variables {
    switchSettings: SwitchSettingsInput;
  }
  export interface ModifySwitch {
    __typename: "Switch";
    id: string;
    name: string;
    gpio: string;
    state: SwitchMode;
  }
}
export interface ModifySwitchMutationMutationData {
  modifySwitch?: ModifySwitchMutationMutationData.ModifySwitch | null;
}
declare const document: DocumentNode<ModifySwitchMutationMutationData, ModifySwitchMutationMutationData.Variables, ModifySwitchMutationMutationPartialData>;
export default document;