// import React, { useState } from 'react';
// import {
//   Box,
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   Textarea,
//   useToast
// } from '@chakra-ui/react';

// const ArticleEditor = () => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const toast = useToast();

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log('Submitting:', title, content);
//     toast({
//       title: "Article submitted.",
//       description: "Your article has been submitted successfully.",
//       status: "success",
//       duration: 5000,
//       isClosable: true,
//     });
//   };

//   return (
//     <Box
//       p={5}
//       borderWidth="1px"
//       borderRadius="md"
//       boxShadow="md"
//       className="article-editor"
//     >
//       <form onSubmit={handleSubmit}>
//         <Box mb={4} className="toolbar">
//           <FormControl>
//             <FormLabel htmlFor="title">Title of your article</FormLabel>
//             <Input
//               id="title"
//               placeholder="Title of your article"
//               value={title}
//               onChange={e => setTitle(e.target.value)}
//               className="article-title-input"
//             />
//           </FormControl>
//         </Box>
//         <FormControl mb={4}>
//           <Textarea
//             id="content"
//             placeholder="Write your article here..."
//             value={content}
//             onChange={e => setContent(e.target.value)}
//             className="article-textarea"
//           />
//         </FormControl>
//         <Box mt={4} textAlign="right" className="editor-buttons">
//           <Button type="submit" colorScheme="teal" className="submit-button">
//             Submit
//           </Button>
//         </Box>
//       </form>
//     </Box>
//   );
// };

// export default ArticleEditor;

