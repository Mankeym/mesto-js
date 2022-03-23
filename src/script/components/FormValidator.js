export class FormValidator{
    constructor(valid,popupForm){
        this._valid = valid;
        this._popupForm = popupForm;
    }
    _hasInvalidInput(inputList){
        return inputList.some((inputSelector) => {
            console.log(inputList)
            return !inputSelector.validity.valid;
          })
      };
    _toggleButtonState(inputList, buttonElement){
      console.log(this._hasInvalidInput(inputList))
      if (this._hasInvalidInput(inputList)) {
         buttonElement.classList.add(this._valid.submitButtonDisabled);
         buttonElement.disabled = true;
      } else {
          buttonElement.classList.remove(this._valid.submitButtonDisabled);
          buttonElement.disabled = false;
        }
      };
      _inputError(popupForm, inputSelector, errorMessage, inputErrorCon, errorVis){
        const error = this._popupForm.querySelector(`.${inputSelector.id}-error`);
        inputSelector.classList.add(this._valid.inputErrorCon);
        error.textContent = errorMessage;
        error.classList.add(this._valid.errorVis);
      };
    
       _hideInputError(popupForm, inputSelector,inputErrorCon,errorVis) {
        const error = this._popupForm.querySelector(`.${inputSelector.id}-error`);
        inputSelector.classList.remove(this._valid.inputErrorCon);
        error.textContent = "";
        error.classList.remove(this._valid.errorVis);
      };
      _isValid(popupForm, inputSelector,inputErrorCon,errorVis){
        if (!inputSelector.validity.valid) {
            this._inputError(popupForm, inputSelector, inputSelector.validationMessage,inputErrorCon,errorVis);
        } else {
            this._hideInputError(popupForm, inputSelector,inputErrorCon,errorVis);
        }
        }; 
      _setEventListeners(popupForm,submitButtonDisabled,inputErrorCon,errorVis){
        const inputList = Array.from(this._popupForm.querySelectorAll(this._valid.inputSelector))
        const buttonElement = this._popupForm.querySelector(this._valid.submitButton)
        this._toggleButtonState(inputList, buttonElement,submitButtonDisabled)
        inputList.forEach((inputSelector) => {
            inputSelector.addEventListener('input', () => {
                this._isValid(popupForm, inputSelector,inputErrorCon,errorVis);
                this._toggleButtonState(inputList, buttonElement,submitButtonDisabled);
            });
        });
      };
      enableValidation(){
        
          this._popupForm.addEventListener('submit', function (evt) {
                evt.preventDefault();
          });
          this._setEventListeners(); // При попытке исправить замечание в этой части, код начал ломаться, причину найти не могу. Прошу понять и просить :(
      };
      validatePopupOnOpen(inputList,buttonElement) {
            this._toggleButtonState(inputList, buttonElement);
      }
      
}
