import React, { useState } from "react";
import { CardBody, Image, Button } from "@chakra-ui/react";
import { ImageContent } from "../../app/utils/types";
import { useDispatch } from "react-redux";
import ModalImage from "../ModalImage";
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
      <Image
        src={content.imageUrl}
        alt="Carousel Image"
        width="100%"
        height="100%"
        objectFit="cover"
        cursor="pointer"
        borderRadius='lg'
        onClick={() => setIsModalOpen(true)}
      />
      <ModalImage
        imageUrl={content.imageUrl}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ImageComponent;