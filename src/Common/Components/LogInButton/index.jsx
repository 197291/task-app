import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import LoginModal from 'Modals/LogInModal';

import * as actions from 'Common/store/actions';

import './index.scss';

class LoginButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.showLoginModal = this.showLoginModal.bind(this);
    this.hideLoginModal = this.hideLoginModal.bind(this);
    this.handleSuccessSignIn = this.handleSuccessSignIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  hideLoginModal() {
    this.setState({
      isOpen: false,
    });
  }

  showLoginModal() {
    this.setState({
      isOpen: true,
    });
  }

  handleSuccessSignIn() {
    this.props.setAdminUser();
    this.hideLoginModal();
  }

  logOut() {
    this.props.unSetAdminUser();
  }

  render() {
    const { user } = this.props;
    return (
      <div className="LoginButton">
        {user && <div className="LoginButton-name">Hello, {user.name}</div>}
        <Button onClick={!user ? this.showLoginModal : this.logOut}>{user ? 'Sign Out' : 'Sign In'}</Button>
        { this.state.isOpen && <LoginModal closeModal={this.hideLoginModal} handleSuccessSignIn={this.handleSuccessSignIn} />}
      </div>
    );
  }
}

const stateToProps = (state) => ({
  user: state.auth.user,
});

const dispatchToProps = (dispatch) => ({
  setAdminUser: () => dispatch(actions.setAdminUser()),
  unSetAdminUser: () => dispatch(actions.unSetAdminUser()),
});

export default connect(stateToProps, dispatchToProps)(LoginButton);
