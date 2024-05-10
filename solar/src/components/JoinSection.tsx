'use client'
import { HStack, VStack } from '@chakra-ui/react'
import { Box, Text , Button, Link} from '@chakra-ui/react';
import { Grid, GridItem } from '@chakra-ui/react'
import NextLink from 'next/link';
import { showsSignOverlay , showsLogInOverlay } from '@/app/store/overlaySlice';
import { useSelector, useDispatch } from 'react-redux';

function JoinSection () {

    const dispatch = useDispatch();

    const handleOpenSign = () => {
      dispatch(showsSignOverlay());
      
    };

    const handleOpenLog = () => {
        dispatch(showsLogInOverlay());
        
      };
    return (


        <Box bgGradient='linear(to-t, blue.700, black)' opacity={0.9} w='100%' color='white' padding="5" maxW="3xl" margin="auto">
            <Grid templateColumns='repeat(2,1fr)'>
                <GridItem colSpan={1}>
                    <Text fontSize='xl' mb={5}>
                    Start Your Journey Today  
                    </Text>
                    <Text>
                        Join Cosmos Explorer and start your exploration now and see where it takes you!
                    </Text>
                </GridItem>
                <GridItem>
                    <VStack>
                        <Text>travel space with us:</Text>
                    <VStack>
                        
                            <Button onClick={handleOpenSign} bgColor='rgb(23,18,68)' color='rgb(220,220,220)' width='10rem' _hover={{color: 'rgb(255,255,255)', backgroundColor: 'rgb(89,81,169)'}}>
                                Sign Up
                            </Button>
                        <HStack>
                        <Text fontSize='xs'>have an Account?</Text>
                            <Button onClick={handleOpenLog} sx={{ textDecoration: "none" , color:'rgb(141,66,239)',fontSize:'xs' ,fontWeight:'700' }}>Log In</Button>

                        </HStack>
                    </VStack>

                    

                    </VStack>
                </GridItem>
            </Grid>
        </Box>
    )

}
export default JoinSection