export class Card {

  constructor(data, cardTemplateSelector, handleImageClick, handleDeleteClick, handleLikeClick) {
    this._cardTemplate = document.querySelector(cardTemplateSelector).content.querySelector('.elements__card');
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data.id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    
    this._alt = `Изображение ${data.name}`;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  
    this.getCardElement();
  }

  _fillCard = () => {
    this._cardElement.querySelector('.elements__name').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._alt;
  };

  _setEventListeners() {
    this._cardDeleteButton.addEventListener('click', () => {
      this._handleDeleteClick(this._id)
    });
    this._cardLikeButton.addEventListener('click', () => {
      this._handleLikeClick(this._id)
    });
    this._cardImage.addEventListener('click', () => {
      this._handleImageClick();
    });
  };

  
  isLiked() {
    const userHasLikedCard = this._likes.some(user => user._id === this._userId);
    return userHasLikedCard
  }

  _fillLike = () => {
    this._cardLikeButton.classList.add('elements__button-like_active');
  };

  _withoutLike = () => {
    this._cardLikeButton.classList.remove('elements__button-like_active');
  };

  setLikes(newLikes) {
    this._likes = newLikes;
    const cardLikeCount = this._cardElement.querySelector('.elements__like-count');
    cardLikeCount.textContent = this._likes.length;

    if(this.isLiked()) {
      this._fillLike();
    } else {
      this._withoutLike();
    }
  }

  deleteCard(evt) {
    this._cardElement.remove();
    this._cardElement = null;
  };

  getCardElement() {
      this._cardElement = this._cardTemplate.cloneNode(true);
      this._cardDeleteButton = this._cardElement.querySelector('.elements__del');
      this._cardImage = this._cardElement.querySelector('.elements__image');
      this._cardLikeButton = this._cardElement.querySelector('.elements__button-like');
  
      this._fillCard();
      this._setEventListeners();
      this.setLikes(this._likes);

      if(this._userId !== this._ownerId) {
        this._cardDeleteButton.style.display = 'none';
      };

      return this._cardElement;
    }
}