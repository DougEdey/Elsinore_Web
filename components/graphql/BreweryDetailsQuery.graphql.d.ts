import { DocumentNode } from "graphql-typed";
export namespace BreweryDetailsQueryQueryPartialData {
  export interface Settings {
    __typename?: "Settings" | null;
    breweryName?: string | null;
  }
}
export interface BreweryDetailsQueryQueryPartialData {
  settings?: BreweryDetailsQueryQueryPartialData.Settings | null;
}
export namespace BreweryDetailsQueryQueryData {
  export interface Settings {
    __typename: "Settings";
    breweryName: string;
  }
}
export interface BreweryDetailsQueryQueryData {
  settings?: BreweryDetailsQueryQueryData.Settings | null;
}
declare const document: DocumentNode<BreweryDetailsQueryQueryData, never, BreweryDetailsQueryQueryPartialData>;
export default document;