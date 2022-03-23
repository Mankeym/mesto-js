
export class Card {
    constructor(cards,userID,cardTemplate,handleCardClick,deleteCardClick,handleCardLike){
        this._place = cards.name
        this._link = cards.link
        this._like = cards.likes
        this._owner = cards.owner
        this._cardTemplate = cardTemplate;
        this._handleCardClick = handleCardClick;
        this._deleteCardClick = deleteCardClick;
        this._handleCardLike = handleCardLike;
        this._userID = userID;
    }
    
    _getTemplate(){
        return this._cardTemplate.content.querySelector('.card').cloneNode(true)
    }
    _deleteEdit(){
        const deleteEdit = document.querySelector('.overlay_edit-delete')
        deleteEdit.classList.add('overlay_active')
    }
    getItem(){
        this._element = this._getTemplate();
        this._photoCardLike=this._element.querySelector('.card__button')
        this._element.querySelector('.card__title').textContent = this._place;
        this._element.querySelector('.card__logo').src = this._link;
        this._element.querySelector('.card__logo').alt = this._name;
        this._element.querySelector('.card__score').textContent = this._like.length
        this._element.querySelector('.card__logo').setAttribute('id',this._userID)
        this._setEventListeners()
        if (this._checkOurLike()) {
          this.setLiked()
        } else {
          this.unsetLiked()
        }
        if (!(this._userID === this._owner._id)) {
          this._removeDeleteButton();
        }
        return this._element;
    }
    _openOverlayImage(){ 
      this._handleCardClick(); 
  } 
  updateLikes(data) {
    this._like = data;
    this._element.querySelector('.card__score').textContent = this._like.length;
  }
  _checkOurLike () {
    // Проверяем, ставили ли мы лайки
    return this._like.some(
      (element) => element._id === this._userID
    );
  }
  setLiked() {
    this._photoCardLike.classList.add('card__button_active');
    this.isLiked=true;
  }
 
  unsetLiked() {
    this._photoCardLike.classList.remove('card__button_active');
    this.isLiked=false;
  }

  _removeDeleteButton() {
  this._element.querySelector('.card__trash').remove();
  }
    _setEventListeners(){
        const deleteTrash = this._element.querySelector('.card__trash')

        deleteTrash.addEventListener('click',()=> {
            this._deleteCardClick();
        })
        const cardLogo = this._element.querySelector('.card__logo')
        cardLogo.addEventListener('click', () =>{
            this._openOverlayImage()
        })
        this._photoCardLike.addEventListener('click', () => {
            this._handleCardLike()
        })
    }
    deleteCard (){
      console.log(this._element)
      this._element.remove();
      this._element = null;
     }
    delete(){
      const targetEl = event.target;
      const targetItem = targetEl.closest('.card');
      targetItem.remove();
    }
    handleDelete(){
        /*const targetEl = event.target;
        const targetItem = targetEl.closest('.card');
        targetItem.remove();*/
        const confirm = document.querySelector('.overlay_edit-delete')
        confirm.classList.add('overlay_active')
    }
    _likeHeart(item){ 
      item.target.classList.toggle('card__button_active') 
  }
  idCard() {
    return this._cardId;
  }
} 