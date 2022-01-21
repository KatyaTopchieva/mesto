const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');

function openPopup () {
    popup.classList.add('popup_opened');
    console.log('работает');
}

function closePopup () {
    popup.classList.remove('popup_opened');
    console.log('отдыхает'); 
}

profileOpenPopupButton.addEventListener('click', openPopup);