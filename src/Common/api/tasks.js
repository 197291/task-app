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

  createTask(text, username, email) {
    const form = this.createFormData();
    form.append('text', text);
    form.append('username', username);
    form.append('email', email);
    return form;
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

  saveEditedTask(text, status, id) {
    const values = this.getAllEncodedFields(text, status);
    console.log('values', values);
    // const codedText = this.fixedEncodeURIComponent(text);
    // const codedStatus = this.fixedEncodeURIComponent(status);
    // const codedToken = this.fixedEncodeURIComponent(API_TOKEN);
    // const codedText = this.fixedEncodeURIComponent(`&text=${text}`);
    // const codedStatus = this.fixedEncodeURIComponent(`&status=${status}`);
    // const codedToken = this.fixedEncodeURIComponent(`&token=${API_TOKEN}`);
    // const signature = this.createMD5Hash(codedText + codedStatus + codedToken);
    // console.log('codedText + codedStatus + codedToken', codedText + codedStatus + codedToken);
    // console.log('codedText, codedStatus, codedToken, signature', codedText, codedStatus, codedToken, signature);
    // const url = codedText + codedStatus + codedToken + `&signature=${signature}`;
    const urlRequest = `
      &${values.status}=${values.statusValue}
      &${values.text}=${values.textValue}
      &${values.token}=${values.tokenValue}
    `;
    const signature = this.createMD5Hash(urlRequest);
    return this.request({
      url: API.apiUrl(`?developer=${DEVELOPER_NAME}/edit/${id}`),
      // url: API.apiUrl(`?developer=${DEVELOPER_NAME}/edit/${id}${url}`),
      method: 'post',
      data: {
        text,
        status,
        signature,
        token: API_TOKEN,
      },
      // data: {
      //   text: codedText,
      //   status: codedStatus,
      //   token: codedToken,
      //   signature,
      // },
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
