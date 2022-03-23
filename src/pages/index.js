import './index.css';
import {Card} from '../script/components/Card.js';
import {Section} from '../script/components/Section.js'
import {FormValidator} from '../script/components/FormValidator.js';
import {PopupWithForm} from '../script/components/PopupWithForm.js';
import {PopupWithImage} from '../script/components/PopupWithImage.js'
import {UserInfo} from '../script/components/UserInfo.js'
import {Api} from '../script/components/Api.js'
import * as constants from '../script/utils/constants.js'
import { PopupConfirm } from '../script/components/PopupConfirm.js';
const cardEl = document.querySelector('.card-template')
const confirm = new PopupConfirm('.overlay_edit-delete')
const api = new Api({
  adress:'https://mesto.nomoreparties.co/v1/cohort-22',
  token:'1c933ec4-a4fc-4d43-aaf4-c9a8a8844745'
});
const openLargeImage = new PopupWithImage('.overlay_edit-picture');
openLargeImage.setEventListeners()
Promise.all([
  api.getUserInfo(),
  api.getCard()
])
    .then((result) => {
      const [userData, initialCards] = result;
      usernew.setUserInfo(userData);
      console.log(userData)
      userID = userData._id;
      cardsList.renderItems(initialCards);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
let userID='';
function createCard (result,cardEl,userID,confirm,openLargeImage) {
  const card = new Card(
    result,
    userID,
    cardEl,
    // Обработчик открытия большого изображения
    () => openLargeImage.open(result.link,result.name), 
    // Обработчик открытия попапа на удаления
    () => {
      confirm.open(
        {handleDeleteCard: 
          () => {
            api.deleteCard(result._id)
            .then(() => {
              card.deleteCard();
              confirm.close();
            })
            .catch(err => console.log('Ошибка при удалении'))
            .finally(() => {
              confirm.restoreButtonName();
            })
          }
        }
      )
    },
    // Обработчик нажатия на сердце
    () => {
      // Для обновления в реальном времени счетчика кликов
        
        if (card.isLiked) {
          api.removeLike(result._id)
          .then((result) => {
            card.unsetLiked();
            card.updateLikes(result.likes);
          })
          .catch(err => console.log('Ошибка при удалении'))
        } else {
          api.addLike(result._id)
          .then((result) => {
            card.setLiked();
            card.updateLikes(result.likes);
          })
          .catch(err => console.log('Ошибка при добавлении'))
        }
    }
  );
  return card;
}
/*
function createCard(item) {
  const card = new Card(item, '.card-template', () => {
    openLargeImage.open(item.link, item.name),
    () => {
      confirm.open({
        handleDeleteCard:
        api.deleteCard(item._id)
        .then(() => {
          card.delete;
          confirm.close
        })
        .catch(err => console.log('Ошибка удаления'))
      })
    },
    item._id
  })
  return card.getItem();
}
*/
const usernew = new UserInfo ({usernameSelector: '.profile__title', userinfoSelector: '.profile__subtitle', useravatarSelector: '.profile__logo'});
const cardsList = new Section({
  renderer: (item) => {
    const card = createCard (item,cardEl,userID, confirm, openLargeImage);
    const newCard = card.getItem();
    cardsList.addItem(newCard);
  },
},
  constants.directorsList);
function openAvatarForm() {
  formAvatar.open()
}
function openProfileModal() {
  const data = usernew.getUserInfo()
  formAuthor.open();
  constants.nameInput.value = data.username;
  constants.jobInput.value = data.userinfo;
}
function openCardModal() {
  formAddImage.open()
  constants.overlayEdit.querySelector(constants.valid.submitButton).classList.add(constants.valid.submitButtonDisabled)
}
//Изменение данных в попапе с автором
const formAuthor = new PopupWithForm('.profile-popup',
  {
    handleFormSubmit: () => {
    const profile = {
      name: constants.nameInput.value,
      about: constants.jobInput.value,
      avatar: constants.avatarUrl.src
    }
    formAuthor.changeButtonName(constants.buttonLoadingName)
    api.editUserInfo(profile.name, profile.about)
      .then(() => {
        usernew.setUserInfo(profile);
        formAuthor.close();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(
        () => {
          formAuthor.restoreButtonName();
        }
      ) 
    }
  });

  const formAvatar = new PopupWithForm('.overlay_edit_avatar',
  {
    handleFormSubmit: () => {
    const profile = {
      avatar: constants.avatarProfile.value
    }
    formAvatar.changeButtonName(constants.buttonLoadingName);
    api.editAvatar(profile.avatar)
    .then((result) =>{
        usernew.setUserInfo(result);
        formAvatar.close();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(
        () => {
          formAvatar.restoreButtonName()
        }
      ) 
    }
  });
//Добавление карточки в попапе
const formAddImage = new PopupWithForm('.overlay_edit',
  { 
    handleFormSubmit: (data) => {
      const itemCard = {
        name: constants.namePicture.value,
        link: constants.jobPicture.value
      }
      formAddImage.changeButtonName(constants.buttonLoadingName)
      api.addCard(itemCard.name, itemCard.link)
      .then((result) =>{ 
       // cardsList.renderItems(result);
       // const openLargeImage = new PopupWithImage(result.name, result.link, popupImage, closePopupHotKey);
        const card = createCard (result,cardEl,userID, confirm,openLargeImage);
        const cardElement = card.getItem();
        cardsList.addItem(cardElement);
        formAddImage.close();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(
        () => {
          formAddImage.restoreButtonName();
        }
      ) 
    }
  })

  const valAuthorForm = new FormValidator(constants.valid, constants.profilePopup);
  const valImageForm = new FormValidator(constants.valid, constants.form);

  //Добавление карочек при загрузке страницы

  //Изменение данных в попапах
  formAuthor.setEventListeners();
  formAddImage.setEventListeners();
  formAvatar.setEventListeners();
  confirm.setEventListeners();


  //Валидация форм
  valAuthorForm.enableValidation();
  valImageForm.enableValidation();

// Открытие попапа для изменения аватара
 constants.avatar.addEventListener('click', openAvatarForm)
// Открытие попапа для изменения автора
    constants.profilePopupOpenButton.addEventListener('click', openProfileModal)

// Открытие попапа для добавления картинки
    constants.openPicture.addEventListener('click', openCardModal);