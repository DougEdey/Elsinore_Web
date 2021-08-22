import { DocumentNode } from "graphql-typed";
import { SettingsInput } from "../../types/default-types";
export namespace UpdateBrewerySettingsMutationPartialData {
  export interface UpdateSettings {
    __typename?: "Settings" | null;
    breweryName?: string | null;
  }
}
export interface UpdateBrewerySettingsMutationPartialData {
  updateSettings?: UpdateBrewerySettingsMutationPartialData.UpdateSettings | null;
}
export namespace UpdateBrewerySettingsMutationData {
  export interface Variables {
    updatedSettings: SettingsInput;
  }
  export interface UpdateSettings {
    __typename: "Settings";
    breweryName: string;
  }
}
export interface UpdateBrewerySettingsMutationData {
  updateSettings?: UpdateBrewerySettingsMutationData.UpdateSettings | null;
}
declare const document: DocumentNode<UpdateBrewerySettingsMutationData, UpdateBrewerySettingsMutationData.Variables, UpdateBrewerySettingsMutationPartialData>;
export default document;