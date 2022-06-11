export const BASE_URL = "https://register.nomoreparties.co";

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      authorization: "9b621f0f-5dfe-43f1-95fd-e9cc188bcc35",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return checkResponse(data);
    })

};
export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      authorization: "9b621f0f-5dfe-43f1-95fd-e9cc188bcc35",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((response) => response.json())
    .then((data) => {
      checkResponse(data);
      if (!data.error) {
        localStorage.setItem("jwt", data.token);
      }
      return data;
    })
    
};

const checkResponse = (data) => {
  if (data.message || data.error) {
    data.isError = true;
  } else {
    data.isError = false;
  }
  return data;
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => checkResponse(data))
};
