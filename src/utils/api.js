const configApi = {
  host: 'https://mesto.nomoreparties.co/v1/cohort-47',
  token: 'fecf0c0a-0938-47a0-bc3a-dfac6e5ffd59'
}

class Api {
  constructor(configApi) {
    this._host = configApi.host;
    this._token = configApi.token;
  }

  _getJsonOrError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _getHeaders() {
    return {
      authorization: this._token,
      'Content-Type': 'application/json',
    }
  }

  getUserInfo() {
    return fetch(`${this._host}/users/me`, {
      headers: this._getHeaders()
    })
    .then(this._getJsonOrError)
  }

  setUserInfo(data) {
    return fetch(`${this._host}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify(data)
    })
    .then(this._getJsonOrError)
  }

  setAvatar(data) {
    return fetch(`${this._host}/users/me/avatar `, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify(data)
    })
    .then(this._getJsonOrError)
    
  }

  getCards() {
    return fetch(`${this._host}/cards`, {
      headers: this._getHeaders()
    })
    .then(this._getJsonOrError)
  }

  addCard(data) {
    return fetch(`${this._host}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify(data)
    })
    .then(this._getJsonOrError)
  }

  deleteCard(cardId) {
    return fetch(`${this._host}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
  }

  changeLikeCardStatus(isLiked, cardId) {
    return fetch(`${this._host}/cards/${cardId}/likes`, {
      method: `${isLiked ? 'DELETE' : 'PUT'}`,
      headers: this._getHeaders()
    })
    .then(this._getJsonOrError)
  }
}

const api = new Api(configApi);

export default api;