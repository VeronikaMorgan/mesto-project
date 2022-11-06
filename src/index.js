import './pages/index.css';
import { validationData, initialCards } from "./components/data";
import { openModal, closeModal} from "./components/utils";
import { addNewCard, prependCard } from "./components/card";
import { enableValidation, resetErrors } from './components/validate';

// profile info
const userName = document.querySelector('.profile__name');
const userJob  = document.querySelector('.profile__descr');

// edit-profile modal
const editProfileModal  = document.querySelector('#editProfileModal');
const profileForm = document.forms['profileForm'];
const editProfileBtn   = document.querySelector('.profile__button_type_edit');
const nameInput     = document.querySelector('#profileInputName');
const jobInput      = document.querySelector('#profileInputJob');

// add-card modal
const addCardBtn    = document.querySelector('.profile__button_type_add');
export const addCardModal  = document.querySelector('#addCardModal');
const cardForm = document.forms['cardForm'];
export const cardNameInput = document.querySelector('#cardInputName');
export const cardLinkInput = document.querySelector('#cardInputLink');

// card template
export const cardList    = document.querySelector('.cards__wrapper');
export const cardTemplate = document.querySelector('#card-template').content;
export const cardElement  = cardTemplate.querySelector('.card').cloneNode(true);

// image modal
export const imageModal = document.querySelector('#imgModal');
export const imageLink = document.querySelector('.img-modal__img');
export const imageCaption = document.querySelector('.img-modal__figcaption');

export const modalCloseBtns = document.querySelectorAll('.modal__close-btn');


modalCloseBtns.forEach( btn => {
  btn.addEventListener('click', () => {
    const currentModal = btn.closest('.modal');
    closeModal(currentModal);
  });
})

editProfileBtn.addEventListener('click', () => {
  const form = editProfileModal.querySelector('.modal__form')
  resetErrors(form, validationData);
  openModal(editProfileModal);
  editFormDefault();
});

// rendering of default cards
initialCards.forEach(item => {
  prependCard(item.name, item.link);
})

addCardBtn.addEventListener('click', () => {
  const form = addCardModal.querySelector('.modal__form')
  resetErrors(form, validationData);
  openModal(addCardModal)
});

profileForm.addEventListener('submit', editProfile);
cardForm.addEventListener('submit', addNewCard);

function editProfile(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closeModal(editProfileModal);
  evt.target.reset();
};

// info synch for profile data
function editFormDefault() {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

// start validation
enableValidation(validationData);
