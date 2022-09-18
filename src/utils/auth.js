const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, password})
  })
  .then(response => {
    return response.json().then(json => {
      return response.ok ? json : Promise.reject(json.error);
    });
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, password})
  })
  .then(response => {
    return response.json().then(json => {
      json.token && localStorage.setItem('jwt', json.token);
      return response.ok ? json : Promise.reject(json.error);
    });
  })
};

export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    }
  })
  .then(response => {
    return response.json().then(json => {
      return response.ok ? json.data : Promise.reject(json.error);
    });
  })
}