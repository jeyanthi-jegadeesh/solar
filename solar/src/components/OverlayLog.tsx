'use client'
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { hideLogInOverlay } from '@/app/store/overlaySlice';
import { RootState } from '@/app/store/store';
import LogIn from './Auth/LogIn';

const OverlayLog = () => {
  const dispatch = useDispatch();
  const isVisible = useSelector((state: RootState) => state.overlay.logInIsVisible);

  const handleClose = () => {
    dispatch(hideLogInOverlay());
  };

//   let content;

  return (
    <Modal isOpen={isVisible} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
         <LogIn/>
          <ModalCloseButton />
        </ModalHeader>
      </ModalContent>
    </Modal>
  );
};

export default OverlayLog;
