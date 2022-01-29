const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close-button');

let formElement = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('.popup__edit_el_name');

let jobInput = popup.querySelector('.popup__edit_el_about-me');

let profileName = document.querySelector('.profile__info-name');
let profileJob =  document.querySelector('.profile__info-job');

let nameInputValue = profileName.textContent;
let jobInputValue = profileJob.textContent;

function openPopup () {
    popup.classList.add('popup_opened');
    nameInput.value = nameInputValue;
    jobInput.value = jobInputValue;
};

function closePopup () {
    popup.classList.remove('popup_opened');
};

profileOpenPopupButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

function fillEditForm (evt) {
    evt.preventDefault ();
  
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
};

formElement.addEventListener('submit', fillEditForm);

// let buttonLikes = document.querySelectorAll('.elements__button');
// let like = document.getElementById('');

// function putLike (evt) {
//   evt.preventDefault ();
//    evt.target.classList.toggle('elements__button_active');    
// };

// buttonLikes.forEach(
//        function(element) {
//        element.addEventListener('click', putLike);
//    });