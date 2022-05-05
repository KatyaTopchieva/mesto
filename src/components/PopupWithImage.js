import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
   constructor(popupSelector) {
      super(popupSelector);
      
      this._image = this._popup.querySelector('.popup__image-card');
      this._caption = this._popup.querySelector('.popup__caption');
      this._alt = this._popup.querySelector('.popup__caption');
   }
    
   open(text, link, alt) {  
      this._image.src = link;
      this._caption.textContent = text;
      this._alt.textContent = alt;

      super.open(); 
   }
}