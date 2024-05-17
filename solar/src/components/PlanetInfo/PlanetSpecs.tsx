'use client'

import { Accordion, Box, Button, Table, TableCaption, TableContainer, Tag, Tbody, Td, Text, Tr } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
import PlanetTitle from './PlanetTitle';
import { allPlanetInfo } from '../../app/data/mock_planetInfo';
import { updateSelectedPlanet } from '@/app/store/solarSystemSlice';

function getPlanetInfo(planetName: string) {
    if (!planetName) return undefined;
    
    const currentPlanetInfo = allPlanetInfo.filter(planet => planet.englishName.toLowerCase() === planetName.toLowerCase());
    return currentPlanetInfo[0];
  }

interface PlanetSpecsTableProps {
    planetName: string;
  }
function PlanetSpecsTable({planetName}:PlanetSpecsTableProps) {
    
    // define a function that jumps to the moon when clicked on
    const dispatch = useDispatch();
    const handleMoonClick = (moonName: string) => {
        console.log('JUMPING TO MOON:', moonName)
        dispatch(updateSelectedPlanet(moonName));
    }
    
    // check if a planet name was given
    if (!planetName) return <><Text>no planet info available :(</Text></>;
    
    // get all Planets info for the selected planet
    const planetInfo = getPlanetInfo(planetName);

    // set placeholder text in case there is no information available
    if (!planetInfo) return <><Text>No planet info available.</Text></>;
        
    return (
    <TableContainer>
    <Table variant='simple' size='sm' layout='fixed' w='100%' >
        <TableCaption></TableCaption>
        <Tbody>
            <Tr>
                <Td>Type:</Td>
                <Td>{planetInfo?.bodyType}</Td>
            </Tr>
            

            {/* MOONS -> LOGIC TO SHOW ALL OF THEM... */}
            { (planetInfo?.isPlanet && planetInfo?.moons?.length) ? 
                <>
            <Tr>
                <Td>Moons ({planetInfo?.moons?.length}):</Td>
                <Td overflow={'hidden'} whiteSpace={'nowrap'}>
                    {planetInfo?.moons?.map((moon, index) => (
                        <Button key={index} marginRight={'0.5em'} size='xs' onClick={() => handleMoonClick(moon.moon)} >
                            {moon.moon} 
                        </Button>
                    ))}
                </Td>
            </Tr>
                </>
             : 
             null
            }        
        <Tr>
            <Td>Mass:</Td>
            <Td>{(planetInfo!.mass!.massValue / 5.97237).toPrecision(3)} M⊕ (Earth masses)</Td>

        </Tr>
        <Tr>
            <Td>Gravity:</Td>
            <Td>{planetInfo?.gravity} N/kg </Td>
        </Tr>
        <Tr>
            <Td>Distance from the sun (avg.)</Td>
            <Td>{Math.round(planetInfo!.semimajorAxis! / 1000000)} M km</Td>
        </Tr>
        <Tr>
            <Td>Diameter:</Td>
            <Td>{Math.round(planetInfo!.meanRadius! * 2)} km</Td>
        </Tr>
        <Tr>
            <Td>Orbit Time (sideral Orbit)</Td>
            <Td>approx. {Math.round(planetInfo!.sideralOrbit!)} Earth Days</Td>
        </Tr>
        
        {
            planetInfo!.avgTemp! ? 
                <Tr>
                    <Td>avg. temperature:</Td>
                    <Td>{planetInfo!.avgTemp!} Kelvin</Td>
                </Tr>
                :
                null 
        }

        </Tbody>
    </Table>
</TableContainer>
)
}

const PlanetSpecs: React.FC = () => {
  const selectedPlanet = useSelector((state: RootState) => state.solarSystem.selectedPlanet);

  function handleMoonClick(planetName: string) {

  }

  return (
    <Box>

    {/* // LATER ADD CHAKRA "POPOVER" ELEMENTS FOR EXPLANATION TOOLTIPS  */}

        <PlanetSpecsTable planetName={selectedPlanet ? selectedPlanet : ''} />

    </Box>

  );
};

export default PlanetSpecs;
