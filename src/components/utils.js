import {handleEscPressed} from "./modal";
import { handleOverlayClick } from "./modal";

export function openModal(modal) {
  modal.classList.add('modal_opened');
  document.addEventListener('keydown', handleEscPressed);
  modal.addEventListener('mousedown', handleOverlayClick);
}

export function closeModal(modal) {
  modal.classList.remove('modal_opened');
  document.removeEventListener('keydown', handleEscPressed);
  modal.removeEventListener('mousedown', handleOverlayClick);
}

