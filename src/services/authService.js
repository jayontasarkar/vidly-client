import http from './httpService';
import { apiUrl } from '../config.json';
import jwtDecode from 'jwt-decode';

const apiEndpoint = apiUrl + '/auth';
const tokenKey = 'token';

http.setJwt(getJwt());

export async function register(data) {
  const { headers } = await http.post(`${apiEndpoint}/register`, {
    name: data.name,
    email: data.email,
    password: data.password,
  });
  localStorage.setItem(tokenKey, headers['x-auth-token']);
}

export async function login(data) {
  const { headers } = await http.post(`${apiEndpoint}/login`, {
    email: data.email,
    password: data.password,
  });
  localStorage.setItem(tokenKey, headers['x-auth-token']);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  const jwt = localStorage.getItem(tokenKey);
  if (jwt) return jwtDecode(jwt);
  return null;
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  register,
  logout,
  getCurrentUser,
  getJwt,
};
