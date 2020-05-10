import { fromPairs, toPairs } from 'lodash'

type StringNum = string | number // action type can be string or enum (number)
export interface Action<T extends StringNum> {
  type: T
}

export interface ActionWithPayload<T extends StringNum, P> extends Action<T> {
  payload: P
}

export function createAction<T extends StringNum>(type: T): Action<T>
export function createAction<T extends StringNum, P>(
  type: T,
  payload: P,
): ActionWithPayload<T, P>
export function createAction<T extends StringNum, P>(type: T, payload?: P) {
  return payload !== undefined ? { type, payload } : { type }
}

type FunctionType = (...args: any[]) => any
type ActionCreatorsMapObject = { [actionCreator: string]: FunctionType }

export type ResolvedActionsUnion<
  A extends ActionCreatorsMapObject
> = ReturnType<A[keyof A]>
export type ExtractType<Actions, T> = Extract<Actions, { type: T }>

export function wrapWithDispatch<T extends {}>(dispatch: Function, obj: T): T {
  return fromPairs(
    toPairs(obj).map(([key, func]: [string, Function]) => [
      key,
      (...args: any[]) => {
        dispatch(func(...args))
      },
    ]),
  ) as T
}
