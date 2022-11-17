import {openModal, closeModal } from "./utils";
import {cardList, cardElement, imageModal, imageLink, 
        imageCaption, addCardModal, cardNameInput, cardLinkInput, userId, renderLoading} from '../index';
import { postNewCard, deleteApiCard, handleError, setLike, removeLike} from "./api";

export function createCard(newCard) {
  const card = cardElement.cloneNode(true);
  const btnDelete = card.querySelector('.card__delete-btn');
  const cardLike = card.querySelector('.card__like');
  const allLikes = newCard.likes;
  const likesCounter = card.querySelector('.card__like-counter');
  const cardCover = card.querySelector('.card__cover');
  card.querySelector('.card__title').textContent = newCard.name;
  cardCover.src = newCard.link;
  card.querySelector('.card__cover').alt = newCard.name;
  
  card.id = newCard._id;
  const cardId = card.id;
  
  //check card owner
  if(newCard.owner._id !== userId) {
    btnDelete.remove()
  }
  
  //show likes on loading
  if(allLikes.length > 0){
    likesCounter.textContent = allLikes.length;
  }

  if(checkLikes(allLikes, userId)) {
    cardLike.classList.add('card__like_active')
  }

  //toggle likes
  cardLike.addEventListener('click', () => {
    if(cardLike.classList.contains('card__like_active')) {
      handleDislike(cardLike, cardId, likesCounter)
      return;
    }
    handleLike(cardLike, cardId, likesCounter)
  })

  deleteCard(card, btnDelete);
  openCardPopup(newCard.name, newCard.link, cardCover);
  return card
}

export function prependCard(newCard) {
  const card = createCard(newCard);
  cardList.prepend(card);
}

function openCardPopup(name, link, cover) {
  cover.addEventListener('click', () => {
  imageCaption.textContent = name;
  imageLink.src = link;
  imageLink.alt = name;
  openModal(imageModal);
})
}

export function addNewCard(evt) {
  evt.preventDefault();
  const btn = evt.submitter;
  renderLoading(true, btn)
  postNewCard(cardNameInput.value, cardLinkInput.value)
    .then(newCard => {
      prependCard(newCard);
      evt.target.reset();
      closeModal(addCardModal);
    })
    .catch(() => {
     handleError();
     evt.submitter.classList.add(validationData.disabledBtnClass);
    })
    .finally(() => {
      renderLoading(false, btn)
  })
}

function deleteCard(card, btn) {
  btn.addEventListener('click', () => {
    deleteApiCard(card.id)
    .then(() => {
      // card.classList.add('card_animated');
      card.closest('.card').remove();
      // setTimeout(() => {
      //   card.closest('.card').remove();
      // }, 2000)
    })
    .catch(handleError)
})
}

function checkLikes(likesList ,userId) {
  return likesList.find(userLike => userLike._id === userId);
}

function handleLike (cardLike, cardId, likeCounter) {
  return setLike(cardId)
  .then(res => {
    likeCounter.textContent = res.likes.length;
    cardLike.classList.add('card__like_active')
  })
  .catch(handleError)
}

function handleDislike (cardLike, cardId, likeCounter) {
  return removeLike(cardId)
  .then(res => {
    if(res.likes.length === 0) {
      likeCounter.textContent = "";
    } else {
      likeCounter.textContent = res.likes.length;
    }
    cardLike.classList.remove('card__like_active')
  })
  .catch(handleError)
}