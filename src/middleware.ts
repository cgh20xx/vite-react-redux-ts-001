import { Middleware } from '@reduxjs/toolkit';
import { RootState } from './store';

// TS 需加上 Middleware 的 Type
export const loggerMiddleware: Middleware<
  object,
  RootState
> = store => next => action => {
  // next 其實就是原始的 store.dispatch
  console.log('dispatching:', action);
  const result = next(action)
  console.log('next state:', store.getState());
  return result
}