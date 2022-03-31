export class Card {

  constructor(data, cardTemplateSelector, handleImageClick) {
    this._cardTemplate = document.querySelector(cardTemplateSelector).content;
    this._name = data.name;
    this._link = data.link;
    this._alt = `Изображение ${data.name}`;
    this._handleImageClick = handleImageClick;
  
    this.getCardElement();
  }

  _fillCard = () => {
    this._cardElement.querySelector('.elements__name').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._alt;
  };

  _handleDeleteCard = (evt) => {
    evt.target.closest('.elements__card').remove();
  };
  
  _handleLike = () => {
    this._cardLikeButton.classList.toggle('elements__button-like_active');
  };

  _setEventListeners() {
    this._cardDeleteButton.addEventListener('click', this._handleDeleteCard);
    this._cardLikeButton.addEventListener('click', this._handleLike);
    this._cardImage.addEventListener('click', () => {
      this._handleImageClick();
    });
  };

  getCardElement() {
      this._cardElement = this._cardTemplate.cloneNode(true);
      this._cardDeleteButton = this._cardElement.querySelector('.elements__del');
      this._cardImage = this._cardElement.querySelector('.elements__image');
      this._cardLikeButton = this._cardElement.querySelector('.elements__button-like');
  
      this._fillCard();
      this._setEventListeners();
        
      return this._cardElement;
    }
}