export class Card {

  constructor(data, cardTemplateSelector, handleImageClick, handleDeleteClick) {
    this._cardTemplate = document.querySelector(cardTemplateSelector).content;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    
    this._alt = `Изображение ${data.name}`;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
  
    this.getCardElement();
  }

  _fillCard = () => {
    this._cardElement.querySelector('.elements__name').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._alt;
  };

  // _handleDeleteCard = (evt) => {
  //   evt.target.closest('.elements__card').remove();
  // };
  
  _handleLike = () => {
    this._cardLikeButton.classList.toggle('elements__button-like_active');
  };

  _setEventListeners() {
    this._cardDeleteButton.addEventListener('click', this._handleDeleteClick);
    this._cardLikeButton.addEventListener('click', this._handleLike);
    this._cardImage.addEventListener('click', () => {
      this._handleImageClick();
    });
  };

  _setLikes() {
    const cardLikeCount = this._cardElement.querySelector('.elements__like-count');
    cardLikeCount.textContent = this._likes.length;
  }

  getCardElement() {
      this._cardElement = this._cardTemplate.cloneNode(true);
      this._cardDeleteButton = this._cardElement.querySelector('.elements__del');
      this._cardImage = this._cardElement.querySelector('.elements__image');
      this._cardLikeButton = this._cardElement.querySelector('.elements__button-like');
  
      this._fillCard();
      this._setEventListeners();
      this._setLikes();
        
      return this._cardElement;
    }
}