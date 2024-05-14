'use client'
import { Box, Button, Checkbox, Editable, EditableInput, EditablePreview, Flex, Input, Text, Tooltip } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { allPlanetInfo } from './SpaceExplorer/mock_planetInfo';

import "react-quill/dist/quill.snow.css"; 
import DOMPurify from 'dompurify'; // purify input


import { FiSave, FiUploadCloud, FiXCircle} from 'react-icons/fi';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { Date } from 'mongoose';
import PhotoUpload from './PhotoUpload';
import ArticleList from './ArticleList';

async function createArticle(userId: number, isPrivate: boolean = true, title: string, articleBody: string, associatedPlanets : string[] ) {
 
  // TODO create actual fetch function for article!
    const articleData = {
      authorId: userId,
      isPrivate: isPrivate,
      title: title,
      subtitle: '',
      articleBody: articleBody,
      associatedPlanets: associatedPlanets,
    }

    const URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

    try {
      const response = await fetch(URL + '/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      });
  
      if (!response.ok) {
        console.error (`Error!`);
      }
  
      const result = await response.json();
      return result.data;
    } catch (err) {
      console.error('Error creating article:', err);
      return { success: false, message: err };
    }
  }


  function getArticleById(articleId?: number) {
    if (!articleId) return 'no article found...';
    return 'article dummy!'
    // TODO create actual fetch function for article!
  }


function getPlanetInfo(planetName: string) {
    if (!planetName) return undefined;
    
    const currentPlanetInfo = allPlanetInfo.filter(planet => planet.englishName.toLowerCase() === planetName.toLowerCase());
    return currentPlanetInfo[0];
  }


  type ArticleType = {
        authorId: 123,
        isPrivate: true,
        title: string,
        subtitle?: string,
        articleBody: string,
        associatedPlanets?: string[],
        _id?: string,
        createdAt?: Date,
        updatedAt?: Date,
      }
  
  interface ArticleProps {
    planetName: string;
    editMode: boolean;
    articleId?: number | undefined;
  }

const Article = ({planetName, editMode, articleId}:ArticleProps) => {
  const selectedPlanet = useSelector((state: RootState) => state.solarSystem.selectedPlanet);

  // import ReactQuill right here to avoid the document no defined error. -> see https://stackoverflow.com/questions/73047747/error-referenceerror-document-is-not-defined-nextjs
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]); // RTF Editor

  let firstArticle = getArticleById(articleId);

  // STATES: 
  const [quillText, setQuillText] = useState(''); // quillText -> the text inside of the quill editor.
  const [isArticlePrivate, setIsArticlePrivate] = useState(true); // quillText -> the text inside of the quill editor.
  const [articleTitle, setArticleTitle] = useState(''); // quillText -> the text inside of the quill editor.
  const [blogEditMode, setBlogEditMode] = useState(editMode); // if edit Mode is set to true, then the article will be opened inside quill, if not, it is shown as dangerouslysetinnerhtml...
  const [article, setArticle] = useState(firstArticle); // if edit Mode is set to true, then the article will be opened inside quill, if not, it is shown as dangerouslysetinnerhtml...
  


  // HANDLERS:
  async function onSaveHandler() { // handle saving the article
      const userId = 123;
      const purifiedArticle = DOMPurify.sanitize(quillText);
      const purifiedTitle = DOMPurify.sanitize(articleTitle);

      const newArticle = await createArticle( userId, 
                                              true, 
                                              purifiedTitle, 
                                              purifiedArticle, 
                                              selectedPlanet ? [selectedPlanet] : []
                                            ); 
      
      setArticle(newArticle!.articleBody)
      setBlogEditMode(false);
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setArticleTitle(event.target.value);
    console.log(articleTitle);
  };

  function handleIsPrivateChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIsArticlePrivate(!isArticlePrivate);
  };

 return (
    <>
        <Box>
            
            {/* CONDITIONAL RENDERING OF EDITOR ACCORDING TO THE editMode */}
            {
              blogEditMode ? 
              <>
              
              <ArticleList /> 
              
              {/* SHOW THE DATE ABOVE THE ARTICLE */}
              {/* TODO SHOW AUTHOR etc. according to the auth data */}
              {/* TODO make conditional rendering of editor dependent on auth -> if not logged in you can't edit. */}
              {/* <Text size='sm' color='grey' textAlign='right'>{(new Date()).toLocaleDateString()} <br /></Text> */}
              {/* QUILL EDITOR */}
              {/* TODO PUT THE EDITOR ITSELF IN ITS OWN FUNCTION / SUBCOMPONENT */}
              <Box h='500px'display="flex" flexDirection="column">
                <Text 
                  size='sm' 
                  color='gray'
                  marginBottom={15}
                  >
                    write something about {planetName}...
                </Text>
                
                <form>

                <Editable 
                  defaultValue='Click to edit title...' 
                  fontSize='x-large'
                  fontWeight={600}
                >
                  <EditablePreview />
                  <EditableInput 
                    type='text' 
                    value={articleTitle} 
                    onChange={handleTitleChange} 
                    marginBottom={15} 
                  />
                </Editable>
                  
                </form>
                  <Box 
                    height='auto'
                    overflowY='hidden'
                    marginBottom={15}
                  >

                    <ReactQuill
                              theme='snow' 
                              value={quillText} 
                              onChange={setQuillText} 
                              style={{ height: '300px', 
                                       display: 'flex', 
                                       flexDirection: 'column' 
                                    }}
                    />

                  </Box>

              {/* UPLOAD IMAGES TO ARTICLE */}
              {/* <Button leftIcon={ <FiUploadCloud size={24} />} variant='outline' w='100%' h={76}>upload Images to Article</Button> */}
              <PhotoUpload />

              </Box>
              
              {/* CONTROLS */}
              <Flex flexDirection='row' mb='0.5rem' justifyContent='space-between'>
      
                <Tooltip label='checking this box will make your article visible to our community' hasArrow aria-label='A tooltip'>
                  <Checkbox onChange={handleIsPrivateChange}> 
                    make this article public
                  </Checkbox>
                </Tooltip>

                <Button leftIcon={ <FiXCircle size={24} />}  onClick={() => { setBlogEditMode(false) }} variant='ghost'>
                  cancel
                </Button>
              
                <Button leftIcon={ <FiSave size={24} />}  onClick={onSaveHandler} variant='solid'>
                  save article
                </Button>
              </Flex>
            </>
            : 
            article && <Box dangerouslySetInnerHTML={{ __html: article }} /> 
            }
    
        </Box>
    </>
  );
};

export default Article;
