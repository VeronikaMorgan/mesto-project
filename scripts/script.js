const editFormBtn   = document.querySelector('.profile__button_type_edit');
const editPopup     = document.querySelector('#profile-edit');
const editForm      = document.querySelector('.profile-popup__form');
const nameInput     = document.querySelector('.profile-popup__input-text_type_name');
const jobInput      = document.querySelector('.profile-popup__input-text_type_job');
const popupCloseBtns = document.querySelectorAll('.popup__close-btn');
const addCardBtn    = document.querySelector('.profile__button_type_add');
const addCardPopup  = document.querySelector('#card-add');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 


function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

editFormBtn.addEventListener('click', () => openPopup(editPopup));
addCardBtn.addEventListener('click', () => openPopup(addCardPopup));


function closePopupOnBtn (arr) {
  if (arr.length > 0) {
    for(let i = 0;i < arr.length;i++) {
      const currentEl = arr[i];
      currentEl.addEventListener('click', () => closePopup(currentEl.closest('.popup')));
    }
  }
}
closePopupOnBtn(popupCloseBtns);

const userName = document.querySelector('.profile__name');
const userJob  = document.querySelector('.profile__descr');

function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(editPopup);
}

editForm.addEventListener('submit', formSubmitHandler);

const cardsWrap    = document.querySelector('.cards__wrapper');
const cardTemplate = document.querySelector('#card-template').content;
const cardElement  = cardTemplate.querySelector('.card');


function renderCards(cards) {
  for(let i = 0; i < cards.length; i++) {
    const el = cardElement.cloneNode(true);
    el.querySelector('.card__title').textContent = cards[i].name;
    el.querySelector('.card__cover').src = cards[i].link;
    cardsWrap.append(el);
  }
}
renderCards(initialCards);

const addCardForm   = document.querySelector('.galary-popup__form');
const cardNameInput = document.querySelector('.galary-popup__input-text_type_name');
const cardLinkInput = document.querySelector('.galary-popup__input-text_type_link');

function addCard(evt) {
  evt.preventDefault();
  const el = cardElement.cloneNode(true);
  el.querySelector('.card__title').textContent = cardNameInput.value;
  el.querySelector('.card__cover').src = cardLinkInput.value;
  cardsWrap.prepend(el);
  closePopup(addCardPopup);
}

addCardForm.addEventListener('submit', addCard);

const cardDeletebtn = document.querySelectorAll('.card__delete-btn');
const likeBtn      = document.querySelectorAll('.card__like');

function deleteCard(arr) {
  for(let i = 0; i < arr.length; i++) {
      const currentBtn = arr[i];
      currentBtn.addEventListener('click', function() {
      currentBtn.closest('.card').remove();
    })
  }
}

deleteCard(cardDeletebtn);
console.log(cardDeletebtn.length)
console.log(likeBtn.length)
function like(arr) {
  for(let i = 0; i < arr.length; i++) {
      const currentBtn = arr[i];
      currentBtn.addEventListener('click', function() {
        currentBtn.classList.toggle('card__like_active');
    })
  }
}

like(likeBtn)