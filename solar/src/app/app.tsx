import Overlay from '@/components/OverlayComponent';
import { Box} from '@chakra-ui/react';

export default function App () {
    return(
        <div>
         <Box
            position="relative"
            zIndex={0}
            w="100vw" 
            h="100vh" 
            bgSize="cover" 
            bgPosition="center" 
            bgRepeat="no-repeat" 
            style={{ backgroundImage: "url('/solar.png')" }} >   
         </Box>
         <Overlay></Overlay> 
      </div>
    );
}
