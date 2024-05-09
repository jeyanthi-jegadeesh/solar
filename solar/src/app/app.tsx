import OverlayLanding from '@/components/OverlayLandingComponent';
import SpaceExplorer from '@/components/SpaceExplorer/SpaceExplorer';
import { Box} from '@chakra-ui/react';

export default function App () {
    return(
      <>
        <SpaceExplorer />
        <OverlayLanding />
      </>
    );
}
