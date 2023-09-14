import axios from 'axios';

const KEY_USER = 'user';
const KEY_TOKEN = 'token';
const KEY_CART = 'cartItems'
class Services {
  constructor() {
    this.axios = axios;
    this.interceptors = null;
    this.axios.defaults.withCredentials = false;
    // logout when response 401
    this.axios.interceptors.response.use(
      (response) => response,
      (error) => {
        console.log('error: ', error.response.status)
        if (error.response.status === 403) {
          this.clearUserInfoStorage();
          localStorage.removeItem(KEY_TOKEN);
          window.location.reload();
          return;
        }
        return Promise.reject(error);
      },
    );
    this.get = this.axios.get;
    this.post = this.axios.post;
    this.put = this.axios.put;
    this.delete = this.axios.delete;
    this.patch = this.axios.patch;
    this.interceptors = this.axios.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        window.localStorage.getItem(KEY_TOKEN)
          ? (config.headers['Authorization'] = `Bearer ${window.localStorage.getItem(KEY_TOKEN)}`)
          : null;
        return config;
      },
      function (error) {
        return Promise.reject(error);
      },
    );
  }

  attachTokenToHeader(token) {
    this.interceptors = this.axios.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
      },
      function (error) {
        return Promise.reject(error);
      },
    );
  }

  saveTokenStorage(token) {
    window.localStorage.setItem(KEY_TOKEN, token);
  }

  getTokenStorage() {
    const userStorage = window.localStorage.getItem(KEY_TOKEN);

    if (userStorage === 'null') {
      return null;
    }

    return userStorage;
  }

  clearTokenStorage() {
    window.localStorage.removeItem(KEY_TOKEN);
  }

  removeInterceptors() {
    this.axios.interceptors.request.eject(this.interceptors);
  }

  source() {
    return this.axios.CancelToken.source();
  }

  isCancel(error) {
    return this.axios.isCancel(error);
  }

  saveUserInfoStorage(user) {
    window.localStorage.setItem(KEY_USER, JSON.stringify(user));
  }

  getUserInfoStorage() {
    const userStorage = JSON.parse(window.localStorage.getItem(KEY_USER));

    if (userStorage === 'null') {
      return null;
    }

    return userStorage;
  }

  clearUserInfoStorage() {
    window.localStorage.removeItem(KEY_USER);
  }

  saveItemCart(item) {
    window.localStorage.setItem(KEY_CART, JSON.stringify(item))
  }

  getItemCart() {
    const itemCart = JSON.parse(window.localStorage.getItem(KEY_CART))
    if (itemCart === 'null') {
      return null
    }
    return itemCart
  }
  clearItemCart() {
    window.localStorage.removeItem(KEY_CART)
  }

}

export default new Services();
