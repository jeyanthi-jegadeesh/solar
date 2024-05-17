'use client'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { Box, Card, CardBody, Heading, Image,  SimpleGrid,  Spinner, Stack, Tag, Text,  Tooltip  } from '@chakra-ui/react';

import { addArticleToFavs, removeArticleFromFavs, setCurrentArticle } from '@/app/store/articleSlice';
import { showDialogOverlay } from '@/app/store/overlaySlice';
import { setSelectedContent } from '@/app/store/contentSlice';

import DOMPurify from 'dompurify';

import "react-quill/dist/quill.snow.css"; 
import { IArticle } from '@/app/utils/types';
import { FiLock, FiStar } from 'react-icons/fi';

interface ArticleListProps {
  favList?: boolean;
}

const ArticleList = ({favList = false}:ArticleListProps) => {
  const selectedPlanet = useSelector((state: RootState) => state.solarSystem.selectedPlanet);
  const favouriteArticles = useSelector((state: RootState) => state.article.favouriteArticles);
  const [isLoading, setIsLoading] = useState(false)
  const [articles, setArticles] = useState<IArticle[]>();
  

  async function getArticlesByPlanet (planetName: string) {
    const URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3000";
    
    if (!planetName) return [];
    
    try {
        const response = await fetch(URL + '/api/articles/planet/' + planetName);
        const articleRes = await response.json();

        return articleRes.data;
    } catch (err) {
        console.error(err);
        return [];
    }
}

  useEffect(() => {
    if (favList) {
      setArticles(favouriteArticles);
    } else {  
      const fetchArticles = async () => {
        setIsLoading(true);
        const fetchedArticles = await getArticlesByPlanet(selectedPlanet || 'earth');
        setArticles(fetchedArticles);
        setIsLoading(false);
      };
      fetchArticles();
    }
  }, [favList, selectedPlanet, favouriteArticles]);

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
    
    function handleFavClick(newFavArticle: IArticle) {
      const isAlreadyFav = favouriteArticles.some(article => article === newFavArticle);
      console.log('clicked on', article);
      if (isAlreadyFav) {
          dispatch(removeArticleFromFavs(newFavArticle));
      } else {
          dispatch(addArticleToFavs(newFavArticle));
      }
  }
    
    // TODO SET EDIT MODE FOR ARTICLE SLICE TO TRUE

return(
    <Card   align='left'    
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

              <Box position='absolute' top='12px' right='12px' justifyContent='space-between'>
                  
                  {article.isPrivate && 
                    <Tooltip
                      label='this article is private' 
                      hasArrow 
                      aria-label='this article is private'
                    >
                      <Tag>
                        <FiLock />
                      </Tag>
                    </Tooltip>
                  }

                <Tooltip
                  label='add to favorites' 
                  hasArrow 
                  aria-label='add to favorites'
                  >
                  <Tag onClick={()=> {handleFavClick(article)}}>
                      <FiStar />
                  </Tag>
                </Tooltip> 

                  </Box>
                  <Box position='absolute' bottom='12px' left='12px'>
                  { // show the date in a small tag
                    article.createdAt && 
                      <Tag p='6px'  >
                        {new Date(article.createdAt).toLocaleDateString()}
                      </Tag>
                  } 
                </Box>
                <Box  onClick={()=> handleClick()}>
                <Heading size='sm' mb='8px'>
                    {article.title}
                </Heading>

              <Text
                overflow='hidden'
                noOfLines={3} // Adjust the number of lines to display before truncation
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.articleBody) }}
              />
              </Box>
            </CardBody>
        </Stack>
    </Card>
)}

 return (
    <>
              <br />
              {isLoading && <Spinner m='auto'/>}
              
              <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(400px, 1fr))'>
            
                {!isLoading && articles &&
                  articles.map((article:IArticle) => (          
                      <ArticleCard 
                        key={article._id} 
                        article={article} 
                      />
                  ))
                }
            
              </SimpleGrid>
    </>
  );
};

export default ArticleList;
