import {openModal, closeModal } from "./utils";
import {cardList, cardElement, imageModal, imageLink, 
        imageCaption, addCardModal, cardNameInput, cardLinkInput} from '../index';

export function createCard(name, link) {
  const card = cardElement.cloneNode(true);
  card.querySelector('.card__title').textContent = name;
  card.querySelector('.card__cover').src = link;
  card.querySelector('.card__cover').alt = name;
  openCardPopup(name, link, card);
  deleteCard(card);
  toggleLike(card);
  return card
}

export function prependCard(name, link) {
  const card = createCard(name, link);
  cardList.prepend(card);
}

function openCardPopup(name, link, card) {
  card.querySelector('.card__cover').addEventListener('click', () => {
  imageCaption.textContent = name;
  imageLink.src = link;
  imageLink.alt = name;
  openModal(imageModal);
})
}

export function addNewCard(evt) {
  evt.preventDefault();
  prependCard(cardNameInput.value, cardLinkInput.value);
  closeModal(addCardModal);
  evt.target.reset();
}

function deleteCard(card) {
  card.querySelector('.card__delete-btn').addEventListener('click', () => {
    card.closest('.card').remove();
})
}

function toggleLike(card) {
  card.querySelector('.card__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like_active');
  })
}