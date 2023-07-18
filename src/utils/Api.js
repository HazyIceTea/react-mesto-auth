class Api {
    constructor(authCode, baseUrl) {
        this._checkRes = (res => res.ok ? res.json() : Promise.reject());
        this.authCode = authCode;
        this.baseUrl = baseUrl
    }

    getAllCards() {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'GET',
            headers: {
                authorization: this.authCode
            }
        })
            .then(this._checkRes)
    }

    sendCard(data) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: this.authCode,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._checkRes)
    }

    deleteCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this.authCode
            }
        })
            .then(this._checkRes)
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                authorization: this.authCode
            }
        })
            .then(this._checkRes)
    }

    sendUserInfo(data) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.authCode,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.info
            })
        })
            .then(this._checkRes)
    }

    changeAvatar(data) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this.authCode,
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._checkRes)
    }

    likeCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this.authCode,
            }
        })
            .then(this._checkRes)
    }

    dislikeCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this.authCode
            }
        })
            .then(this._checkRes)
    }
}

const api = new Api('b66b2bcb-af09-40bb-b429-5ea9d883fa32', 'https://mesto.nomoreparties.co/v1/cohort-66');

export default api;