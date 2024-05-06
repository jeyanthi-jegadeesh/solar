

// Define initial state
const initialState = {
    planets: [], // Array of planet objects with name, position, velocity, etc.
  };
  
  // Create slice
  const planetsSlice = createSlice({
    name: 'planets',
    initialState,
    reducers: {
      updatePlanetPosition(state, action) {
        const { planetName, newPosition } = action.payload;
        state.planets = state.planets.map((planet) =>
          planet.name === planetName ? { ...planet, position: newPosition } : planet
        );
      },
  
      startPlanetMovement(state, action) {
        const planetName = action.payload;
        // You can add logic to start movement here if needed
      },
  
      stopPlanetMovement(state, action) {
        const planetName = action.payload;
        // You can add logic to stop movement here if needed
      },
    },
  });
  
  // Export actions
  export const {
    updatePlanetPosition,
    startPlanetMovement,
    stopPlanetMovement,
  } = planetsSlice.actions;
  
  // Create store
  export default configureStore({
    reducer: planetsSlice.reducer,
  });
  
  import { configureStore, createSlice } from '@reduxjs/toolkit';
  // Planet component
  import { useDispatch, useSelector } from 'react-redux';
  
  const Planet = ({ name, orbitingAround }) => {
    const dispatch = useDispatch();
    const planets = useSelector((state) => state.planets);
  
    // Use useEffect or useRef to manage animation logic
  
    // Dispatch actions to update position or start/stop movement
    const updatePosition = (newPosition) => {
      dispatch(updatePlanetPosition({ planetName: name, newPosition }));
    };
  
    const startMovement = () => {
      dispatch(startPlanetMovement(name));
    };
  
    const stopMovement = () => {
      dispatch(stopPlanetMovement(name));
    };
  
    // Render the planet component
  };