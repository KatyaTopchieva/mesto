export class FormValidator {
    constructor(parameters, form) {
        this._form = form;
        this._parameters = parameters;    
    }

    _showInputError = (inputElement, errorMessage) => {
        const { inputErrorClass, errorClass } = this._parameters;
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(errorClass);
      };
      
    hideInputError = (inputElement) => {
        const { inputErrorClass, errorClass } = this._parameters;
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        
        if(inputElement) inputElement.classList.remove(inputErrorClass);
        if(errorElement){
          errorElement.classList.remove(errorClass);
          errorElement.textContent = ' ';
        } 
      };

     checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement, inputElement.validationMessage);
        } else {
          this.hideInputError(inputElement);
        }
        return;
      };

    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
           return !inputElement.validity.valid;
        });
      };

    _setEventListeners = () => {
        this._inputList = Array.from(this._form.querySelectorAll(this._parameters.inputSelector));
        this._submitButtonSelector = this._form.querySelector(this._parameters.submitButtonSelector);
       
        this.toggleButtonState ();
        const _this = this;
        this._inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', function () {
            _this.checkInputValidity(inputElement);
            _this.toggleButtonState();
          });
        });
      };
    
    toggleButtonState = () => {
        if (this._hasInvalidInput()) {
          this._submitButtonSelector.classList.add(this._parameters.inactiveButtonClass);
          this._submitButtonSelector.disabled = true;
        } else {
          this._submitButtonSelector.classList.remove(this._parameters.inactiveButtonClass);
          this._submitButtonSelector.disabled = false;
          };
        };
        
    enableValidation = () => {
        this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        });
        
        this._setEventListeners();    
    }

    resetErrorsForm() {
      this._form.reset();
      this._inputList.forEach((inputElement) => {
        this.hideInputError(inputElement);
      })
    }
}