import { createAction, ResolvedActionsUnion } from 'createActions'

export enum ActionTypes {
  Save = 'config.save', // save as config
  Update = 'config.update', // update dirty config
  Load = 'config.load', // load config to dirty config
  Move = 'config.move', // rename config
  Remove = 'config.remove', // remove config
  Clear = 'config.clear', // remove all configs
  DirtyToLoaded = 'config.dirtyToLoaded', // save to selected
  Write = 'config.write', // persist context
  Read = 'config.read', // read from local storage
  ReadComplete = 'config.readComplete',
  Sync = 'config.sync',
}

export const Actions = {
  updateConfig: <T = any>(config: T) =>
    createAction(ActionTypes.Update, config),
  // clear: (contextId: string) => createAction(ActionTypes.Clear, { contextId }),
  // setContext: (contextId: string) =>
  //   createAction(ActionTypes.SetContext, { contextId }),
  // resetContext: (contextId: string) =>
  //   createAction(ActionTypes.ResetContext, { contextId }),
  // write: (contextId: string) => createAction(ActionTypes.Write, { contextId }),
  // read: (contextId: string) => createAction(ActionTypes.Read, { contextId }),
  // readComplete: (contextId: string, config: ConfigType) =>
  //   createAction(ActionTypes.ReadComplete, { contextId, config }),
  //
  // save: (contextId: string, configId: string) =>
  //   createAction(ActionTypes.Save, { contextId, configId }),
  // load: (contextId: string, configId: string) =>
  //   createAction(ActionTypes.Load, { contextId, configId }),
  // remove: (contextId: string, configId: string) =>
  //   createAction(ActionTypes.Remove, { contextId, configId }),
  // dirtyToLoaded: (contextId: string, configId: string) =>
  //   createAction(ActionTypes.DirtyToLoaded, getPaths(contextId, configId)),
  // move: (contextId: string, configId: string, newId: string) =>
  //   createAction(ActionTypes.Move, { contextId, configId, newId }),
  // update: (contextId: string, componentId: string, config: ConfigType) =>
  //   createAction(ActionTypes.Update, {
  //     ...getPaths(componentId, contextId),
  //     config,
  //   }),
  // sync: (
  //   contextId: string,
  //   componentId: string,
  //   config: ConfigType,
  //   configId: string,
  // ) =>
  //   createAction(ActionTypes.Sync, {
  //     componentId,
  //     contextId,
  //     config,
  //     configId,
  //   }),
}

export type Actions = ResolvedActionsUnion<typeof Actions>
