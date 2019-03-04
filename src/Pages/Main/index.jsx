import { connect } from 'react-redux';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { get } from 'lodash';

import * as actions from 'Common/store/actions';
import { ApiClient } from 'Common/api';
import Tasks from './Tasks';
import LoginButton from 'Common/Components/LogInButton';
import AddModal from 'Modals/AddModal';

import './index.scss';

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.showModalAddTask = this.showModalAddTask.bind(this);
    this.hideModalAddTask = this.hideModalAddTask.bind(this);
  }

  componentDidMount() {
    ApiClient.tasks.getAllTasks()
      .then(res => {
        this.props.setTasks(res);
      });
  }

  showModalAddTask() {
    this.setState({
      showModal: true,
    });
  }

  hideModalAddTask() {
    this.setState({
      showModal: false,
    });
  }

  render() {
    const { alertMsg } = this.props;
    return (
      <main>
        <header>
          <Container>
            <Row>
              <Col md={{ span: 2, offset: 10 }}>
                <LoginButton />
              </Col>
            </Row>
            <Row>
              <Col>
                <Button onClick={this.showModalAddTask}> Add Task </Button>
              </Col>
            </Row>
          </Container>
        </header>
        <Container>
          <Tasks />
        </Container>
        {this.state.showModal && <AddModal closeModal={this.hideModalAddTask} />}
        {this.props.showAlert &&
        <Alert variant="danger">
          {alertMsg.email && <div>[Email] { get(alertMsg, 'email') }</div>}
          {alertMsg.username && <div>[Username] { get(alertMsg, 'username') }</div>}
          {alertMsg.text && <div>[Text] { get(alertMsg, 'text') }</div>}
        </Alert>}
      </main>
    );
  }
}

const stateToProps = (state) => ({
  showAlert: state.tasks.showAlert,
  alertMsg: state.tasks.alertMsg,
});

const dispatchToProps = (dispatch) => ({
  setTasks: (tasks) => dispatch(actions.setTasks(tasks)),
});

export default connect(stateToProps, dispatchToProps)(Main);
