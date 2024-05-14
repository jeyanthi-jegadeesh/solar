'use client'

import { Box, Button, Card, CardBody, CardFooter, CardHeader, Checkbox, CloseButton, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Editable, EditableInput, EditablePreview, Flex, Heading, Input, Text, Tooltip, useDisclosure } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { allPlanetInfo } from './SpaceExplorer/mock_planetInfo';

import "react-quill/dist/quill.snow.css"; 

import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import Link from 'next/link';
import { title } from 'process';
import Image from 'next/image';


const ArticleCard = ({article}) => {

return(
   <Card   align='left' 
           onClick={()=> alert('hello moto')} 
           height='250px'  
           border='1px solid #cccccc'
           padding='8px'
           marginBottom='16px'
           _hover={{
               background: "#cccccc",
               color: "teal.500",
             }}>

       <CardHeader>
           <Heading size='sm'>
               {article.title}
           </Heading>
       </CardHeader>
       
       <CardBody textOverflow='ellipsis' 
               overflow='hidden'>
           
           { article.type === 'article' && <Text>{article.content}</Text> }
           <img 
            src={article.image} 
            alt={article.title} 
            width='100%' 
           />
       </CardBody>
   </Card>

)}

const ArticleList = ({ articleId}) => {
  const selectedPlanet = useSelector((state: RootState) => state.solarSystem.selectedPlanet);
//   let firstArticle = getArticleById(articleId);

  const { isOpen, onOpen, onClose } = useDisclosure()

    const articles = [{
        title: 'Mouse on Mars',
        image: 'https://random.imagecdn.app/200/150',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        title: 'Mouse on Earth',
        image: 'https://random.imagecdn.app/200/150',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        title: 'Mouse on Jupiter',
        image: 'https://random.imagecdn.app/200/150',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        title: 'Mouse on Saturn',
        image: 'https://random.imagecdn.app/200/150',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        title: 'Mouse on Uranus',
        image: 'https://random.imagecdn.app/200/150',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
    ]

 return (
    <>
      <Drawer placement='right' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader 
            borderBottomWidth='1px' 
            justifyContent='space-between'
          >
            Articles
            <CloseButton onClick={onClose} />
          </DrawerHeader>
          <DrawerBody>
                            {articles.map(article => (    
                                <>       
                                    <ArticleCard article={article} />
                                </>
                            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ArticleList;
