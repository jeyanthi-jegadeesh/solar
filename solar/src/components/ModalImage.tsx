import React from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Image,
} from "@chakra-ui/react";
import { ModalImageProps } from "../app/utils/types"; //importing modal type

const ModalImage: React.FC<ModalImageProps> = ({
  imageUrl,
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay
      bg='blackAlpha.800'
      backdropFilter='blur(10px) hue-rotate(90deg)'
      />
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <Image src={imageUrl} alt="Large Image" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalImage;