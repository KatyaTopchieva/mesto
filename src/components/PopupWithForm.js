import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);

        this._handleSubmit = handleSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = [...this._form.querySelectorAll('.popup__input')]; 
    }

    _getInputValues() {
        const values = {};
        this._inputs.forEach((input) => {
            values[input.name] = input.value;           
        }); 
        
        return values;
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit(this._getInputValues());
        });
    }

    changeSubmitHandler(newSubmitHandler) {
        this._handleSubmit = newSubmitHandler;
    }

    close() {
        super.close();
        this._form.reset();
    }
}