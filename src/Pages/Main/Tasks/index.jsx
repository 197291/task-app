import { connect } from 'react-redux';
import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Pagination from 'react-js-pagination';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import * as actions from 'Common/store/actions';
import Task from './Task';
import { ApiClient } from 'Common/api';
import EditTaskModal from 'Modals/EditTaskModal';

const mapSort = {
  status: 'sortByStatus',
  name: 'sortByName',
  email: 'sortByEmail',
};

class Tasks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editedTask: null,
      isOpenModal: false,
      activePage: 1,
    };
    this.openEditModal = this.openEditModal.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.sortByName = this.sortByName.bind(this);
    this.sortByEmail = this.sortByEmail.bind(this);
    this.sortByStatus = this.sortByStatus.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
  }

  openEditModal(task) {
    this.setState({
      editedTask: task,
      isOpenModal: true,
    });
  }

  closeEditModal() {
    this.setState({
      editedTask: null,
      isOpenModal: false,
    });
  }

  get tasks() {
    return this.props.tasks.map((task, i) => {
      return (
        <Task
          key={task.email + i}
          task={task}
          isAdminMode={this.props.isLoggedIn}
          openEditModal={this.openEditModal}
        />
      );
    });
  }

  handlePageChange(pageNumber) {
    ApiClient.tasks.getTasksByPage(pageNumber)
      .then(res => {
        this.props.setTasks(res);
        this.setState({
          activePage: pageNumber,
        });
      });
  }

  setSortDirectionByField(sortField, direction) {
    const { activePage } = this.state;
    ApiClient.tasks.setSortDirectionByField(sortField, direction, activePage)
      .then(res => {
        this.props.setTasks(res);
        this.props.setDirectionByName(mapSort[sortField], direction);
      });
  }

  sortPayload(sortValue) {
    return !sortValue || sortValue === 'desc' ? 'asc' : 'desc';
  }

  sortByName() {
    const { sortByName } = this.props;
    const payload = this.sortPayload(sortByName);
    this.setSortDirectionByField('name', payload);
  }

  sortByEmail() {
    const { sortByEmail } = this.props;
    const payload = this.sortPayload(sortByEmail);
    this.setSortDirectionByField('email', payload);
  }

  sortByStatus() {
    const { sortByStatus } = this.props;
    const payload = this.sortPayload(sortByStatus);
    this.setSortDirectionByField('status', payload);
  }

  render() {
    const { countTasks, isLoggedIn } = this.props;
    return (
      <>
        <Container style={{ marginTop: 20, marginBottom: 20 }}>
          <Row>
            <Col>
              <Button onClick={this.sortByName}> Sort by name </Button>
            </Col>
            <Col>
              <Button onClick={this.sortByEmail}> Sort by email </Button>
            </Col>
            {isLoggedIn &&
            <Col>
              <Button onClick={this.sortByStatus}> Sort by status </Button>
            </Col>}
          </Row>
        </Container>
        <ListGroup>
          {this.tasks}
        </ListGroup>
        <Pagination
          itemsCountPerPage={3}
          activePage={this.state.activePage}
          totalItemsCount={countTasks}
          onChange={this.handlePageChange}
          pageRangeDisplayed={3}
        />
        {this.state.isOpenModal &&
        <EditTaskModal task={this.state.editedTask} closeModal={this.closeEditModal} />}
      </>
    );
  }
}


const stateToProps = (state) => ({
  tasks: state.tasks.tasks,
  sortByStatus: state.tasks.sortByStatus,
  sortByName: state.tasks.sortByName,
  sortByEmail: state.tasks.sortByEmail,
  countTasks: state.tasks.countTasks,
  isLoggedIn: state.auth.isLoggedIn,
});

const dispatchToProps = (dispatch) => ({
  setTasks: (tasks) => dispatch(actions.setTasks(tasks)),
  setDirectionByName: (direction, name) => dispatch(actions.setDirectionByName(direction, name)),
});

export default connect(stateToProps, dispatchToProps)(Tasks);
