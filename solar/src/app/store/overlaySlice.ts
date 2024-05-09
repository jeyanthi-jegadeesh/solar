import { createSlice } from '@reduxjs/toolkit';

const overlaySlice = createSlice({
  name: 'overlay',
  initialState: {
    isVisible: true, 
  },
  reducers: {
    showOverlay(state) {
      state.isVisible = true; 
    },
    hideOverlay(state) {
      state.isVisible = false;
    },
  },
});
export const { showOverlay, hideOverlay } = overlaySlice.actions;

export default overlaySlice.reducer;