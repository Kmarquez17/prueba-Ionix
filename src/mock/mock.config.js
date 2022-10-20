import data from "../assets/user.json";
import MockAdapter from "axios-mock-adapter";

let userList = data.users;

export const isMockEnabled = () => {
  return "true";
};

export const initializeAxiosMockAdapter = (instance) => {
  const mock = new MockAdapter(instance);
  mock.onGet("/users").reply(() => getUsers());
  // mock.onGet(/\/users\/\d+/).reply(config => getCountry(config));
  mock.onPost("/users").reply((config) => addUser(config));
  mock.onPut(/\/users\/\d+/).reply((config) => editUser(config));
  mock.onDelete(/\/users\/\d+/).reply((config) => removeUser(config));

  mock.onPost("/login").reply((config) => getLogin(config));
};

export const getLogin = (config) => {
  let { email, password } = JSON.parse(config.data);
  //Se puso un contraseña fictisia para simular error 
  if (password !== "1234") return [404, []];
  const user = userList.find((c) => c.email === email) || [];
  return [200, user];
};

export const getUsers = () => {
  return [200, userList];
};

export const getUser = (config) => {
  const id = extractIdPathParamFromUrl(config);
  const user = userList.find((c) => c.id === id);
  return [200, user];
};

const extractIdPathParamFromUrl = (config) => {
  return config.url.split("/").pop();
};

export const addUser = (config) => {
  const user = JSON.parse(config.data);
  userList.push(user);
  return [200, user];
};

export const editUser = (config) => {
  const id = extractIdPathParamFromUrl(config);
  const userIndex = userList.findIndex((c) => c.id === id);
  const user = JSON.parse(config.data);
  userList[userIndex] = user;
  return [200, user];
};

export const removeUser = (config) => {
  const id = extractIdPathParamFromUrl(config);
  userList = userList.filter((c) => c.id !== id);
  return [204, null];
};
