import {closeModal} from "./utils";

export function handleEscPressed (evt) {
  if (evt.key === 'Escape') {
      const currentModal = document.querySelector('.modal_opened');
      closeModal(currentModal);
  }
}

export function handleOverlayClick(evt) {
  if(!evt.target.closest('.modal__container')) {
    closeModal(evt.target);
  }
}
