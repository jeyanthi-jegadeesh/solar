import React, { useState } from "react";
import { Box, Image, Button } from "@chakra-ui/react";
import { ImageContent } from "../app/utils/types";
import { useDispatch } from "react-redux";
import ModalImage from "./ModalImage";
//importing type from types.ts
interface ImageProps {
  content: ImageContent;
}

const ImageComponent: React.FC<ImageProps> = ({ content }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // /When we click on the image itself, the modal with a bigger version opens
  return (
    <>
      <Box width="200px" height="250px" overflow="hidden" position="relative">
        <Image
          src={content.imageUrl}
          alt="Carousel Image"
          width="100%"
          height="100%"
          objectFit="cover"
          cursor="pointer"
          onClick={() => setIsModalOpen(true)}
        />
      </Box>
      <ModalImage
        imageUrl={content.imageUrl}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ImageComponent;