export const popupImage = document.querySelector('.popup-image');
export const popupImageCard = popupImage.querySelector('.popup__image-card');
export const popupImageText = popupImage.querySelector('.popup__caption');


export function openPopup (popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape)
  };
  
export  function closePopup (popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
  };
  
export function closeByEscape (evt) {
  if( evt.key === "Escape" ){ 
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};