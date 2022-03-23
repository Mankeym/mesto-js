import {Popup} from './Popup.js'
export class PopupConfirm extends Popup{
    constructor(popupSelector) {
        super(popupSelector)
        this._handleSubmit = this.handler.bind(this)
    }


    handler(evt) {
        evt.preventDefault();
        this._handleDeleteCard();
    }

    setEventListeners(){
        super.setEventListeners();
        console.log(this._handleDeleteCard)
        this._popup.addEventListener('submit', this._handleSubmit);
    }
    open({handleDeleteCard}) {
        super.open();
        this._handleDeleteCard = handleDeleteCard;
    }
}