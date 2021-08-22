import { DocumentNode } from "graphql-typed";
export namespace GetProbesQueryPartialData {
  export interface ProbeList {
    __typename?: "TemperatureProbe" | null;
    physAddr?: string | null;
  }
}
export interface GetProbesQueryPartialData {
  probeList?: (GetProbesQueryPartialData.ProbeList | null)[] | null;
}
export namespace GetProbesQueryData {
  export interface ProbeList {
    __typename: "TemperatureProbe";
    physAddr?: string | null;
  }
}
export interface GetProbesQueryData {
  probeList?: (GetProbesQueryData.ProbeList | null)[] | null;
}
declare const document: DocumentNode<GetProbesQueryData, never, GetProbesQueryPartialData>;
export default document;