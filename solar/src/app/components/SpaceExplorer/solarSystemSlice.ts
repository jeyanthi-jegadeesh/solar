
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { MutableRefObject } from 'react'
import * as THREE from 'three';


interface SolarSystemStateType {
  showControls: boolean, // show Leva controls for variables
  isPlanetHovered: boolean,
  selectedPlanet: string | null,
  systemScale: number, //the factor to define the scale og the solar system
  systemSpeed: number, // factor to change the velocity of celestial objects
}

const initialState:SolarSystemStateType = { 
        showControls: false,
        isPlanetHovered: false,
        selectedPlanet: null,
        systemScale: 0.1, 
        systemSpeed: 0.1,
        }

const solarSystemSlice = createSlice({

  name: 'solarSystem',
  initialState,

  reducers: {

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
    },

    startMovement(state, action) {
      const planetName = action.payload;
        //start movement
    },

    stopMovement(state, action) {
      const planetName = action.payload;
      // stop movement
    },

  },
})

export const { addPlanetRef, startMovement, stopMovement, updateSelectedPlanet, toggleIsPlanetHovered, toggleControls } = solarSystemSlice.actions
export default solarSystemSlice.reducer

