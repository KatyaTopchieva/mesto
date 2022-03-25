//import logo from '../images/logo.svg';
//import kustou from '../images/kustou.png';
//export const images = { logo, kustou };


import '../styles/index.css';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './cards.js';
import { Card } from './Card.js';
import { parameters } from './consts.js';

const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup-profile');
const nameInput = popupProfile.querySelector('.popup__input_el_name');
const jobInput = popupProfile.querySelector('.popup__input_el_about-me');

const profileName = document.querySelector('.profile__info-name');
const profileJob =  document.querySelector('.profile__info-job');

const cardOpenPopupButton = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup-card');
const inputCardName = popupCard.querySelector('.popup__input_card-name');
const inputCardImage = popupCard.querySelector('.popup__input_card-image');

const formEditProfile = popupProfile.querySelector('.popup__form-profile');
const formAddCard = popupCard.querySelector('.popup__form-card');
const cardContainer = document.querySelector('.elements');

const popupImage = document.querySelector('.popup-image');
const popupImageCard = popupImage.querySelector('.popup__image-card');
const popupImageText = popupImage.querySelector('.popup__caption');

function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape)
};

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
};

const formValidators = {};

// Включение валидации
const enableValidation = (parameters) => {
  const formList = Array.from(document.querySelectorAll(parameters.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, parameters);
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name');
   // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

function openPopupProfile () {
  const name = formEditProfile.getAttribute('name');
  formValidators[ name ].resetErrorsForm();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile);
};

function closePopupProfile () {
   closePopup(popupProfile);
};

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
  const name = formAddCard.getAttribute('name');
  formValidators[ name ].resetErrorsForm();
  openPopup(popupCard);
};

function closePopupCard () {
  closePopup(popupCard);
};

enableValidation(parameters);

function savePopupCard (evt) {
  evt.preventDefault ();
  addCard(evt);
};

cardOpenPopupButton.addEventListener('click', () => {
  openPopupCard();
});

formAddCard.addEventListener('submit', savePopupCard);

function renderCard (data)  {
  const card = new Card(data, '.elements_template', handleCardClick)
  const cardElement = card.getCardElement();
  cardContainer.prepend(cardElement);
};

initialCards.forEach(renderCard);

function addCard() {
  const newCard = {
    name: inputCardName.value,
    link: inputCardImage.value
  };
  renderCard(newCard);
  closePopupCard();
};

function handleCardClick(name, link) {
  popupImageCard.src = link;
  popupImageCard.alt = name;
  popupImageText.textContent = name;
  openPopup(popupImage);
};

export function closeByEscape (evt) {
  if( evt.key === "Escape" ){ 
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

function handlePopupClose () {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popupElement) => {

  popupElement.addEventListener('mousedown', function (evt) {
    const popup = evt.target.classList.contains('popup');
    const popupCloseButton = evt.target.classList.contains('popup__close-button');
    if(popup || popupCloseButton) closePopup(popupElement);
    });
  });
};

handlePopupClose();