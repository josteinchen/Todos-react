import React, { Component } from "react";

export default class TodoCreator extends Component {
  state = {
    newItemText: ""
  };

  updateNewTextValue = event => {
    this.setState({
      newItemText: event.target.value
    });
  };

  creatNewTodo = () => {
    this.props.callback(this.state.newItemText);
    this.setState({
      newItemText: ""
    });
  };

  render() {
    return (
      <div className='my-1'>
        <input
          type='text'
          className='form-control'
          value={this.state.newItemText}
          onChange={this.updateNewTextValue}
        />
        <button className='btn btn-primary mt-1' onClick={this.creatNewTodo}>
          Add
        </button>
      </div>
    );
  }
}
