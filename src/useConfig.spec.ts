import {
  renderHook,
  act,
  RenderHookResult,
  HookResult,
} from '@testing-library/react-hooks'
import { useConfig } from './useConfig'

function renderHookWithCount<P, R>(hookCallback: (a: P) => R) {
  const container: Omit<RenderHookResult<P, R>, 'result'> & {
    result: HookResult<R> & {
      renderCount: number
    }
  } = renderHook((props: P) => {
    if (container) {
      container.result.renderCount++
    }
    return hookCallback(props)
  }) as any
  container.result.renderCount = 1
  return container
}

describe('useConfig', () => {
  it('empty config', () => {
    const { result } = renderHookWithCount(() => useConfig())
    expect(result.current.config).toBe(undefined)
    expect(result.renderCount).toBe(1)
  })

  it("updateConfig doesn't set config and doesnt't rerender", () => {
    const { result } = renderHookWithCount(() => useConfig(1))
    act(() => {
      result.current.actions.update(10)
    })
    expect(result.current.config).toBe(1)
    expect(result.renderCount).toBe(1)
  })

  it('setConfig', () => {
    const { result } = renderHookWithCount(() => useConfig(1))
    act(() => {
      result.current.actions.set(10)
    })
    expect(result.current.config).toBe(10)
    expect(result.renderCount).toBe(2)
  })

  it('save/load', () => {
    const { result } = renderHookWithCount(() => useConfig(1))
    act(() => {
      result.current.actions.save('1')
      result.current.actions.update(10)
      result.current.actions.save('10')
      result.current.actions.load('1')
    })
    expect(result.current.config).toBe(1)
    expect(result.renderCount).toBe(1)
    act(() => {
      result.current.actions.load('10')
    })
    expect(result.current.config).toBe(10)
    expect(result.renderCount).toBe(2)
  })

  const initialConfigurations = {
    '1': 1,
    '10': 10,
  }
  it('delete', () => {
    const { result } = renderHookWithCount(() => useConfig(1))
    act(() => {
      result.current.actions.setConfigurations(initialConfigurations)
      result.current.actions.load('1')
    })
    expect(result.renderCount).toBe(1)
    expect(result.current.actions.getList()).toStrictEqual(['1', '10'])

    act(() => {
      result.current.actions.deleteConfig('1')
    })
    expect(result.current.actions.getList()).toStrictEqual(['10'])
    expect(result.renderCount).toBe(2)

    act(() => {
      result.current.actions.deleteConfig('10')
    })
    expect(result.current.actions.getList()).toStrictEqual([])
    act(() => {
      result.current.actions.deleteConfig('a')
    })
    expect(result.current.actions.getList()).toStrictEqual([])
  })

  it('get/set configurations', () => {
    const { result } = renderHook(() => useConfig<number | string>(1))
    act(() => {
      result.current.actions.setConfigurations(initialConfigurations)
    })
    expect(result.current.actions.getConfigurations()).toStrictEqual(
      initialConfigurations,
    )

    act(() => {
      result.current.actions.deleteConfig('1')
      result.current.actions.deleteConfig('10')
    })
    expect(result.current.actions.getConfigurations()).toStrictEqual({})

    const newConfigurations = {
      ...initialConfigurations,
      '21': 21,
      test: 'test',
    }

    act(() => {
      result.current.actions.setConfigurations(newConfigurations)
    })

    expect(result.current.actions.getConfigurations()).toStrictEqual(
      newConfigurations,
    )
  })
})
