import axios from 'axios';
import md5 from 'md5';
import strictUriEncode from 'strict-uri-encode';

import { API_BASE_URL } from 'Common/constants';
// import store from 'Common/store';
// import * as actions from 'Common/store/actions';

export class Api {

  constructor() {
    this.token = 'beejee';
    this.addSignature = this.addSignature.bind(this);
    this.createSignature = this.createSignature.bind(this);
    this.fixedEncodeURIComponent = this.fixedEncodeURIComponent.bind(this);
  }

  fixedEncodeURIComponent(str) {
    return strictUriEncode(str);
  }

  createMD5Hash(str) {
    return md5(str);
  }

  createSignature(strRequest) {
    return this.createMD5Hash(strRequest);
  }

  addSignature(strRequest) {
    return strRequest + this.createSignature(strRequest);
  }

  apiUrl(path) {
    return API_BASE_URL + path;
  }

  request(config) {
    return axios.request(config)
      .then(({ data }) => data)
      .catch(({ error }) => error);
  }

  createFormData() {
    return new FormData();
  }
}

const API = new Api();
export default API;
