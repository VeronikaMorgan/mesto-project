import {closeModal} from "./utils";

export function handleEscPressed (evt) {
  if (evt.keyCode === 27) {
      const currentModal = document.querySelector('.modal_opened');
      closeModal(currentModal);
  }
}

export function handleOverlayClick(evt) {
  const currentModal = document.querySelector('.modal_opened');
  if(!evt.target.closest('.modal__container')) {
    closeModal(currentModal);
  }
}
