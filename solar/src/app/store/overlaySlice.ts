import { createSlice } from '@reduxjs/toolkit';

interface OverlayState {
  landingIsVisible: boolean,
  planetsIsVisible: boolean,
  dialogIsVisible: boolean,
  signIsVisible: boolean,
  logInIsVisible: boolean
}

const initialState: OverlayState = {
  landingIsVisible: true,
  planetsIsVisible: false,
  dialogIsVisible: false,
  signIsVisible: false,
  logInIsVisible: false,

};

const overlaySlice = createSlice({
  name: 'overlay',
  initialState,
  reducers: {
    showLandingOverlay(state) {
      state.landingIsVisible = true;
      state.planetsIsVisible = false;
    },
    hideLandingOverlay(state) {
      state.landingIsVisible = false;
    },
    showPlanetsOverlay(state) {
      state.planetsIsVisible = true;
      state.landingIsVisible = false;
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
    showsSignOverlay(state) {
      state.signIsVisible = true;
    },
    hideSignOverlay(state)  {
      state.signIsVisible = false;
    },
    showsLogInOverlay(state) {
      state.logInIsVisible = true;
    },
    hideLogInOverlay(state)  {
      state.logInIsVisible = false;
    }

  },
});

export const { showLandingOverlay, hideLandingOverlay, showPlanetsOverlay, hidePlanetsOverlay, showDialogOverlay, hideDialogOverlay, showsSignOverlay, hideSignOverlay, showsLogInOverlay, hideLogInOverlay } = overlaySlice.actions;

export default overlaySlice.reducer;

