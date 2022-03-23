export class Api {
    constructor({adress,token}){
        this._adress = adress; 
        this._token = token;
    }

    getCard(){
        return fetch(`${this._adress}/cards`,{
            headers: {
                authorization: this._token
                
            }
        }).then(response => {
            if(response.ok){
                return response.json();
            }
            return Promise.reject(`Ошибка ${response.status}`)
        })
    }
    getUserInfo(){
        return fetch(`${this._adress}/users/me`,{
            headers:{
                authorization: '1c933ec4-a4fc-4d43-aaf4-c9a8a8844745',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if(response.ok){
                return response.json();
            }
            return Promise.reject(`Ошибка ${response.status}`)
        })
    
    }
    editUserInfo(name,profession){
        return fetch(`${this._adress}/users/me`,{
            method: 'PATCH',
            headers: {
                authorization: '1c933ec4-a4fc-4d43-aaf4-c9a8a8844745',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: profession
            })
        })
        .then(response => {
            if(response.ok){
                return response.json();
            }
            return Promise.reject(`Ошибка ${response.status}`)
        })
        
            
    }
    addCard(name,link){
        return fetch(`${this._adress}/cards`,{
            method: 'POST',
            headers: {
                authorization: '1c933ec4-a4fc-4d43-aaf4-c9a8a8844745',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then(response => {
            if(response.ok){
                return response.json();
            }
            return Promise.reject(`Ошибка ${response.status}`)
        }) 
    }
    deleteCard(id){
        return fetch(`${this._adress}/cards/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: '1c933ec4-a4fc-4d43-aaf4-c9a8a8844745',
                    'Content-Type': 'application/json'
                },
        })
        .then(response => {
            if(response.ok){
                return response.json();
            }
            return Promise.reject(`Ошибка ${response.status}`)
        });
    }
    addLike(id){
        return fetch(`${this._adress}/cards/likes/${id}`, {
                method: 'PUT',
                headers: {
                    authorization: '1c933ec4-a4fc-4d43-aaf4-c9a8a8844745',
                    'Content-Type': 'application/json'
                },
        })
        .then(response => {
            if(response.ok){
                return response.json();
            }
            return Promise.reject(`Ошибка ${response.status}`)
        });
    }

    //Удаление лайка
    removeLike(id){
        return fetch(`${this._adress}/cards/likes/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: '1c933ec4-a4fc-4d43-aaf4-c9a8a8844745',
                    'Content-Type': 'application/json'
                },
        })
        .then(response => {
            if(response.ok){
                return response.json();
            }
            return Promise.reject(`Ошибка ${response.status}`)
        });

    }
    editAvatar(data){
        return fetch(`${this._adress}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: '1c933ec4-a4fc-4d43-aaf4-c9a8a8844745',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data
            })
    })
    .then(response => {
        if(response.ok){
            return response.json();
        }
        return Promise.reject(`Ошибка ${response.status}`)
    });

    }
}    

    
