import { DocumentNode } from "graphql-typed";
import { SwitchSettingsInput, SwitchMode } from "../../types/default-types";
export namespace ModifySwitchMutationPartialData {
  export interface ModifySwitch {
    __typename?: "Switch" | null;
    id?: string | null;
    name?: string | null;
    gpio?: string | null;
    state?: SwitchMode | null;
  }
}
export interface ModifySwitchMutationPartialData {
  modifySwitch?: ModifySwitchMutationPartialData.ModifySwitch | null;
}
export namespace ModifySwitchMutationData {
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
export interface ModifySwitchMutationData {
  modifySwitch?: ModifySwitchMutationData.ModifySwitch | null;
}
declare const document: DocumentNode<ModifySwitchMutationData, ModifySwitchMutationData.Variables, ModifySwitchMutationPartialData>;
export default document;