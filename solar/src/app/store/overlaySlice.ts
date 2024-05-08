import { createSlice } from '@reduxjs/toolkit';

const overlaySlice = createSlice({
  name: 'overlay',
  initialState: {
    isVisible: true, // Start with the overlay visible
  },
  reducers: {
    showOverlay(state) {
      state.isVisible = true; // Action to show the overlay
    },
    hideOverlay(state) {
      state.isVisible = false; // Action to hide the overlay
    },
  },
});
export const { showOverlay, hideOverlay } = overlaySlice.actions;

export default overlaySlice.reducer;