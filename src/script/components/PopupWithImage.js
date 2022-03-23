
import {Popup} from './Popup.js'
export class PopupWithImage extends Popup {
    constructor(containerSelector) {
    super(containerSelector);
    this._name = this._popup.querySelector('.popup__textpicture');
    this._link = this._popup.querySelector('.popup__picture');
    }

    open(link,place){
        this._link.src = link;
        this._name.textContent = place;
        super.open();
    }
}