import { useSelector } from 'react-redux';

export const getRootState = () =>
  useSelector(({ rootReducer: { rootState } }) => rootState);

export const getPersistState = () =>
  useSelector(({ persistReducer: { persistState } }) => persistState);
