import { configureStore } from '@reduxjs/toolkit';
import posterSlice from './features/home/posterSlice';
import mediaSlice from './features/mediaSlice';

const store = configureStore({
  reducer: {
    poster: posterSlice,
    media: mediaSlice,
  },
});

export default store;
