export const loggerMiddleware = store => next => action => {
  // next 其實就是原始的 store.dispatch
  console.log('dispatching:', action);
  const result = next(action)
  console.log('next state:', store.getState());
  return result
}