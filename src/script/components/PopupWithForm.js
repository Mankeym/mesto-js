
import {Popup} from './Popup.js'
export class PopupWithForm extends Popup {
    constructor(popupSelector,{handleFormSubmit}){
        super(popupSelector)
        this._handleFormSubmit = handleFormSubmit
    }
    _getInputValues(){
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._values = {};
        this._inputList.forEach(input => this._values[input.name] = input.value);

        return this._values;
    }

    setEventListeners(){
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
          })
    }
    close() {
        super.close()
        const form = this._popup.querySelector('.popup__form')
        form.reset()
        
    }
}