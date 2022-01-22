const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');

function openPopup () {
    popup.classList.add('popup_opened');
};

function closePopup () {
    popup.classList.remove('popup_opened');
};

profileOpenPopupButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__edit_el_name');
let jobInput = document.querySelector('.popup__edit_el_about-me');

let profileName = document.querySelector('.profile__info-name');
let profileJob =  document.querySelector('.profile__info-job');

function formSubmitHandler (evt) {
    evt.preventDefault ();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
};

formElement.addEventListener('click', formSubmitHandler);

let buttonLikes = document.querySelectorAll('.elements__button');
let like = document.getElementById('');

function putLike (evt) {
    evt.preventDefault ();
    evt.target.classList.toggle('elements__button_theme_dark');    
};

buttonLikes.forEach(
        function(element) {
        element.addEventListener('click', putLike);
    }
);