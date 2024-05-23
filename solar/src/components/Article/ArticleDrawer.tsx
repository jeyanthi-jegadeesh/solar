'use client'

import { Box, Button, Card, CardBody, CloseButton,  Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay,  Heading, Image,  Spinner, Stack, Tag, Text } from '@chakra-ui/react';
import React from 'react';

import "react-quill/dist/quill.snow.css"; 

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { showDialogOverlay } from '@/app/store/overlaySlice';
import { setSelectedContent } from '@/app/store/contentSlice';
import { setCurrentArticle } from '@/app/store/articleSlice';
import { FiEdit3, FiStar } from 'react-icons/fi';
import DOMPurify from 'dompurify';
import { IArticle } from '@/app/utils/types';
import ArticleList from './ArticleList';

interface ArticleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ArticleDrawer = ({ isOpen, onClose }:ArticleDrawerProps) => {
  const selectedPlanet = useSelector((state: RootState) => state.solarSystem.selectedPlanet);
  const dispatch = useDispatch();
  
  const NewArticleButton = () => {
      
    function handleClick() {
      dispatch(setCurrentArticle(null));
      dispatch(setSelectedContent('article'));
      dispatch(showDialogOverlay());
    }
    
    return (

      <Button 
        leftIcon={<FiEdit3 />} 
        variant='solid' 
        onClick={()=> handleClick()}
        marginBottom={10}
      >
        write a new article
      </Button>
      )
  }

  interface ArticleCardProps {
    article: IArticle;
  }

  const ArticleCard = ({article}:ArticleCardProps) => {
    const dispatch = useDispatch();

    function handleClick() {
        dispatch(setCurrentArticle(article));
        dispatch(setSelectedContent('article'));
        dispatch(showDialogOverlay());
    }

    // TODO SET EDIT MODE FOR ARTICLE SLICE TO TRUE

return(
   <Card   align='left' 
           onClick={()=> handleClick()}    
           border='1px solid #cccccc'
           padding='8px'
           marginBottom='16px'
           _hover={{
               background: "#cccccc",
               color: "teal.500",
             }}
           variant='elevated'
           direction={{ base: 'column', sm: 'row' }}
           >
        <Image
          objectFit='cover'
          w='100px'
          h='100px'
          maxW={{ base: '100%', sm: '200px' }}
          src={article.titleImage || 'https://random.imagecdn.app/250/250'}
          alt={article.title}
        />
        <Stack>         
          <CardBody>            
              
              <Heading size='sm' mb='8px'>
                  {article.title}
              </Heading>
              
              <Box position='absolute' top='12px' right='12px'>
              { // show the date in a small tag
              article.createdAt && 
              <Tag p='6px'  >
                {new Date(article.createdAt).toLocaleDateString()}
              </Tag>
              } 
                <FiStar />
              </Box>
              
            <Text
              overflow='hidden'
              noOfLines={3} // Adjust the number of lines to display before truncation
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.articleBody) }}
            />
          </CardBody>
       </Stack>
   </Card>
)}

 return (
    <>
      
      <Drawer 
        placement='right' 
        onClose={onClose} 
        isOpen={isOpen} 
        size='xl'
      >
        <DrawerOverlay />
        <DrawerContent
          bgGradient='linear(to-t, blue.700, black)' 
          opacity={0.9} 
          w='100%' 
          color='white' 
          padding="5" 
        >
          <DrawerHeader 
            borderBottomWidth='1px' 
            justifyContent='space-between'
          >
          
            <CloseButton onClick={onClose} />
            
            <Heading as='h1' size='md'>
                learn about {selectedPlanet}
            </Heading>
        
          </DrawerHeader>       
          <DrawerBody>  
            <NewArticleButton /> 
            <ArticleList />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ArticleDrawer;
