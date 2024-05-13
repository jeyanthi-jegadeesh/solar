'use client'
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { allPlanetInfo } from './SpaceExplorer/mock_planetInfo';

import "react-quill/dist/quill.snow.css"; 
import DOMPurify from 'dompurify'; // purify input


import { FiSave, FiUploadCloud, FiXCircle} from 'react-icons/fi';
import dynamic from 'next/dynamic';



async function createArticle(userId: number, isPrivate: boolean, title: string, articleBody: string) {
  // TODO create actual fetch function for article!
    const articleData = {
      authorId: userId,
      isPrivate: isPrivate,
      title: title,
      article: articleBody,
    }

    console.log(articleData);

    try {
      const response = await fetch('localhost:3000/api/articles', {
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
      return result;
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

  
  interface ArticleProps {
    planetName: string;
    editMode: boolean;
    articleId?: number | undefined;
  }

const Article = ({planetName, editMode, articleId}:ArticleProps) => {
  // const selectedPlanet = useSelector((state: RootState) => state.solarSystem.selectedPlanet);

  // import ReactQuill right here to avoid the document no defined error. -> see https://stackoverflow.com/questions/73047747/error-referenceerror-document-is-not-defined-nextjs
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]); // RTF Editor

  let article = getArticleById(articleId);

  // STATES: 
  const [quillText, setQuillText] = useState(article); // quillText -> the text inside of the quill editor.
  const [articleTitle, setArticleTitle] = useState(''); // quillText -> the text inside of the quill editor.
  const [blogEditMode, setBlogEditMode] = useState(editMode); // if edit Mode is set to true, then the article will be opened inside quill, if not, it is shown as dangerouslysetinnerhtml...

  // HANDLERS:
  function onSaveHandler() { // handle saving the article
      const userId = 123;
      const purifiedArticle = DOMPurify.sanitize(quillText);
      const purifiedTitle = DOMPurify.sanitize(articleTitle);

      createArticle(userId, true, purifiedTitle,  purifiedArticle);
      
      article = purifiedArticle;
      console.log("SAVING BLOG ARTICLE", purifiedArticle);
      setBlogEditMode(false);
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setArticleTitle(event.target.value);
    console.log(articleTitle);
  };

  return (
    <>
        <Box>
            
            {/* CONDITIONAL RENDERING OF EDITOR ACCORDING TO THE editMode */}
            {
              blogEditMode ? 
              <>
              <Text size='sm' color='gray'>write something about {planetName}...</Text>
              <form>
                <Input type='text' placeholder='My title...' value={articleTitle} onChange={handleTitleChange} ></Input>
              </form>
              
              {/* SHOW THE DATE ABOVE THE ARTICLE */}
              {/* TODO SHOW AUTHOR etc. according to the auth data */}
              {/* TODO make conditional rendering of editor dependent on auth -> if not logged in you can't edit. */}
              {/* <Text size='sm' color='grey' textAlign='right'>{(new Date()).toLocaleDateString()} <br /></Text> */}
              {/* QUILL EDITOR */}
              {/* TODO PUT THE EDITOR ITSELF IN ITS OWN FUNCTION / SUBCOMPONENT */}
              <Box h='500px'>
                <ReactQuill
                          className='ql-editor' 
                          theme='snow' 
                          value={quillText} 
                          onChange={setQuillText} 
                          min-height='200px'
                          max-height='300px'
                />
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
              <Button leftIcon={ <FiUploadCloud size={48} />} variant='ghost'>upload Images to Article</Button>
            </>
            : article 
            }
    
        </Box>
    </>
  );
};

export default Article;
