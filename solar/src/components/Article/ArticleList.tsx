'use client'

import { Box, Card, CardBody,  Container,  Heading, Image,  SimpleGrid,  Spinner, Stack, Tag, Text, Tooltip, Wrap, WrapItem } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import "react-quill/dist/quill.snow.css"; 

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { showDialogOverlay } from '@/app/store/overlaySlice';
import { setSelectedContent } from '@/app/store/contentSlice';
import { addArticleToFavs, removeArticleFromFavs, setCurrentArticle } from '@/app/store/articleSlice';
import DOMPurify from 'dompurify';
import { IArticle } from '@/app/utils/types';
import { getServerSession } from 'next-auth';
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
    if (favList) {
      setArticles(favouriteArticles);
      console.log(favouriteArticles);
    } else {  
      const fetchArticles = async () => {
        setIsLoading(true);
        const fetchedArticles = await getArticlesByPlanet(selectedPlanet || 'earth');
        setArticles(fetchedArticles);
        setIsLoading(false);
        console.log(fetchedArticles);
      };
      fetchArticles();
    }
  }, [selectedPlanet, favouriteArticles]);

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
          console.log('Removed article from FAVS:', newFavArticle);
      } else {
          dispatch(addArticleToFavs(newFavArticle));
          console.log('Added article to FAVS:', newFavArticle);
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

              <Box position='absolute' top='12px' right='12px' >
                  {article.isPrivate && 
                    <Tooltip 
                      label='this article is private' 
                      hasArrow aria-label='A tooltip'
                    >
                      <Tag>
                        <FiLock />
                      </Tag>
                    </Tooltip>
                  }
                
                <Tooltip 
                  label='add to favorites' 
                  hasArrow aria-label='A tooltip'
                >
                  <Tag onClick={()=> handleFavClick(article)}>
                      <FiStar /> {/*TODO onclick -> addtofavourites */}
                  </Tag>
                </Tooltip> 

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
