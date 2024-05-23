'use client'

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton } from '@chakra-ui/react';
import { hideSignOverlay } from '@/app/store/overlaySlice';
import { RootState } from '@/app/store/store';
import SignUp from './Auth/SignUp';

const OverlaySign = () => {
  const dispatch = useDispatch();
  const isVisible = useSelector((state: RootState) => state.overlay.signIsVisible);

  const handleClose = () => {
    dispatch(hideSignOverlay());
  };

//   let content;

  return (
    <Modal isOpen={isVisible} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
         <SignUp/>
          <ModalCloseButton />
        </ModalHeader>
      </ModalContent>
    </Modal>
  );
};

export default OverlaySign;
