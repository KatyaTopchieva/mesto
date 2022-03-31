import './index.css';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards } from '../components/cards.js';
import { Card } from '../components/Card.js';
import { parameters } from '../components/consts.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup-profile');
const nameInput = popupProfile.querySelector('.popup__input_el_name');
const jobInput = popupProfile.querySelector('.popup__input_el_about-me');

const cardOpenPopupButton = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup-card');

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

  const data = userInfo.getUserInfo()
  nameInput.value = data.name;
  jobInput.value = data.job;
  editProfilePopup.open();
};

profileOpenPopupButton.addEventListener('click', openPopupProfile);

const editProfile = (data) => {
  const { name, aboutme } = data;
  userInfo.setUserInfo(name, aboutme);

  editProfilePopup.close();
};

function openPopupCard () {
  formAddCard.reset();
  const name = formAddCard.getAttribute('name');
  formValidators[ name ].resetErrorsForm();
  addCardPopup.open();
};

cardOpenPopupButton.addEventListener('click', () => {
  openPopupCard();
});

const addCard = (data) => {
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

const userInfo = new UserInfo({ profileNameSelector: '.profile__info-name', profileJobSelector: '.profile__info-job'});