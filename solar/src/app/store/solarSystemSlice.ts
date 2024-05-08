
import { createSlice } from '@reduxjs/toolkit'
import { Mesh } from 'three';

interface SolarSystemStateType {
  showControls: boolean, // show Leva controls for variables
  isPlanetHovered: boolean,
  selectedPlanet: string | null,
  systemScale: number, //the factor to define the scale og the solar system
  systemSpeed: number, // factor to change the velocity of celestial objects
  planetRefs: {string: Mesh} | {};
}

const initialState:SolarSystemStateType = { 
        showControls: false,
        isPlanetHovered: false,
        selectedPlanet: null,
        systemScale: 0.1, 
        systemSpeed: 0.1,
        planetRefs: {}
        }

const solarSystemSlice = createSlice({

  name: 'solarSystem',
  initialState,

  reducers: {

    addPlanetRef(state, action) {
      const planetName = action.payload.name;
      const planetRef = action.payload.ref;
      state.planetRefs = {...state.planetRefs, [planetName]:planetRef};
      console.log(state.planetRefs)
    },

    toggleControls(state, action) {
      const isVisible:boolean = action.payload;
      state.showControls = isVisible;
    },

    toggleIsPlanetHovered(state) {
      state.isPlanetHovered = !state.isPlanetHovered ;
      console.log('hovered? ', state.isPlanetHovered)
    },

    // deselect planet -> set it to null
    updateSelectedPlanet(state, action) {
      const planetName:string | null = action.payload;
      state.selectedPlanet = planetName;
      console.log('selected Planet', state.selectedPlanet)
    },

    startMovement(state) {
      state.systemSpeed = 0.1
    },

    stopMovement(state, action) {
      state.systemSpeed = 0;
    },

  },
})

export const { addPlanetRef, startMovement, stopMovement, updateSelectedPlanet, toggleIsPlanetHovered, toggleControls } = solarSystemSlice.actions
export default solarSystemSlice.reducer

