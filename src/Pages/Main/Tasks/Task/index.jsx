import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

export default class Task extends React.Component {

  constructor(props) {
    super(props);
    this.openEditModal = this.openEditModal.bind(this);
  }

  openEditModal() {
    this.props.openEditModal(this.props.task);
  }

  get renderContent() {
    const { isAdminMode, task } = this.props;

    return (
      <div>
        <div>
          <label>
            <input readOnly checked={!!task.status} type="checkbox" />
            Task is done
          </label>
        </div>
        <div>[Username]: {task.username}</div>
        <div>[Email]: {task.email}</div>
        <div>[Text]: {task.text}</div>
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
