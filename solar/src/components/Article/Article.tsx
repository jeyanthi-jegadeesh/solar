'use client'
import { Box, Button, Checkbox, Editable, EditableInput, EditablePreview, Flex, Heading, Image, Text, Tooltip } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { allPlanetInfo } from '../SpaceExplorer/mock_planetInfo';

import "react-quill/dist/quill.snow.css"; 
import DOMPurify from 'dompurify'; // purify input


import { FiSave, FiUploadCloud, FiXCircle} from 'react-icons/fi';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { Date } from 'mongoose';
import PhotoUpload from '../PhotoUpload';

async function createArticle(userId: number, isPrivate: boolean = true, title: string, articleBody: string, associatedPlanets : string[] ) {
 
  const associatedPlanetsLower = associatedPlanets.map(planet => planet.toLowerCase());

  // TODO create actual fetch function for article!
    const articleData = {
      authorId: userId,
      isPrivate: isPrivate,
      title: title,
      subtitle: '',
      articleBody: articleBody,
      associatedPlanets: associatedPlanetsLower,
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

function getPlanetInfo(planetName: string) {
    if (!planetName) return undefined;
    
    const currentPlanetInfo = allPlanetInfo.filter(planet => planet.englishName.toLowerCase() === planetName.toLowerCase());
    return currentPlanetInfo[0];
  }
  
  interface ArticleProps {
    planetName: string;
    editMode: boolean;
    articleId?: number | undefined;
  }

const Article = ({planetName, articleId}:ArticleProps) => {
  const selectedPlanet = useSelector((state: RootState) => state.solarSystem.selectedPlanet);
  const currentArticle = useSelector((state: RootState) => state.article.currentArticle);

  // import ReactQuill right here to avoid the document no defined error. -> see https://stackoverflow.com/questions/73047747/error-referenceerror-document-is-not-defined-nextjs
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]); // RTF Editor

  // STATES: 
  const [quillText, setQuillText] = useState(''); // quillText -> the text inside of the quill editor.
  const [isArticlePrivate, setIsArticlePrivate] = useState(true); // quillText -> the text inside of the quill editor.
  const [articleTitle, setArticleTitle] = useState(''); // quillText -> the text inside of the quill editor.
  const [blogEditMode, setBlogEditMode] = useState(false); // if edit Mode is set to true, then the article will be opened inside quill, if not, it is shown as dangerouslysetinnerhtml...
  
  useEffect(() => {
    if (currentArticle) {
      setQuillText(currentArticle.articleBody);
      setArticleTitle(currentArticle.title);
      setIsArticlePrivate(currentArticle.isPrivate);
      setBlogEditMode(false);
    } else {
      setBlogEditMode(true);
    }
  }, [currentArticle]);

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
                    defaultValue={articleTitle || 'Click to edit title...'} 
                    fontSize='x-large'
                    fontWeight={600}
                  >
                    <EditablePreview />

                    <EditableInput 
                      type='text' 
                      value={articleTitle} 
                      defaultValue={planetName + ' Observations'} 
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
        
                  <Tooltip 
                    label='checking this box will make your article visible to our community' 
                    hasArrow aria-label='A tooltip'
                  >

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
              currentArticle && 
              <>
              <Box p='8px' overflowY='auto' maxH='80vh'> 
              <Heading as='h1' size='md'>{currentArticle.title}</Heading>
              
              {currentArticle.subtitle && 
                <Heading 
                  as='h2' 
                  size='xxs' 
                  color='#cccccc'>
                    {currentArticle.subtitle}
                </Heading>
              }
              
              <Image src={currentArticle.titleImage || 'https://random.imagecdn.app/500/300'} width='100%' alt={currentArticle.title} mt='12px' mb='12px'/>
              
              <Text 
                pt='8px' 
                pb='16px' 
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(currentArticle.articleBody) }} 
                overflowY='scroll'
              />

              </Box>
              <Button onClick={() => (setBlogEditMode(true))} >edit article</Button>
              </>
              }
              
          </Box>
    </>
  );
};

export default Article;
