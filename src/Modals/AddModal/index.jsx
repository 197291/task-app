import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { ApiClient } from 'Common/api';
import * as actions from 'Common/store/actions';

class AddModal extends React.Component {

  constructor(props) {
    super(props);
    this.saveTask = this.saveTask.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleText = this.handleText.bind(this);
    this.launchAlert = this.launchAlert.bind(this);
    this.state = {
      username: '',
      email: '',
      text: '',
      isError: false,
    };
  }

  launchAlert(msg) {
    const { showAlert, hideAlert, closeModal } = this.props;
    closeModal();
    showAlert(msg);
    setTimeout(() => {
      hideAlert();
    }, 5000);
  }

  updateTasks(task) {
    this.props.addTask(task);
  }

  saveTask() {
    const { text, username, email } = this.state;

    const formDataTask = ApiClient.tasks.createTask(text, username, email);
    console.log(formDataTask);
    ApiClient.tasks.saveTask(formDataTask)
      .then(res => {
        if (res.status === 'error') {
          this.launchAlert(res.message);
        } else {
          this.updateTasks(res.message);
          this.props.closeModal();
        }
      });
  }

  handleUsername(e) {
    this.setState({ username: e.target.value });
  }

  handleEmail(e) {
    this.setState({ email: e.target.value });
  }

  handleText(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    return (
      <Modal
        size="lg"
        centered
        show={true}
        onHide={this.props.closeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add new task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={this.state.email}
                onChange={this.handleEmail}
                type="text"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={this.state.username}
                onChange={this.handleUsername}
                type="text"
                placeholder="Enter username"
              />
            </Form.Group>

            <Form.Group controlId="formBasicText">
              <Form.Label>Text</Form.Label>
              <Form.Control value={this.state.text} onChange={this.handleText} type="text" placeholder="Type a text" />
            </Form.Group>
          </Form>
          {this.state.isError && <div>All fields must to be filled!</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.closeModal}>Close</Button>
          <Button onClick={this.saveTask}>Save task</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const dispatchToProps = (dispatch) => ({
  showAlert: (msg) => dispatch(actions.showAlert(msg)),
  hideAlert: () => dispatch(actions.hideAlert()),
  addTask: (task) => dispatch(actions.addTask(task)),
});

export default connect(null, dispatchToProps)(AddModal);
