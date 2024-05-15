'use client'

import { Button, Card, CardBody, CloseButton,  Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay,  Heading, Image,  Spinner, Stack, Tag, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import "react-quill/dist/quill.snow.css"; 

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { showDialogOverlay } from '@/app/store/overlaySlice';
import { setSelectedContent } from '@/app/store/contentSlice';
import { setCurrentArticle } from '@/app/store/articleSlice';
import { FiEdit3 } from 'react-icons/fi';
import DOMPurify from 'dompurify';
import { IArticle } from '@/app/utils/types';

interface ArticleListProps {
  isOpen: boolean;
  onClose: () => void;
}

const ArticleList = ({ isOpen, onClose }:ArticleListProps) => {
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
          alt='Caffe Latte'
        />
        <Stack>         
          <CardBody>            
              
              <Heading size='sm' mb='8px'>
                  {article.title}
              </Heading>
              
              { // show the date in a small tag
              article.createdAt && 
              <Tag mb='8px' p='6px' position='absolute' top='12px' right='12px' >
                {new Date(article.createdAt).toLocaleDateString()}
              </Tag>
              } 
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

            <Heading as='h1' size='md'>learn about {selectedPlanet}</Heading>
        
          </DrawerHeader>
          
          <DrawerBody>
              
             <NewArticleButton />
              <br />
              {isLoading && <Spinner m='auto'/>}
              {!isLoading && articles &&
            
              articles.map((article:IArticle) => (          
                      <ArticleCard 
                        key={article._id} 
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
