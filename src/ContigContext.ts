import { createContext } from 'react'

export const ParentConfig = 0
export type ConfigType<T = any> = {
  dirtyConfig: T
  loadedConfig: T
  savedConfigs: Record<string, T>
}

export type Context = {
  selectedConfig: string
  configNames: string[]
  configMap: Record<string | number, ConfigType>
}

const initialConfig: ConfigType = {
  dirtyConfig: null,
  loadedConfig: null,
  savedConfigs: {},
}

const initialContext: Context = {
  selectedConfig: 'default',
  configNames: ['default'],
  configMap: {
    [ParentConfig]: initialConfig,
  },
}

export const ContigContext = createContext<Context>(initialContext)
