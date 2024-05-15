import React from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
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
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton color="white" margin-left="10px" />
        <ModalBody>
          <Image src={imageUrl} alt="Large Image" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalImage;