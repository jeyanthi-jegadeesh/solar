import { createSlice } from '@reduxjs/toolkit';

interface OverlayState {
  landingIsVisible: boolean,
  planetsIsVisible: boolean,
  dialogIsVisible: boolean
}

const initialState: OverlayState = {
  landingIsVisible: true,
  planetsIsVisible: false,
  dialogIsVisible: false
};

const overlaySlice = createSlice({
  name: 'overlay',
  initialState,
  reducers: {
    showLandingOverlay(state) {
      state.landingIsVisible = true;
    },
    hideLandingOverlay(state) {
      state.landingIsVisible = false;
    },
    showPlanetsOverlay(state) {
      state.planetsIsVisible = true;
    },
    hidePlanetsOverlay(state) {
      state.planetsIsVisible = false;
    },
    showDialogOverlay(state) {
      state.dialogIsVisible = true;
    },
    hideDialogOverlay(state) {
      state.dialogIsVisible = false;
    },
  },
});

export const { showLandingOverlay, hideLandingOverlay, showPlanetsOverlay, hidePlanetsOverlay, showDialogOverlay, hideDialogOverlay } = overlaySlice.actions;

export default overlaySlice.reducer;

