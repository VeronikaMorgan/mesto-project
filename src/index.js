import './pages/index.css';
import { validationData} from "./components/data";
import { openModal, closeModal} from "./components/utils";
import { addNewCard, prependCard } from "./components/card";
import { enableValidation, resetErrors } from './components/validate';
import { getInitialCards, updateProfileData, getProfileData, updateProfileAvatar, handleError} from './components/api';
// profile info
const userName = document.querySelector('.profile__name');
const userJob  = document.querySelector('.profile__descr');
const avatarImg = document.querySelector('.profile__avatar');

// edit-profile modal
const editProfileModal  = document.querySelector('#editProfileModal');
const profileForm = document.forms['profileForm'];
const editProfileBtn   = document.querySelector('.profile__button_type_edit');
const nameInput     = document.querySelector('#profileInputName');
const jobInput      = document.querySelector('#profileInputJob');

// avatar-modal

const avatarModal = document.querySelector('#editAvatarModal');
const avatarEditForm = document.forms['avatarForm'];
const avatarInputLink = document.querySelector('#avatarInputLink');
const avatarEditBtn = document.querySelector('.profile__avatar-button');

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

export  let userId;

modalCloseBtns.forEach( btn => {
  btn.addEventListener('click', () => {
    const currentModal = btn.closest('.modal');
    closeModal(currentModal);
  });
})

editProfileBtn.addEventListener('click', () => {
  resetErrors(profileForm, validationData);
  openModal(editProfileModal);
  editFormDefault();
});

avatarEditBtn.addEventListener('click', () => {
  resetErrors(avatarEditForm, validationData);
  openModal(avatarModal);
})

addCardBtn.addEventListener('click', () => {
  resetErrors(cardForm, validationData);
  openModal(addCardModal)
});

profileForm.addEventListener('submit', editProfile);
cardForm.addEventListener('submit', addNewCard);
avatarEditForm.addEventListener('submit', editAvatar)

function editProfile(evt) {
  evt.preventDefault();
  const btn = evt.submitter;
  renderLoading(true, btn)
    updateProfileData(nameInput.value, jobInput.value)
    .then(newData => {
      userName.textContent = newData.name;
      userJob.textContent = newData.about;
      evt.target.reset();
      closeModal(editProfileModal)
    })
    .catch(handleError)
    .finally(() => {
      renderLoading(false, btn);
  })
};

// info synch for profile data
function editFormDefault() {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

function editAvatar(evt) {
  evt.preventDefault();
  const btn = evt.submitter;
  renderLoading(true, btn)
  updateProfileAvatar(avatarInputLink.value)
  .then(newData => {
    avatarImg.src = newData.avatar;
    evt.target.reset();
    closeModal(avatarModal);
  })
  .catch(handleError)
  .finally(() => {
    renderLoading(false, btn)
  })
}

export function insertProfileData(obj) {
  userName.textContent = obj.name;
  userJob.textContent = obj.about;
  avatarImg.src = obj.avatar;
}

//get all initial data
Promise.all([getInitialCards(), getProfileData()])
.then(([cards, profileData]) => {
  insertProfileData(profileData);
  userId = profileData._id;
  const cardList = Array.from(cards).reverse();
  console.log(cardList)
  cardList.forEach(prependCard)
 })
.catch(handleError)

export function renderLoading(isLoading, btn) {
  if(isLoading) {
    btn.textContent = 'Сохранение...';
    btn.setAttribute('disabled', '');
    return;
  }
    btn.textContent = 'Сохранить';
    btn.removeAttribute('disabled', '');
}

// start validation
enableValidation(validationData);