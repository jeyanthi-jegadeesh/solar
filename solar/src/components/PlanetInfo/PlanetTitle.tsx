'use client'

import { Box, Heading, Text } from '@chakra-ui/react';
import DOMPurify from 'dompurify';

function getPlanetSymbol(planetName: string): { symbol: string; name: string } {
    const planetSymbols : { [key: string]: string } = {
      sun: "&#x2609;",        // Sun ☉
      mercury: "&#x263F;",    // Mercury ☿
      venus: "&#x2640;",      // Venus ♀
      earth: "&#x2295;",      // Earth ⊕ (alternative: ♁ &#x2641;)
      moon: "&#x263E;",       // Moon ☾
      mars: "&#x2642;",       // Mars ♂
      jupiter: "&#x2643;",    // Jupiter ♃
      saturn: "&#x2644;",     // Saturn ♄
      uranus: "&#x2645;",     // Uranus ♅
      neptune: "&#x2646;",    // Neptune ♆
      pluto: "&#x2647;",      // Pluto ♇
      ceres: "&#x26B3;",      // Ceres ⚳
      pallas: "&#x26B4;",     // Pallas ⚴
      juno: "&#x26B5;",       // Juno ⚵
      vesta: "&#x26B6;",      // Vesta ⚶
      chiron: "&#x26B7;",     // Chiron ⚷
      eris: "&#x2BF0;"        // Eris ⯰
    };
  
    // get the symbol from the list
    const symbol: string = planetSymbols[planetName.toLowerCase()] || "";
    // make the first letter capitalized again
    const name = planetName.charAt(0).toUpperCase() + planetName.slice(1);
  
    return { symbol, name };
  }


interface PlanetTitleProps {
    planetName:string;
}

const PlanetTitle = ({ planetName }:PlanetTitleProps) => {
    const { symbol, name } = getPlanetSymbol(planetName);
  
    return (
      <Box>
        <Heading as="h2" size="lg" fontWeight="bold" marginBottom={'1.5rem'}>
          <Text dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(symbol + ' ' + name) }} /> 
        </Heading>
      </Box>
    );
  };

  export default PlanetTitle;