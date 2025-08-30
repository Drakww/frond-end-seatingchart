import axios from './axios';

export const registerRequest =  (user: any) => axios.post(`/register`, user);

export const loginRequest = (user: any) => axios.post(`/login`, user);

export const verifyTokenRequest = () => axios.get('/verify');

