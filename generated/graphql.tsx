import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Time: any;
};

/** The temperature controller mode */
export enum ControllerMode {
  /** Use the manual settings */
  Manual = 'manual',
  /** This controller is off */
  Off = 'off',
  /** Use the PID settings */
  Auto = 'auto',
  /** Use the hysteria settings */
  Hysteria = 'hysteria'
}

/** The deleted controller */
export type DeleteTemperatureControllerReturnType = {
  __typename?: 'DeleteTemperatureControllerReturnType';
  /** The ID of the deleted Controller */
  id: Scalars['ID'];
  /** Temperatures Probes that were associated with this controller */
  temperatureProbes?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** The settings for hysteria mode */
export type HysteriaSettings = {
  __typename?: 'HysteriaSettings';
  /** Indicates if these settings have been configured yet. */
  configured?: Maybe<Scalars['Boolean']>;
  /** The ID of an object */
  id: Scalars['ID'];
  /** When this temperature is hit, turn on the cooling output */
  maxTemp?: Maybe<Scalars['String']>;
  /** When this temperature is hit, turn on the heating output */
  minTemp?: Maybe<Scalars['String']>;
  /** The minimum amount of time to turn the outputs on for. */
  minTime?: Maybe<Scalars['Int']>;
};

/** The new settings for hysteria mode */
export type HysteriaSettingsInput = {
  /** Indicates if these settings have been configured yet */
  configured?: Maybe<Scalars['Boolean']>;
  /** When this temperature is hit, turn on the cooling output */
  maxTemp?: Maybe<Scalars['String']>;
  /** When this temperature is hit, turn on the heating output */
  minTemp?: Maybe<Scalars['String']>;
  /** The minimum amount of time to turn the outputs on for. */
  minTime?: Maybe<Scalars['Int']>;
};

/** The manual settings for this controller */
export type ManualSettings = {
  __typename?: 'ManualSettings';
  /** Indicates if these settings have been configured yet. */
  configured?: Maybe<Scalars['Boolean']>;
  /** The time for one duty cycle in seconds */
  cycleTime?: Maybe<Scalars['Int']>;
  /** The manual duty cycle percentage for this controller */
  dutyCycle?: Maybe<Scalars['Int']>;
  /** The ID of an object */
  id: Scalars['ID'];
};

/** The new manual settings for this controller */
export type ManualSettingsInput = {
  /** Indicates if these settings have been configured yet */
  configured?: Maybe<Scalars['Boolean']>;
  /** The time for one duty cycle in seconds */
  cycleTime?: Maybe<Scalars['Int']>;
  /** The manual duty cycle percentage for this controller */
  dutyCycle?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  assignProbe?: Maybe<TemperatureController>;
  removeProbeFromTemperatureController?: Maybe<TemperatureController>;
  updateTemperatureController?: Maybe<TemperatureController>;
  deleteTemperatureController?: Maybe<DeleteTemperatureControllerReturnType>;
};


export type MutationAssignProbeArgs = {
  name: Scalars['String'];
  address: Scalars['String'];
};


export type MutationRemoveProbeFromTemperatureControllerArgs = {
  address: Scalars['String'];
};


export type MutationUpdateTemperatureControllerArgs = {
  controllerSettings: TemperatureControllerSettingsInput;
};


export type MutationDeleteTemperatureControllerArgs = {
  id: Scalars['ID'];
};

/** The settings for heating or cooling on a temperature controller */
export type PidSettings = {
  __typename?: 'PidSettings';
  /** Indicates if these settings have been configured yet */
  configured?: Maybe<Scalars['Boolean']>;
  /** The automatic cycle time in seconds */
  cycleTime?: Maybe<Scalars['Int']>;
  /** The minimum delay between turning an output on and off in seconds */
  delay?: Maybe<Scalars['Int']>;
  /** The derivative calculation value */
  derivative?: Maybe<Scalars['Float']>;
  /** The ID of an object */
  id: Scalars['ID'];
  /** The integral calculation value */
  integral?: Maybe<Scalars['Float']>;
  /** The proportional calculation value */
  proportional?: Maybe<Scalars['Float']>;
  /** The GPIO */
  gpio?: Maybe<Scalars['String']>;
};

/** The settings for heating or cooling on a temperature controller */
export type PidSettingsInput = {
  /** Indicates if these settings have been configured yet */
  configured?: Maybe<Scalars['Boolean']>;
  /** The automatic cycle time in seconds */
  cycleTime?: Maybe<Scalars['Int']>;
  /** The minimum delay between turning an output on and off in seconds */
  delay?: Maybe<Scalars['Int']>;
  /** The derivative calculation value */
  derivative?: Maybe<Scalars['Float']>;
  /** The integral calculation value */
  integral?: Maybe<Scalars['Float']>;
  /** The proportional calculation value */
  proportional?: Maybe<Scalars['Float']>;
  /** The friendly name of the GPIO Value */
  gpio?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  probe?: Maybe<TemperatureProbe>;
  /** Get the list of probes */
  probeList?: Maybe<Array<Maybe<TemperatureProbe>>>;
  /** Get a specific list of probes */
  fetchProbes?: Maybe<Array<Maybe<TemperatureProbe>>>;
  /** Fetch all the temperature controllers, or a subset by name */
  temperatureControllers?: Maybe<Array<Maybe<TemperatureController>>>;
};


export type QueryProbeArgs = {
  address?: Maybe<Scalars['String']>;
};


export type QueryFetchProbesArgs = {
  addresses?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryTemperatureControllersArgs = {
  name?: Maybe<Scalars['String']>;
};

/** A device that reads a temperature and is assigned to a temperature controller */
export type TempProbeDetails = {
  __typename?: 'TempProbeDetails';
  /** The ID of an object */
  id: Scalars['ID'];
  /** The physical address of this probe */
  physAddr?: Maybe<Scalars['String']>;
  /** The value of the reading */
  reading?: Maybe<Scalars['String']>;
  /** The friendly name of this probe */
  name?: Maybe<Scalars['String']>;
  /** The time that this reading was updated */
  updated?: Maybe<Scalars['Time']>;
};

export type TemperatureController = {
  __typename?: 'TemperatureController';
  /** The PID calculated duty cycle, this can be overriden by the ManualDuty in manual mode */
  calculatedDuty?: Maybe<Scalars['Int']>;
  /** The cooling settings for this controller */
  coolSettings?: Maybe<PidSettings>;
  /** The percentage of time this controller is on */
  dutyCycle?: Maybe<Scalars['Int']>;
  /** The heating settings for this controller */
  heatSettings?: Maybe<PidSettings>;
  /** The hysteria mode settings for this controller */
  hysteriaSettings?: Maybe<HysteriaSettings>;
  /** The ID of an object */
  id: Scalars['ID'];
  /** The manual settings for this controller */
  manualSettings?: Maybe<ManualSettings>;
  /** The controller mode */
  mode?: Maybe<ControllerMode>;
  /** The assigned name of this controller */
  name?: Maybe<Scalars['String']>;
  /** The last time that the duty cycle was calculated */
  previousCalculationTime?: Maybe<Scalars['Time']>;
  /** The target temperature when in auto mode */
  setPoint?: Maybe<Scalars['String']>;
  /** The probes assigned to this controller */
  tempProbeDetails?: Maybe<Array<Maybe<TempProbeDetails>>>;
};

/** Used to configure a controller */
export type TemperatureControllerSettingsInput = {
  /** The controller Id */
  id: Scalars['ID'];
  /** The name of the controller. */
  name?: Maybe<Scalars['String']>;
  /** The new mode for the controller */
  mode?: Maybe<ControllerMode>;
  /** The PID Settings for the cooling output */
  coolSettings?: Maybe<PidSettingsInput>;
  /** The PID settings for the heating output */
  heatSettings?: Maybe<PidSettingsInput>;
  /** The hysteria settings for controlling this temperature controller */
  hysteriaSettings?: Maybe<HysteriaSettingsInput>;
  /** The manual settings for this temperature controller */
  manualSettings?: Maybe<ManualSettingsInput>;
  /** The target for auto mode */
  setPoint?: Maybe<Scalars['String']>;
};

/** A device that reads a temperature */
export type TemperatureProbe = {
  __typename?: 'TemperatureProbe';
  /** The physical address of this probe */
  physAddr?: Maybe<Scalars['String']>;
  /** The value of the reading */
  reading?: Maybe<Scalars['String']>;
  /** The time that this reading was updated */
  updated?: Maybe<Scalars['Time']>;
};


export type DeleteTemperatureControllerMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteTemperatureControllerMutation = (
  { __typename?: 'Mutation' }
  & { deleteTemperatureController?: Maybe<(
    { __typename?: 'DeleteTemperatureControllerReturnType' }
    & Pick<DeleteTemperatureControllerReturnType, 'id' | 'temperatureProbes'>
  )> }
);


export const DeleteTemperatureControllerDocument = gql`
    mutation DeleteTemperatureController($id: ID!) {
  deleteTemperatureController(id: $id) {
    id
    temperatureProbes
  }
}
    `;
export type DeleteTemperatureControllerMutationFn = Apollo.MutationFunction<DeleteTemperatureControllerMutation, DeleteTemperatureControllerMutationVariables>;

/**
 * __useDeleteTemperatureControllerMutation__
 *
 * To run a mutation, you first call `useDeleteTemperatureControllerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTemperatureControllerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTemperatureControllerMutation, { data, loading, error }] = useDeleteTemperatureControllerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTemperatureControllerMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTemperatureControllerMutation, DeleteTemperatureControllerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTemperatureControllerMutation, DeleteTemperatureControllerMutationVariables>(DeleteTemperatureControllerDocument, options);
      }
export type DeleteTemperatureControllerMutationHookResult = ReturnType<typeof useDeleteTemperatureControllerMutation>;
export type DeleteTemperatureControllerMutationResult = Apollo.MutationResult<DeleteTemperatureControllerMutation>;
export type DeleteTemperatureControllerMutationOptions = Apollo.BaseMutationOptions<DeleteTemperatureControllerMutation, DeleteTemperatureControllerMutationVariables>;