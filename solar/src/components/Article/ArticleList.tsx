'use client'

import { Box, Button, Card, CardBody, CardFooter, CardHeader, Checkbox, CloseButton, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Editable, EditableInput, EditablePreview, Flex, Heading, Image, Input, Spinner, Stack, Text, Tooltip, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { allPlanetInfo } from '../SpaceExplorer/mock_planetInfo';

import "react-quill/dist/quill.snow.css"; 

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { showDialogOverlay } from '@/app/store/overlaySlice';
import { setSelectedContent } from '@/app/store/contentSlice';
import { setCurrentArticle } from '@/app/store/articleSlice';
import { FiEdit3 } from 'react-icons/fi';


const ArticleList = ({ isOpen, onClose }) => {
  const selectedPlanet = useSelector((state: RootState) => state.solarSystem.selectedPlanet);
  const [isLoading, setIsLoading] = useState(false)
  const [articles, setArticles] = useState([]);
  const dispatch = useDispatch();
  

  async function getArticlesByPlanet (planetName: string) {
    const URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3000";
    
    if (!planetName) return [];
    
    try {
        const response = await fetch(URL + '/api/articles/planet/' + planetName);
        console.log(URL + '/api/articles/planet/' + planetName)
        const articleRes = await response.json();

        console.log(articleRes.data);
        return articleRes.data;
    } catch (err) {
        console.error(err);
        return [];
    }
}


  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      const fetchedArticles = await getArticlesByPlanet(selectedPlanet || 'earth');
      setArticles(fetchedArticles);
      setIsLoading(false);
      console.log(fetchedArticles);
    };

    fetchArticles();
  }, [selectedPlanet]);

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


  const ArticleCard = ({article}) => {
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
          maxW={{ base: '100%', sm: '200px' }}
          src={article.titleImage || 'https://random.imagecdn.app/250/250'}
          alt='Caffe Latte'
        />
        <Stack>
          <CardHeader>
              <Heading size='sm'>
                  {article.title}
              </Heading>
          </CardHeader>
          
          <CardBody textOverflow='ellipsis' 
                  overflow='hidden'>
              
              { article.type === 'article' && <Text>{article.content}</Text> }
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

            learn about {selectedPlanet}
          
          </DrawerHeader>
          
          <DrawerBody>
            
              <NewArticleButton />
            
              {isLoading && <Spinner />}
              {!isLoading && articles &&
            
              articles.map(article => (          
                      <ArticleCard 
                        key={article.title} 
                        article={article} 
                        // onClick={} 
                      />
              ))
              }
          
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ArticleList;
