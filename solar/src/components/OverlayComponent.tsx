import { Box} from '@chakra-ui/react';
import  AboutContent  from "@/components/AboutContent";
import { Flex, Spacer } from '@chakra-ui/react';


const Overlay = () => (
 
    <Box position="absolute" zIndex={10}  top={2.5} left={2.5} m={5} >
        <Flex>
            <Box p='10'>
                <AboutContent></AboutContent>
            </Box>
        <Spacer />
            <Box p='10' bg='green.400'>
                {/* add news section component here */}
            </Box>
        </Flex>
       
    </Box>
)

export default Overlay;