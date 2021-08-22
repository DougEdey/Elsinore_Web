import { DocumentNode } from "graphql-typed";
import { SwitchMode } from "../../types/default-types";
export namespace SwitchesQueryPartialData {
  export interface Switches {
    __typename?: "Switch" | null;
    id?: string | null;
    name?: string | null;
    gpio?: string | null;
    state?: SwitchMode | null;
  }
}
export interface SwitchesQueryPartialData {
  switches?: (SwitchesQueryPartialData.Switches | null)[] | null;
}
export namespace SwitchesQueryData {
  export interface Switches {
    __typename: "Switch";
    id: string;
    name: string;
    gpio: string;
    state: SwitchMode;
  }
}
export interface SwitchesQueryData {
  switches?: (SwitchesQueryData.Switches | null)[] | null;
}
declare const document: DocumentNode<SwitchesQueryData, never, SwitchesQueryPartialData>;
export default document;