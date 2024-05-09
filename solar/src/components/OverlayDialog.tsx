import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { hideOverlay } from '../app/store/overlaySlice';
import { RootState } from '../app/store/store';
import Quiz from './Quiz';
// import Article from './Article';

const OverlayDialog: React.FC = () => {
  const dispatch = useDispatch();
  const isVisible = useSelector((state: RootState) => state.overlay.isVisible);
  const selectedPlanet = useSelector((state: RootState) => state.solarSystem.selectedPlanet);
  const selectedContent = useSelector((state: RootState) => state.content.selectedContent);

  const handleClose = () => {
    dispatch(hideOverlay());
  };

  let content;
  if (selectedContent === 'quiz') {
    content = selectedPlanet ? <Quiz planetName={selectedPlanet} /> : <Quiz planetName="Mars" />;
  } else {
    // content = selectedPlanet ? <ArticleComponent planetName={selectedPlanet} /> : null;
  }

  return (
    <Modal isOpen={isVisible} onClose={handleClose}>
      <ModalOverlay />
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
