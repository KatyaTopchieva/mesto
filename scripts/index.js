const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup-profile');
const popupCloseButton = popupProfile.querySelector('.popup__close-button');
const formEditProfile = popupProfile.querySelector('.popup__form-profile');
const nameInput = popupProfile.querySelector('.popup__edit_el_name');
const jobInput = popupProfile.querySelector('.popup__edit_el_about-me');

const profileName = document.querySelector('.profile__info-name');
const profileJob =  document.querySelector('.profile__info-job');

function openPopup (popup) {
   popup.classList.add('popup_opened');
};

function closePopup (popup) {
    popup.classList.remove('popup_opened');
};

function openPopupProfile () {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopupProfile () {
  closePopup(popupProfile);
}

profileOpenPopupButton.addEventListener('click', openPopupProfile);
popupCloseButton.addEventListener('click', closePopupProfile);

function fillEditForm (evt) {
    evt.preventDefault ();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopupProfile();
};

formEditProfile.addEventListener('submit', fillEditForm);

const cardOpenPopupButton = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup-card');
const cardClosePopupButton = popupCard.querySelector('.button-close-add-card');
const formAddCard = popupCard.querySelector('.popup__form-card');
const popupSaveDutton = popupCard.querySelector('.button-save-add-card');

const template = document.querySelector('.elements_template').content;
const cardContainer = document.querySelector('.elements');
const cardName = template.querySelector('.elements__name');
const cardImage = template.querySelector('.elements__image');
const buttonSaveCard = document.querySelector('.button-save-add-card');

function openPopupCard () {
    openPopup(popupCard);
}

function closePopupCard () {
    closePopup(popupCard);
};

function savePopupCard (evt) {
  evt.preventDefault ();
  addCard(evt);
}

cardOpenPopupButton.addEventListener('click', openPopupCard);
cardClosePopupButton.addEventListener('click', closePopupCard);
formAddCard.addEventListener('submit', savePopupCard);

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
 
  function render () {
    initialCards.forEach(createCard);
  }

  function createCard(cardInput) {
    const card = template.cloneNode(true);
    card.querySelector('.elements__image').src = cardInput.link;
    card.querySelector('.elements__name').textContent = cardInput.name;
    card.querySelector('.elements__image').alt = cardInput.name;

    addListeners(card);// добавили функцию удаления карточки и лайк
    card.querySelector('.elements__image').addEventListener('click', openPopupImage);

    cardContainer.prepend(card);// добавить карточку в контейнер
  }

  function addListeners(el) {
    el.querySelector('.elements__del').addEventListener('click', handleDelete);
    el.querySelector('.elements__button').addEventListener('click', handleLike);
  } //повесили на кнопки слушателя события

function handleDelete(evt) {
  evt.target.closest('.elements__card').remove(); //удаляем карточку
}

function handleLike(evt) {
  evt.target.classList.toggle('elements__button_active');
}

const popupImage = document.querySelector('.popup-image');
const popupFormCard = popupImage.querySelector('.popup__form-card');
const popupImageCard = popupImage.querySelector('.popup__image-card');
const popupImageText = popupImage.querySelector('.popup__caption');
const buttonCloseImageCard = popupImage.querySelector('.button-close-image');

function openPopupImage (event) {
  openPopup(popupImage);
  popupImage.classList.add('popup_theme-dark');
  popupImageCard.src = event.target.src;
  popupImageText.textContent = event.target.alt;
}

function closePopupImage () {
  closePopup(popupImage);
}

cardImage.addEventListener('click', openPopupImage);
buttonCloseImageCard.addEventListener('click', closePopupImage);

function addCard(event) {

  const newCard = {
    name: popupCard.querySelector('.popup__edite_card-name').value,
    link: popupCard.querySelector('.popup__edite_card-image').value
  };

  createCard(newCard);
  closePopupCard();
}

render();