const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup-profile');
const formEditProfile = popupProfile.querySelector('.popup__form-profile');
const nameInput = popupProfile.querySelector('.popup__input_el_name');
const jobInput = popupProfile.querySelector('.popup__input_el_about-me');

const profileName = document.querySelector('.profile__info-name');
const profileJob =  document.querySelector('.profile__info-job');

function openPopup (popup) {
   popup.classList.add('popup_opened');

   const formSelector = popup.querySelector(parameters.formSelector)
   if(formSelector){
     const inputList = Array.from(formSelector.querySelectorAll(parameters.inputSelector));
     const submitButtonSelector = formSelector.querySelector(parameters.submitButtonSelector);
     toggleButtonState(inputList, submitButtonSelector, parameters);
    }
    document.addEventListener('keydown', closeByEscape)
};

function closePopup (popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape)

    const formSelector = popup.querySelector(parameters.formSelector)
    if(formSelector){
      const inputList = Array.from(formSelector.querySelectorAll(parameters.inputSelector));
     inputList.forEach((inputElement) => {
      hideInputError(formSelector, inputElement, parameters);
      });
    }
};

function closeByEscape (evt) {
  if( evt.key === "Escape" ){ 
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

function openPopupProfile () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile);
}

function closePopupProfile () {
  closePopup(popupProfile);
}

profileOpenPopupButton.addEventListener('click', openPopupProfile);

function editProfile (evt) {
    evt.preventDefault ();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopupProfile();
};

formEditProfile.addEventListener('submit', editProfile);

const cardOpenPopupButton = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup-card');
const formAddCard = popupCard.querySelector('.popup__form-card');

const template = document.querySelector('.elements_template').content;
const cardContainer = document.querySelector('.elements');
const cardImage = template.querySelector('.elements__image');

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
formAddCard.addEventListener('submit', savePopupCard);

  function renderCards () {
    initialCards.forEach(renderCard);
  }

  function renderCard (x) {
    const card = createCard(x);
    addListeners(card);
    cardContainer.prepend(card);
  }

  function createCard(cardInput) {
    const card = template.cloneNode(true);
    card.querySelector('.elements__image').src = cardInput.link;
    card.querySelector('.elements__name').textContent = cardInput.name;
    card.querySelector('.elements__image').alt = cardInput.name;
    return card;
   }

  function addListeners(el) {
    el.querySelector('.elements__del').addEventListener('click', handleDelete);
    el.querySelector('.elements__button').addEventListener('click', handleLike);
    el.querySelector('.elements__image').addEventListener('click', openPopupImage);
  }

function handleDelete(evt) {
  evt.target.closest('.elements__card').remove();
}

function handleLike(evt) {
  evt.target.classList.toggle('elements__button_active');
}

const popupImage = document.querySelector('.popup-image');
const popupFormCard = popupImage.querySelector('.popup__form-card');
const popupImageCard = popupImage.querySelector('.popup__image-card');
const popupImageText = popupImage.querySelector('.popup__caption');

function openPopupImage (event) {
  openPopup(popupImage);
  popupImageCard.src = event.target.src;
  popupImageCard.alt = event.target.alt;
  popupImageText.textContent = event.target.alt;
}

function closePopupImage () {
  closePopup(popupImage);
}

cardImage.addEventListener('click', openPopupImage);

function addCard() {
  const newCard = {
    name: popupCard.querySelector('.popup__input_card-name').value,
    link: popupCard.querySelector('.popup__input_card-image').value
  };
  renderCard(newCard);
  closePopupCard();
  popupCard.querySelector('.popup__input_card-name').value = '';
  popupCard.querySelector('.popup__input_card-image').value = '';
}

renderCards();

function closePopupOverlay () {
  popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popupElement) => {

  popupElement.addEventListener("click", function (evt) {
      const popup = evt.target.classList.contains('popup');
      const popupCloseButton = evt.target.classList.contains('popup__close-button');
      if(popup || popupCloseButton) closePopup(popupElement);
      });
  })
}

closePopupOverlay();