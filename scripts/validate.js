  const showInputError = (formSelector, inputElement, errorMessage, parameters) => {
    const errorElement = formSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(parameters.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(parameters.errorClass);
  };
  
  const hideInputError = (formSelector, inputElement, parameters) => {
    const errorElement = formSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(parameters.inputErrorClass);
    errorElement.classList.remove(parameters.errorClass);
    errorElement.textContent = '';
  };


  const checkInputValidity = (formSelector, inputElement, parameters) => {
    if (!inputElement.validity.valid) {
      showInputError(formSelector, inputElement, inputElement.validationMessage, parameters);
    } else {
      hideInputError(formSelector, inputElement, parameters);
    }
  };

  const setEventListeners = (formSelector, parameters) => {
    const inputList = Array.from(formSelector.querySelectorAll(parameters.inputSelector));
    //'.popup__input'));
    const submitButtonSelector = formSelector.querySelector(parameters.submitButtonSelector);
      // '.popup__button');
   
    toggleButtonState (inputList, submitButtonSelector, parameters);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formSelector, inputElement, parameters);
        toggleButtonState(inputList, submitButtonSelector, parameters);
      });
    });
  };

  function enableValidation (parameters) {
    formList = Array.from(document.querySelectorAll(parameters.formSelector));// '.popup__form'));
    formList.forEach((formSelector) => {
      formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formSelector.querySelectorAll(parameters.fieldsetSelector));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet, parameters);
    });
  }); 
  };
  
  const _parameters = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inputErrorClass: 'popup__input_type_error',
    inactiveButtonClass: 'popup__button_disabled',
    errorClass: 'popup__error_visible',
    fieldsetSelector: '.popup__fieldset'
   };

  enableValidation (_parameters);
  
function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
       return !inputElement.validity.valid;
    });
  };

  function toggleButtonState(inputList, submitButtonSelector, parameters) {
    if (hasInvalidInput(inputList)) {
      submitButtonSelector.classList.add(parameters.inactiveButtonClass);
      submitButtonSelector.disabled = true;
    } else {
      submitButtonSelector.classList.remove(parameters.inactiveButtonClass);
      submitButtonSelector.disabled = false;
      };
    };