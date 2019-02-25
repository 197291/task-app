import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import { ApiClient } from 'Common/api';
import * as actions from 'Common/store/actions';

class EditTaskModal extends React.Component {

  constructor(props) {
    super(props);
    this.saveTask = this.saveTask.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.state = {
      checked: !!props.task.status,
      text: props.task.text,
      isError: false,
      errorMsg: '',
    };
  }

  updateTask(task) {
    this.props.updateTask(task);
  }

  showError(res) {
    console.error('----ERROR-----', res);
    this.setState({
      isError: true,
      errorMsg: res.message,
    });
    setTimeout(() => {
      this.setState({
        isError: false,
        errorMsg: '',
      });
    }, 5000);
  }

  saveTask() {
    const { text, checked } = this.state;
    const status = checked ? 10 : 0;
    ApiClient.tasks.saveEditedTask(text, status, this.props.task.id)
      .then(res => {
        if (res.status === 'ok') {
          this.updateTask({ ...this.props.task, status, text });
          this.props.closeModal();
        } else {
          this.showError(res);
        }
      });
  }

  handleText(e) {
    this.setState({ text: e.target.value });
  }

  handleChangeStatus(e) {
    this.setState({
      checked: e.target.checked,
    });
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
            Edit task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicText">
              <Form.Label>Text</Form.Label>
              <Form.Control value={this.state.text} onChange={this.handleText} type="text" placeholder="Type a text" />
            </Form.Group>
            <label>
              <input checked={this.state.checked} onChange={this.handleChangeStatus} type="checkbox" />
              Task is done
            </label>
          </Form>
          {this.state.isError &&
            <Alert variant="danger">
              {this.state.errorMsg}
            </Alert>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.closeModal}>Close</Button>
          <Button onClick={this.saveTask}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const dispatchToProps = (dispatch) => ({
  showAlert: (msg) => dispatch(actions.showAlert(msg)),
  hideAlert: () => dispatch(actions.hideAlert()),
  addTask: (task) => dispatch(actions.addTask(task)),
  updateTask: (task) => dispatch(actions.updateTask(task)),
});

export default connect(null, dispatchToProps)(EditTaskModal);
