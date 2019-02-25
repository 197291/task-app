import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default class LoginModal extends React.Component {

  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      login: null,
      pass: null,
      isError: false,
    };
  }

  signIn() {
    const { login, pass } = this.state;

    if (login === 'admin' && pass === '123') {
      this.props.handleSuccessSignIn();
    } else {
      this.setState({
        isError: true,
      });
    }
  }

  handlePass(e) {
    this.setState({ pass: e.target.value });
  }

  handleLogin(e) {
    this.setState({ login: e.target.value });
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
            Sign In
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control onChange={this.handleLogin} type="text" placeholder="Enter username" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={this.handlePass} type="password" placeholder="Password" />
            </Form.Group>
          </Form>
          {this.state.isError && <div>Try another credentials!</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.closeModal}>Close</Button>
          <Button onClick={this.signIn}>Sign In</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
