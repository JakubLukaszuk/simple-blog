import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import userSlice from '../slices/userSlice';
import postSlice from '../slices/postSlice';
import { useDispatch } from 'react-redux'

const middlewares = [...getDefaultMiddleware()];

export const store = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice
  },
  middleware: middlewares,
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
