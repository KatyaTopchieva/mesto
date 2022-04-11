class Api {
    constructor({ baseUrl, headers}) {
      this._headers = headers;
      this._baseUrl = baseUrl;
    }

    getProfile() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then(res => res.ok ? res.json() : Promise.rejrct(res.status))
        .catch(console.log)
    }

    getCard() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then(res => res.ok ? res.json() : Promise.rejrct(res.status))
        .catch(console.log)
    }

    
    editProfile(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
          })
        })
        .then(res => res.ok ? res.json() : Promise.rejrct(res.status))
        .catch(console.log)
    }

    
    addCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
          })
        })
        .then(res => res.ok ? res.json() : Promise.rejrct(res.status))
        .catch(console.log)
    }
  
    getInitialCards() {
      // ...
    }
  
    // другие методы работы с API
  }
  
  export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
    headers: {
      authorization: '56062737-a991-4dc5-adac-8bdf4ec818a8',
      'Content-Type': 'application/json'
    }
  });