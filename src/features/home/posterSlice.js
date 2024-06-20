import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   url: 'public/venom.jpg',
//   name: 'Venom',
//   description:
//     'A failed reporter is bonded to an alien entity, one of many symbiotes who have invaded Earth. But the being takes a liking to Earth and decides to protect it.',
//   imdbRating: '6.6',
//   runtime: '112m',
// };

const initialState = {};

const posterSlice = createSlice({
  name: 'poster',
  initialState,
  reducers: {
    changePoster: (state, action) => {
      const { url, name, description, imdbRating, runtime, movieId } =
        action.payload;
      state.url = url;
      state.name = name;
      state.description = description;
      state.imdbRating = imdbRating;
      state.runtime = runtime;
      state.movieId = movieId;
    },
  },
});

export const { changePoster } = posterSlice.actions;
export default posterSlice.reducer;
