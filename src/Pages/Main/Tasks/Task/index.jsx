import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

export default class Task extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isDone: !!props.task.status,
    };
    this.openEditModal = this.openEditModal.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
  }

  openEditModal() {
    this.props.openEditModal(this.props.task);
  }

  handleChangeStatus(e) {
    e.preventDefault();
    console.log(e.checked);
  }

  get renderContent() {
    const { isAdminMode, task } = this.props;

    return (
      <div>
        <div>
          <label>
            <input readOnly checked={this.state.isDone} type="checkbox" />
            Task is done
          </label>
        </div>
        <div>{task.username}</div>
        <div>{task.email}</div>
        <div>{task.text}</div>
        {isAdminMode && <div><Button onClick={this.openEditModal}>Edit task</Button></div>}
      </div>
    );
  }

  render() {
    return (
      <ListGroup.Item>
        {this.renderContent}
      </ListGroup.Item>
    );
  }
}
