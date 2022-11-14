import {closeModal} from "./utils";

export function handleEscPressed (evt) {
  if (evt.key === 'Escape') {
      const currentModal = document.querySelector('.modal_opened');
      closeModal(currentModal);
  }
}

export function handleOverlayClick(evt) {
  // const currentModal = document.querySelector('.modal_opened');
  if(!evt.target.closest('.modal__container')) {
    closeModal(evt.target);
  }
}
