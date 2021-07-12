import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchTrendingGIFs, searchGIFs } from './giphyAPI';
import {GifObject, PaginationObject} from "../../common/types";

// Types
export interface GiphyState {
  gifs: Array<GifObject>;
  favoriteGIFs: Array<GifObject>;
  pagination: PaginationObject,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | undefined,
}

// State
const initialState: GiphyState = {
  gifs: [],
  favoriteGIFs: [],
  status: 'idle',
  pagination: {
    offset: 0,
    count: 0,
  },
  error: undefined,
};

// Thunk
export const fetchTrendingGIFsAsync = createAsyncThunk(
  'v1/gifs/trending',
  async (offset: number) => {
    const response = await fetchTrendingGIFs(24, offset );
    return response.data;
  }
);

export const searchGIFsAsync = createAsyncThunk(
  'v1/gifs/search',
  async ({searchTerm, offset}:{searchTerm: string, offset:number}) => {
    const response = await searchGIFs(searchTerm,24, offset );
    return response.data;
  }
);

// Slice
export const giphySlice = createSlice({
  name: 'giphy',
  initialState,
  reducers: {
    handleFavorites: (state, action) => {
      const {gifId, favoriteStatus} = action.payload
      if (favoriteStatus){
        const existingGif = state.gifs.find(gif => gif.id === gifId);
        if (existingGif) {
          state.favoriteGIFs.push(existingGif);
        }
      }else{
        state.favoriteGIFs = state.favoriteGIFs.filter(gif => gif.id !== gifId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Trending
      .addCase(fetchTrendingGIFsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTrendingGIFsAsync.fulfilled, (state, action) => {
        state.gifs = [...state.gifs, ...action.payload.data]
        state.pagination = action.payload.pagination;
        state.status = 'succeeded';
      })
      .addCase(fetchTrendingGIFsAsync.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = 'failed';
      })
      // Search
      .addCase(searchGIFsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchGIFsAsync.fulfilled, (state, action) => {
        state.gifs = action.payload.data;
        state.pagination = action.payload.pagination;
        state.status = 'succeeded';
      })
      .addCase(searchGIFsAsync.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = 'failed';
      });
  },
});

export const { handleFavorites } = giphySlice.actions;

export const selectGIFs = (state: RootState) => state.giphy.gifs;
export const selectPagination = (state: RootState) => state.giphy.pagination;
export const selectStatus = (state: RootState) => state.giphy.status;
export const selectError = (state: RootState) => state.giphy.error;
export const selectFavoriteGIFs = (state: RootState) => state.giphy.favoriteGIFs;

export default giphySlice.reducer;
