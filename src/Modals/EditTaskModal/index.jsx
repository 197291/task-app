import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { ApiClient } from 'Common/api';
import * as actions from 'Common/store/actions';

class EditTaskModal extends React.Component {

  constructor(props) {
    super(props);
    this.saveTask = this.saveTask.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.launchAlert = this.launchAlert.bind(this);
    this.state = {
      checked: !!props.task.status,
      text: props.task.text,
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
    const { text, checked } = this.state;
    const status = checked ? 10 : 0;
    ApiClient.tasks.saveEditedTask(text, status, this.props.task.id);
      // .then(res => {
      //   if (res.status === 'error') {
      //     this.launchAlert(res.message);
      //   } else {
      //     this.updateTasks(res.message);
      //     this.props.closeModal();
      //   }
      // });
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
          {this.state.isError && <div>All fields must to be filled!</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.closeModal}>Close</Button>
          <Button onClick={this.saveTask}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

// const stateToProps = (state) => ({
//   tasks: state.tasks.tasks,
//   sortByStatus: state.tasks.sortByStatus,
//   sortByName: state.tasks.sortByEmail,
//   sortByEmail: state.tasks.sortByEmail,
//   countTasks: state.tasks.countTasks,
//   isLoggedIn: state.auth.isLoggedIn,
// });

const dispatchToProps = (dispatch) => ({
  showAlert: (msg) => dispatch(actions.showAlert(msg)),
  hideAlert: () => dispatch(actions.hideAlert()),
  addTask: (task) => dispatch(actions.addTask(task)),
});

export default connect(null, dispatchToProps)(EditTaskModal);
