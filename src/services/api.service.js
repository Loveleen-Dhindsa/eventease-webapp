import axios from "./axios";

export const signupApi = async (body) => {
  return axios.post('/users/signup', body).then((response) => {
    return response.data;
  });
};

export const loginApi = async (body) => {
  return axios.post('/users/login', body).then(({ data: response }) => {
    return response.data;
  });
};
