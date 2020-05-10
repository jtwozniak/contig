import { useMemo, useRef, useState, MutableRefObject } from 'react'

export type ConfigType<T = any> = {
  dirtyConfig: T
  defaultConfig: T
  savedConfigs: Record<string, T>
}

const useActions = <T>(
  state: MutableRefObject<ConfigType<T>>,
  setConfigState: (c: T) => void,
) =>
  useMemo(() => {
    const update = (config: T) => (state.current.dirtyConfig = config)
    const set = (config: T) => {
      setConfigState(config)
      update(config)
    }
    const save = (configName: string) => {
      state.current.savedConfigs[configName] = state.current.dirtyConfig
    }
    const load = (configName: string) => {
      state.current.dirtyConfig = state.current.savedConfigs[configName]
      setConfigState(state.current.dirtyConfig)
    }
    const deleteConfig = (configName: string) => {
      delete state.current.savedConfigs[configName]
      set(state.current.defaultConfig)
    }

    const getConfigurations = () => state.current.savedConfigs
    const setConfigurations = (
      configurations: typeof state.current.savedConfigs,
    ) => {
      state.current.savedConfigs = configurations
    }
    const getList = () => Object.keys(state.current.savedConfigs)
    const reorderList = () => Object.keys(state.current.savedConfigs)

    return {
      update,
      set,
      save,
      load,

      deleteConfig, // should delete multipe configs at the same time?
      getConfigurations,
      setConfigurations,
      getList,
      reorderList,
    }
  }, [])

export function useConfig<T>(defaultConfig?: T) {
  const [config, setConfigState] = useState<T | undefined>(defaultConfig)

  const state = useRef<ConfigType>({
    dirtyConfig: config,
    defaultConfig: config,
    savedConfigs: {},
  })

  const actions = useActions(state, setConfigState)

  // auto save to localStorage

  return { config, actions }
}

// problem - if config is saved I should not rerender component
// I should save it in ref object
// if I return actions object it should play as
// return me an actions that will trigger reducer on ref object
// I have to have state to rerender object
