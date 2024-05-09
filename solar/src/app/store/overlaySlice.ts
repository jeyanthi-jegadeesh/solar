import { createSlice } from '@reduxjs/toolkit';

interface OverlayState {
  isVisible: boolean;
}

const initialState: OverlayState = {
  isVisible: false,
};

const overlaySlice = createSlice({
  name: 'overlay',
  initialState,
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

