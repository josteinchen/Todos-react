import React, { Component } from "react";

export default class TodoBanner extends Component {
  render() {
    return (
      <div>
        <h4 className='bg-primary text-white text-center p-2'>
          {this.props.name}'s To Do List' (
          {this.props.tasks.filter(t => !t.done).length} items to do)
        </h4>
      </div>
    );
  }
}
