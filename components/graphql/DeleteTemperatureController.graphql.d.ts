import { DocumentNode } from "graphql-typed";
export namespace DeleteTemperatureControllerMutationPartialData {
  export interface DeleteTemperatureController {
    __typename?: "DeleteTemperatureControllerReturnType" | null;
    id?: string | null;
    temperatureProbes?: (string | null)[] | null;
  }
}
export interface DeleteTemperatureControllerMutationPartialData {
  deleteTemperatureController?: DeleteTemperatureControllerMutationPartialData.DeleteTemperatureController | null;
}
export namespace DeleteTemperatureControllerMutationData {
  export interface Variables {
    id: string;
  }
  export interface DeleteTemperatureController {
    __typename: "DeleteTemperatureControllerReturnType";
    id: string;
    temperatureProbes?: (string | null)[] | null;
  }
}
export interface DeleteTemperatureControllerMutationData {
  deleteTemperatureController?: DeleteTemperatureControllerMutationData.DeleteTemperatureController | null;
}
declare const document: DocumentNode<DeleteTemperatureControllerMutationData, DeleteTemperatureControllerMutationData.Variables, DeleteTemperatureControllerMutationPartialData>;
export default document;