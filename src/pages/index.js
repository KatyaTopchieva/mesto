import './index.css';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { parameters } from '../utils/consts.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { api } from '../components/Api.js';

let userId;
const userInfo = new UserInfo(
  { 
    profileNameSelector: '.profile__info-name', 
    profileJobSelector: '.profile__info-job',
    profileAvatarSelector: '.profile__avatar'
  });

  const confirnPopup = new PopupWithForm('.popup-delete-confirn');
  const editAvatarPopup = new PopupWithForm('.popup-edit-avatar', editAvatar);

api.getProfile()
  .then(res => {
    console.log(res);
    userInfo.setUserInfo(res.name, res.about, res.avatar);

    userId = res._id;
  })
  .catch(console.log)

api.getCard()
  .then(cardList => {
    cardList.forEach(data => {
      const card = createCard({
        name: data.name,
        link: data.link,
        likes: data.likes,
        id: data._id,
        userId: userId,
        ownerId: data.owner._id
      });    

      section.addItem(card)
    })
  })
  .catch(console.log)

  const editAvatar = (data) => {

    api.editAvatar(data.linkAvatar)
      .then(res => {
        console.log(res);
        userInfo.setUserInfo(res.name, res.about, res.avatar);
        editAvatarPopup.close();
      })
      .catch(console.log)
  }

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

const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup-profile');
const nameInput = popupProfile.querySelector('.popup__input_el_name');
const jobInput = popupProfile.querySelector('.popup__input_el_about-me');

const cardOpenPopupButton = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup-card');

const formEditProfile = popupProfile.querySelector('.popup__form-profile');
const formAddCard = popupCard.querySelector('.popup__form-card');

const formEditAvatar = document.querySelector('.popup__form-edit-avatar');
const editAvatarButton = document.querySelector('.profile__avatar-button');
const avatarInput = document.querySelector('.popup__input-edit-avatar');

function openPopupEditAvatar () {
  const name = formEditAvatar.getAttribute('name');
  formValidators[ name ].resetErrorsForm();

  const data = userInfo.getUserInfo();
  avatarInput.src = data.src;
  editAvatarPopup.open();
  editAvatarPopup.changeSubmitAvatarHandler(
    (data) => {

      const avatarBtnSeving = formEditAvatar.querySelector('.popup__button_condition_saving');
      avatarBtnSeving.style.visibility = 'visible';
      
      api.editAvatar(data.linkAvatar)
        .then(res => {
          console.log(res);
          userInfo.setUserInfo(res.name, res.about, res.avatar);
          avatarBtnSeving.style.visibility = 'hidden';
          editAvatarPopup.close();
        
        })
        .catch(console.log)
    }
  )
}

editAvatarButton.addEventListener('click', openPopupEditAvatar);

function openPopupProfile () {
  const name = formEditProfile.getAttribute('name');
  formValidators[ name ].resetErrorsForm();

  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.job;
  editProfilePopup.open();
};

profileOpenPopupButton.addEventListener('click', openPopupProfile);

const editProfile = (data) => {
  const { name, aboutme, avatar } = data;
  api.editProfile(name, aboutme)
    .then(res => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
      editProfilePopup.close();
    })
    .catch(console.log)

  editProfilePopup.close();
};

function openPopupCard () {
  const name = formAddCard.getAttribute('name');
  formValidators[ name ].resetErrorsForm();
  addCardPopup.open();
};

cardOpenPopupButton.addEventListener('click', () => {
  openPopupCard();
});

const addCard = (data) => {
  api.addCard(data['card-name'], data.link)
    .then(res => {
      const card = createCard({
        name: res.name,
        link: res.link,
        likes: res.likes,
        id: res._id,
        userId: userId,
        ownerId: res.owner._id
      })
      section.addItem(card);
      addCardPopup.close();
    })
    .catch(console.log)
};

function createCard(data) {
  const card = new Card(
    data,
    '.elements_template',
    () => {
    imagePopup.open(data.name, data.link);
    },
    (id) => {
      confirnPopup.open();
      confirnPopup.changeSubmitHandler(() => {
        api.deleteCard(id)
          .then(res => {
            card.deleteCard();
            confirnPopup.close();
          })
      })
    },
    (id) => {
      if(card.isLiked()) {
        api.deleteLike(id)
        .then(res => {
          card.setLikes(res.likes);
        })
      } else {
        api.addLike(id)
        .then(res => {
          card.setLikes(res.likes);
        })
        .catch(console.log)
      }
    }
  )
  const cardElement = card.getCardElement();
  return(cardElement);
}

function renderCard(data){
  const card = createCard(data);
  section.addItem(card);
};

const section = new Section( { items: [], renderer: renderCard }, '.elements');
const imagePopup = new PopupWithImage('.popup-image');
const addCardPopup = new PopupWithForm('.popup-card', addCard);
const editProfilePopup = new PopupWithForm('.popup-profile', editProfile);

imagePopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
confirnPopup.setEventListeners();
editAvatarPopup.setEventListeners();

section.renderItems();