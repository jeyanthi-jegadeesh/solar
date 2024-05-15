import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { hideDialogOverlay } from '../app/store/overlaySlice';
import { RootState } from '../app/store/store';
import Quiz from './Quiz';
import Article from './Article/Article';
// import Article from './Article';

const OverlayDialog: React.FC = () => {
  const dispatch = useDispatch();
  const isVisible = useSelector((state: RootState) => state.overlay.dialogIsVisible);
  const selectedPlanet = useSelector((state: RootState) => state.solarSystem.selectedPlanet);
  const selectedContent = useSelector((state: RootState) => state.dialog.selectedContent);

  const handleClose = () => {
    dispatch(hideDialogOverlay());
  };

  let content;
  if (selectedContent === 'quiz') {
    content = selectedPlanet ? <Quiz planetName={selectedPlanet} /> : <Quiz planetName="Mars" />;
  } else {
    content = selectedPlanet ? <Article /> : null;
  }

  return (
    <Modal isOpen={isVisible} onClose={handleClose} size="xl">
      <ModalOverlay 
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
      />
      <ModalContent>
        <ModalHeader>
          {selectedContent === 'quiz' ? 'Quiz' : 'Article'}
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>{content}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default OverlayDialog;
