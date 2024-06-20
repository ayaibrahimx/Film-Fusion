import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: JSON.parse(localStorage.getItem('movies')) || [],
  tvShows: JSON.parse(localStorage.getItem('tvShows')) || [],
};

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    addToList: (state, action) => {
      const { item, type } = action.payload;
      const list = type === 'movies' ? state.movies : state.tvShows;

      if (!list.find((i) => i.id === item.id)) {
        const updatedList = [{ ...item, isFavorite: true }, ...list];
        if (type === 'movies') {
          state.movies = updatedList;
          localStorage.setItem('movies', JSON.stringify(updatedList));
        } else {
          state.tvShows = updatedList;
          localStorage.setItem('tvShows', JSON.stringify(updatedList));
        }
      }
    },
    removeFromList: (state, action) => {
      const { item, type } = action.payload;
      const list = type === 'movies' ? state.movies : state.tvShows;

      const updatedList = list.filter((i) => i.id !== item.id);
      if (type === 'movies') {
        state.movies = updatedList;
        localStorage.setItem('movies', JSON.stringify(updatedList));
      } else {
        state.tvShows = updatedList;
        localStorage.setItem('tvShows', JSON.stringify(updatedList));
      }
    },
    toggleFavorite: (state, action) => {
      const { item, type } = action.payload;
      const list = type === 'movies' ? state.movies : state.tvShows;

      const updatedList = list.map((i) =>
        i.id === item.id ? { ...i, isFavorite: !i.isFavorite } : i,
      );

      if (type === 'movies') {
        state.movies = updatedList;
        localStorage.setItem('movies', JSON.stringify(updatedList));
      } else {
        state.tvShows = updatedList;
        localStorage.setItem('tvShows', JSON.stringify(updatedList));
      }
    },
  },
});

export const { addToList, removeFromList, toggleFavorite } = mediaSlice.actions;
export default mediaSlice.reducer;
