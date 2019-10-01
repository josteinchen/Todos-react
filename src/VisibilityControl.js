import React, { Component } from "react";

export default class VisibilityControl extends Component {
  render() {
    return (
      <div className='form-check'>
        <input
          type='checkbox'
          className='form-checked-input'
          checked={this.props.isChecked}
          onChange={e => this.props.callback(e.target.checked)}
        />
        <label className='form-check-label'>
          Show {this.props.description}
        </label>
      </div>
    );
  }
}
