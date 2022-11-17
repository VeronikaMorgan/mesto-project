
const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wbf-cohort-2',
  headers: {
    authorization: '8fae5b61-4ae1-43e7-8c83-1bb3189fdcf5',
    'content-type': 'application/json'
  }
}

export function handleBasicResponse(res) {
  if(!res.ok) {
    return Promise.reject(res.status)
  }
  return res.json()
}

export function handleError(err) {
  console.log(`Ошибка: ${err}`)
}

export function postNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    })
  })
  .then(handleBasicResponse)
}

export function updateProfileData(userName, userAbout) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout,
    })
  })
  .then(handleBasicResponse)
}

export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(handleBasicResponse)
}

export function getProfileData() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
  .then(handleBasicResponse)
}

export function updateProfileAvatar(src) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: src,
    })
  })
  .then(handleBasicResponse)
}

export function deleteApiCard(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(handleBasicResponse)
}

export function setLike(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
  method: 'PUT',
  headers: config.headers,
  })
  .then(handleBasicResponse)
}

export function removeLike(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers,
    })
    .then(handleBasicResponse)
}