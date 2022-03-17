
  export function closeByEscape (evt) {
    if( evt.key === "Escape" ){ 
      const popup = document.querySelector('.popup_opened');
      closePopup(popup);
    }
  };

