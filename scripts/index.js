import {FormValidator} from './FormValidator.js';
import {initialCards} from './cards.js';
import {Card} from './Card.js';

const parameters = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  inactiveButtonClass: 'popup__button_disabled',
  errorClass: 'popup__error_visible',
  fieldsetSelector: '.popup__fieldset'
 };

const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup-profile');
const nameInput = popupProfile.querySelector('.popup__input_el_name');
const jobInput = popupProfile.querySelector('.popup__input_el_about-me');

const profileName = document.querySelector('.profile__info-name');
const profileJob =  document.querySelector('.profile__info-job');

const cardOpenPopupButton = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup-card');

const formEditProfile = popupProfile.querySelector('.popup__form-profile');
const formAddCard = popupCard.querySelector('.popup__form-card');

const cardContainer = document.querySelector('.elements');

const addCardValidator = new FormValidator(parameters, formAddCard);
addCardValidator.enableValidation();

const editProfileValidator = new FormValidator(parameters, formEditProfile);
editProfileValidator.enableValidation();



export function openPopup (popup, parameters) {
  popup.classList.add('popup_opened');

  if(parameters){
    const formSelector = popup.querySelector(parameters.formSelector)
    if(formSelector){
      const inputList = Array.from(formSelector.querySelectorAll(parameters.inputSelector));
      const submitButtonSelector = formSelector.querySelector(parameters.submitButtonSelector);
      addCardValidator.toggleButtonState(inputList, submitButtonSelector, parameters);
      editProfileValidator.toggleButtonState(inputList, submitButtonSelector, parameters);
     }     
  }
   document.addEventListener('keydown', closeByEscape)
};

function closePopup (popup, parameters) {
   popup.classList.remove('popup_opened');
   document.removeEventListener('keydown', closeByEscape);
   if(parameters){
    const formSelector = popup.querySelector(parameters.formSelector);
    if(formSelector){
      const inputList = Array.from(formSelector.querySelectorAll(parameters.inputSelector));
      inputList.forEach((inputElement) => {
        editProfileValidator.hideInputError(formSelector, inputElement, parameters);
        addCardValidator.hideInputError(formSelector, inputElement, parameters);
      });
     }
   }
   addCardValidator.resetErrorsForm();
   editProfileValidator.resetErrorsForm();
};

export function closeByEscape (evt) {
  if( evt.key === "Escape" ){ 
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

function closePopupOverlay () {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popupElement) => {

  popupElement.addEventListener("click", function (evt) {
      const popup = evt.target.classList.contains('popup');
      const popupCloseButton = evt.target.classList.contains('popup__close-button');
      if(popup || popupCloseButton) closePopup(popupElement);
      });
  })
};

closePopupOverlay();



function openPopupProfile () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile, parameters);
}

function closePopupProfile () {
   closePopup(popupProfile, parameters);
   editProfileValidator.resetErrorsForm();
}

profileOpenPopupButton.addEventListener('click', openPopupProfile);

function editProfile (evt) {
    evt.preventDefault ();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopupProfile();
};

formEditProfile.addEventListener('submit', editProfile);

function openPopupCard () {
  formAddCard.reset();
  openPopup(popupCard, parameters);
}

function closePopupCard () {
  closePopup(popupCard, parameters);
  addCardValidator.resetErrorsForm();
};

function savePopupCard (evt) {
  evt.preventDefault ();
  addCard(evt);
}

cardOpenPopupButton.addEventListener('click', openPopupCard);
formAddCard.addEventListener('submit', savePopupCard);


function renderCard (data)  {
  const card = new Card(data, '.elements_template')
  const cardElement = card.getCardElement();
  cardContainer.prepend(cardElement);
}

initialCards.forEach(renderCard);

function addCard() {
  const newCard = {
    name: popupCard.querySelector('.popup__input_card-name').value,
    link: popupCard.querySelector('.popup__input_card-image').value
  };
  renderCard(newCard);
  closePopupCard();
}



