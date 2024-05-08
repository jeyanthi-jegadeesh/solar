import OverlayLanding from '@/components/OverlayLandingComponent';
import SpaceExplorer from '@/components/SpaceExplorer/SpaceExplorer';
import { Box} from '@chakra-ui/react';

export default function App () {
    return(<>
        <SpaceExplorer />
        <div>
         <Box
            position="relative"
            zIndex={0}
            w="100vw" 
            h="100vh" 
            bgSize="cover" 
            bgPosition="center" 
            bgRepeat="no-repeat" 
            bg='black'
            // style={{ backgroundImage: "url('/solar.png')" }} >
            >
         </Box>
         <OverlayLanding />
      </div>
      </>
    );
}
