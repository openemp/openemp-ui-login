/* eslint-disable import/prefer-default-export */
import decode from 'jwt-decode';
import Axios from 'axios';

const axios = Axios.default;

function isTokenExpired(accessToken) {
  try {
    const decoded = decode(accessToken);
    if (decoded.exp < Date.now() / 1000) {
      // Checking if accessToken is expired.
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
}

function setToken(accessToken, refreshToken) {
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('refresh_token', refreshToken);
}

function getAccessToken() {
  return localStorage.getItem('access_token');
}

function getRefreshToken() {
  return localStorage.getItem('refresh_token');
}

export function getConfirm() {
  const answer = decode(getAccessToken());
  // console.log('Recieved answer!');
  return answer;
}

export function loggedIn() {
  const accessToken = getAccessToken();
  return !!accessToken && !isTokenExpired(accessToken);
}

export async function fetch(url, method, data, authorization) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (loggedIn()) {
    if (authorization) {
      headers.Authorization = `Bearer ${getRefreshToken()}`;
    } else {
      headers.Authorization = `Bearer ${getAccessToken()}`;
    }
  }

  const options = {
    method,
    headers: {
      'content-type': 'application/json',
    },
    data,
    url,
  };

  return axios(options)
    .then()
    .then((response) => response);
  //   return (
  //     fetch(url, {
  //       headers,
  //       ...options,
  //     })
  //       // .then( _checkStatus)
  //     //   .then((response) => response.json())
  //   );
}

// eslint-disable-next-line no-unused-vars
export async function login({ username, password, remember }) {
  const { data } = await fetch(
    `http://${process.env.API_HOST}:${process.env.API_PORT}/api/v1/users/authenticate`,
    'POST',
    {
      username,
      password,
    },
  );
  setToken(data.token);
  return data;
}
