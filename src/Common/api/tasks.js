import API, { Api } from './api';
import { DEVELOPER_NAME, API_TOKEN } from 'Common/constants';

export default class Tasks extends Api {
  constructor() {
    super();
    this.mapSortName = {
      sortByName: 'name',
      sortByEmail: 'email',
      sortByStatus: 'status',
    };
  }

  getAllTasks() {

    return this.request({
      url: API.apiUrl(
        `?developer=${DEVELOPER_NAME}`,
      ),
      method: 'get',
    })
      .then(res => res)
      .catch(err => console.error(err));
  }

  getTasksByPage(page) {

    return this.request({
      url: API.apiUrl(`?developer=${DEVELOPER_NAME}&page=${page}`),
      method: 'get',
    })
      .then(res => res)
      .catch(err => console.error(err));
  }

  setSortDirectionByField(field, direction, page) {
    return this.request({
      url: API.apiUrl(`?developer=${DEVELOPER_NAME}&sort_field=${field}&sort_direction=${direction}&page=${page}`),
      method: 'get',
    })
      .then(res => res)
      .catch(err => console.error(err));
  }

  createFormDataByParams(params) {
    const form = this.createFormData();
    Object.keys(params).forEach(key => {
      form.append(key, params[key]);
    });
    return form;
  }

  createTask(text, username, email) {
    return this.createFormDataByParams({
      text,
      username,
      email,
    });
  }

  createEditedTask(statusValue, textValue, tokenValue, signature) {
    return this.createFormDataByParams({
      statusValue,
      textValue,
      tokenValue,
      signature,
    });
  }

  getAllEncodedFields(text, status) {
    return {
      textValue: this.fixedEncodeURIComponent(text),
      statusValue: this.fixedEncodeURIComponent(status),
      tokenValue: this.fixedEncodeURIComponent(API_TOKEN),
      text: this.fixedEncodeURIComponent('text'),
      status: this.fixedEncodeURIComponent('status'),
      token: this.fixedEncodeURIComponent('token'),
    };
  }

  createSignature(Url) {
    return this.createMD5Hash(Url);
  }

  saveEditedTask(textOrigin, statusOrigin, id) {
    const {
      statusValue, status, text, textValue, token, tokenValue,
    } = this.getAllEncodedFields(textOrigin, statusOrigin);

    const url = `${status}=${statusValue}&${text}=${textValue}&${token}=${tokenValue}`;
    const signature = this.createSignature(url);

    const formData = this.createEditedTask(statusOrigin, textOrigin, tokenValue, signature);

    return this.request({
      url: API.apiUrl(`edit/${id}?developer=${DEVELOPER_NAME}`),
      method: 'post',
      data: formData,
    });
  }

  saveTask(formDataTask) {

    return this.request({
      url: API.apiUrl(`create/?developer=${DEVELOPER_NAME}`),
      method: 'post',
      data: formDataTask,
    })
      .then(res => res)
      .catch(err => console.error('----------ERROR--------', err));
  }

}
