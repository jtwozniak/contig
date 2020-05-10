import { useContext } from 'react'
import { ContigContext } from './ContigContext.js'

export const useChildContig = (componentId: string, initialConfig: T): T => {
  const { [componentId]: config } = useContext(ContigContext)

  return [config, setConfig]
}
