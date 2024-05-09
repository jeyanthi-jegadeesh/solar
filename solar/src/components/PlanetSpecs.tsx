import { Box, Table, TableCaption, TableContainer, Tag, Tbody, Td, Text, Tr } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store/store';
import PlanetTitle from './PlanetTitle';
import { allPlanetInfo } from './SpaceExplorer/mock_planetInfo';

function getPlanetInfo(planetName: string) {
    if (!planetName) return undefined;
    
    const currentPlanetInfo = allPlanetInfo.filter(planet => planet.englishName.toLowerCase() === planetName.toLowerCase());
    return currentPlanetInfo[0];
  }

interface PlanetSpecsTableProps {
    planetName: string;
  }
function PlanetSpecsTable({planetName}:PlanetSpecsTableProps) {
    if (!planetName) return <><Text>no planet info available :(</Text></>;
    
    const planetInfo = getPlanetInfo(planetName);
    if (!planetInfo) return <><Text>No planet info available.</Text></>;
    return (
    <TableContainer>
    <Table variant='simple' size='sm' layout='fixed' w='100%' >
        <TableCaption>Planet Specs</TableCaption>
        <Tbody>
        <Tr>
            <Td>Type:</Td>
            <Td>{planetInfo?.bodyType}</Td>
        </Tr>
            {/* Render conditionally */}
            
            { (planetInfo?.isPlanet && planetInfo?.moons?.length) ? 
                <>
        <Tr>
                <Td>Moons ({planetInfo?.moons?.length}):</Td>
                <Td overflow={'hidden'} whiteSpace={'nowrap'}>
                    {planetInfo?.moons?.map((moon, index) => (
                    <Tag key={index} marginRight={'0.5em'}>
                        {moon.moon} 
                    </Tag>
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
        {planetInfo!.avgTemp! ? 
        <Tr>
            <Td>avg. temperature:</Td>
            <Td>{planetInfo!.avgTemp!} Kelvin</Td>
        </Tr>
        :
        null }
        </Tbody>
    </Table>
</TableContainer>
)
}

const PlanetSpecs: React.FC = () => {
  const selectedPlanet = useSelector((state: RootState) => state.solarSystem.selectedPlanet);

  return (
    <Box>

    {/* // LATER ADD CHAKRA "POPOVER" ELEMENTS FOR EXPLANATION TOOLTIPS  */}
     <PlanetTitle planetName={selectedPlanet ? selectedPlanet : ''} />
 
        <PlanetSpecsTable planetName={selectedPlanet ? selectedPlanet : ''} />

    </Box>

  );
};

export default PlanetSpecs;
