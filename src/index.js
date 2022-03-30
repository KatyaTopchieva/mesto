import './styles/index.css';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './cards.js';
import { Card } from './Card.js';
import { parameters } from './consts.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { openPopup, closePopup } from './Utils.js';
import { PopupWithForm } from './PopupWithForm.js';
import { data } from 'autoprefixer';


const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup-profile');
const nameInput = popupProfile.querySelector('.popup__input_el_name');
const jobInput = popupProfile.querySelector('.popup__input_el_about-me');

const profileName = document.querySelector('.profile__info-name');
const profileJob =  document.querySelector('.profile__info-job');

const cardOpenPopupButton = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup-card');
//const inputCardName = popupCard.querySelector('.popup__input_card-name');
//const inputCardImage = popupCard.querySelector('.popup__input_card-image');

const formEditProfile = popupProfile.querySelector('.popup__form-profile');
const formAddCard = popupCard.querySelector('.popup__form-card');
const cardContainer = document.querySelector('.elements');

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

enableValidation(parameters);

function openPopupProfile () {
  const name = formEditProfile.getAttribute('name');
  formValidators[ name ].resetErrorsForm();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile);
};

//function closePopupProfile () {
//   closePopup(popupProfile);
//};

profileOpenPopupButton.addEventListener('click', openPopupProfile);

function editProfile (data) {
  const { name, description } = data;
  profileName.textContent = name;
  profileJob.textContent = description;

  editProfilePopup.close();
};

formEditProfile.addEventListener('submit', editProfile);


function openPopupCard () {
  formAddCard.reset();
  const name = formAddCard.getAttribute('name');
  formValidators[ name ].resetErrorsForm();
  openPopup(popupCard);
};

cardOpenPopupButton.addEventListener('click', () => {
  openPopupCard();
});

const addCard = (data) => {
  console.log('data', data)
  const card = createCard({
    name: data['card-name'],
    link: data.link
  });
  
  section.addItem(card);
  addCardPopup.close();
};

function createCard(data) {
  const card = new Card(data, '.elements_template', () => {
    imagePopup.open(data.name, data.link);
  })
  const cardElement = card.getCardElement();

  return(cardElement);
}

function renderCard(data){
  const card = createCard(data);
  cardContainer.prepend(card);
};

const section = new Section( { items: initialCards, renderer: renderCard }, '.elements');
const imagePopup = new PopupWithImage('.popup-image');
const addCardPopup = new PopupWithForm('.popup-card', addCard);
const editProfilePopup = new PopupWithForm('.popup-profile', editProfile);

imagePopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();

section.renderItems();