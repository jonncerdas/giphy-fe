import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import giphyReducer from '../features/giphy/giphySlice';

export const store = configureStore({
  reducer: {
    giphy: giphyReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
