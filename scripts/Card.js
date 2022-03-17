import {openPopup} from './index.js';

const popupImage = document.querySelector('.popup-image');
const popupImageCard = popupImage.querySelector('.popup__image-card');
const popupImageText = popupImage.querySelector('.popup__caption');

export class Card {

  constructor(data, cardTemplateSelector) {
    this._cardTemplate = document.querySelector(cardTemplateSelector).content;
    this._name = data.name;
    this._link = data.link;
  
    this.getCardElement();
  }

  fillCard = () => {
  this._cardElement.querySelector('.elements__name').textContent = this._name;
  this._cardElement.querySelector('.elements__image').src = this._link;
  };
  
  handleDeleteCard = (evt) => {
    evt.target.closest('.elements__card').remove();
  };
  
  handleLike = () => {
    this._cardLikeButton.classList.toggle('elements__button-like_active');
  };

  _openPopupImage = () => {
    popupImageCard.src = this._link;
    popupImageCard.alt = this._name;
    popupImageText.textContent = this._name;
    openPopup(popupImage);
  }

  _setEventListeners() {
    this._cardDeleteButton.addEventListener('click', this.handleDeleteCard);
    this._cardLikeButton.addEventListener('click', this.handleLike);
    this._cardImage.addEventListener('click', this._openPopupImage);
  };

  getCardElement() {
      this._cardElement = this._cardTemplate.cloneNode(true);
      this._cardDeleteButton = this._cardElement.querySelector('.elements__del');
      this._cardImage = this._cardElement.querySelector('.elements__image');
      this._cardLikeButton = this._cardElement.querySelector('.elements__button-like');
  
      this.fillCard();
     this._setEventListeners();
        
      return this._cardElement;
    }
}