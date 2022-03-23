

export class UserInfo {
    constructor({usernameSelector, userinfoSelector, useravatarSelector}) {
        this._author = document.querySelector(usernameSelector);
        this._profession = document.querySelector(userinfoSelector);
        this._avatar = document.querySelector(useravatarSelector);
    }

    getUserInfo(){
        this._userData = {
            username: this._author.textContent,
            userinfo: this._profession.textContent
        };
        return this._userData
    }

    setUserInfo(data){
        this._author.textContent = data.name
        this._profession.textContent = data.about;
        this._avatar.src = data.avatar
    }
}