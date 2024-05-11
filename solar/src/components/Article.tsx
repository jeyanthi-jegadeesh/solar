'use client'
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { allPlanetInfo } from './SpaceExplorer/mock_planetInfo';

import "react-quill/dist/quill.snow.css"; 
import DOMPurify from 'dompurify'; // purify input


import { FiSave, FiXCircle  } from 'react-icons/fi';
import PlanetTitle from './PlanetTitle';
import dynamic from 'next/dynamic';



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

const Article = ({planetName, editMode, articleId}:ArticleProps) => {
  // const selectedPlanet = useSelector((state: RootState) => state.solarSystem.selectedPlanet);

  // import ReactQuill right here to avoid the document no defined error. -> see https://stackoverflow.com/questions/73047747/error-referenceerror-document-is-not-defined-nextjs
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]); // RTF Editor

  function getArticleById(articleID?: number) {
    if (!articleId) return 'no article found...';
    return 'article dummy!'
    // TODO create actual fetch function for article!
  }

  let article = getArticleById(articleId);



  // STATES: 
  const [quillText, setQuillText] = useState(article); // quillText -> the text inside of the quill editor.
  const [blogEditMode, setBlogEditMode] = useState(editMode); // if edit Mode is set to true, then the article will be opened inside quill, if not, it is shown as dangerouslysetinnerhtml...

  // HANDLERS:
  function onSaveHandler() { // handle saving the article
      const purifiedArticle = DOMPurify.sanitize(quillText)  
      console.log("SAVING BLOG ARTICLE", purifiedArticle)
      article = quillText;
      setBlogEditMode(false);
  }

  return (
    <>
        <Box>
            <Text size='sm' color='gray'>write something about...</Text>
            
            <PlanetTitle planetName={planetName} />
            
            {/* SHOW THE DATE ABOVE THE ARTICLE */}
            {/* TODO SHOW AUTHOR etc. according to the auth data */}
            {/* TODO make conditional rendering of editor dependent on auth -> if not logged in you can't edit. */}
            <Text size='sm' color='grey'>{(new Date()).toLocaleDateString()}</Text>
            
            
            {/* CONDITIONAL RENDERING OF EDITOR ACCORDING TO THE editMode */}
            {
              blogEditMode ? 
              <>
              {/* QUILL EDITOR */}
              {/* TODO PUT THE EDITOR ITSELF IN ITS OWN FUNCTION / SUBCOMPONENT */}
              <Box minHeight='50vh'>
                <ReactQuill className='blog-editor' 
                          theme='snow' 
                          value={quillText} 
                          onChange={setQuillText} 
                          min-height='250px'/>
              </Box>

              {/* CONTROLS */}
              <Flex flexDirection='row' mb='0.5rem' justifyContent='space-between'>
                <Button leftIcon={ <FiXCircle size={24} />}  onClick={() => { setBlogEditMode(false) }} variant='ghost'>
                  cancel
                </Button>
                <Button leftIcon={ <FiSave size={24} />}  onClick={onSaveHandler} variant='ghost'>
                  save article
                </Button>
              </Flex>
            </>
            : article 
            }
    
        </Box>
    </>
  );
};

export default Article;
