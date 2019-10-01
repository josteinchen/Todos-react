import React, { Component } from "react";
import TodoBanner from "./TodoBanner";
import TodoCreator from "./TodoCreator";
import TodoRow from "./TodoRow";
import VisibilityControl from "./VisibilityControl";

class App extends Component {
  state = {
    userName: "Adam",
    todoItems: [
      { action: "Buy Flowers", done: false },
      { action: "Get Shoes", done: false },
      { action: "Collect Tickets", done: true },
      { action: "Call Joe", done: false }
    ],
    showCompleted: true
  };

  componentDidMount = () => {
    let data = localStorage.getItem("todos");
    this.setState(
      data != null
        ? JSON.parse(data)
        : {
            userName: "Adam",
            todoItems: [
              { action: "Buy Flowers", done: false },
              { action: "Get Shoes", done: false },
              { action: "Collect Tickets", done: true },
              { action: "Call Joe", done: false }
            ],
            showCompleted: true
          }
    );
  };

  createNewTodo = newItemText => {
    if (!this.state.todoItems.find(item => item.action === newItemText)) {
      this.setState(
        {
          todoItems: [
            ...this.state.todoItems,
            { action: newItemText, done: false }
          ]
        },
        () => localStorage.setItem("todos", JSON.stringify(this.state))
      );
    }
  };

  changeStateData = () => {
    this.setState({
      userName: this.state.userName === "Adam" ? "Bob" : "Adam"
    });
  };

  toggleTodo = todo =>
    this.setState(
      {
        todoItems: this.state.todoItems.map(item =>
          item.action === todo.action ? { ...item, done: !item.done } : item
        )
      },
      () => localStorage.setItem("todos", JSON.stringify(this.state))
    );

  todoTableRows = doneValue =>
    this.state.todoItems
      .filter(item => item.done === doneValue)
      .map(item => (
        <TodoRow key={item.action} item={item} callback={this.toggleTodo} />
      ));
  render() {
    return (
      <div>
        <TodoBanner name={this.state.userName} tasks={this.state.todoItems} />
        <div className='container-fluid'>
          <TodoCreator callback={this.createNewTodo} />
          <table className='table table-striped table-bordered'>
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>{this.todoTableRows(false)}</tbody>
          </table>
          <div className='bg-secondary text-white text-center p-2'>
            <VisibilityControl
              description='Completed Tasks'
              isChecked={this.state.showCompleted}
              callback={checked =>
                this.setState({ showCompleted: checked }, () =>
                  localStorage.setItem("todos", JSON.stringify(this.state))
                )
              }
            />
          </div>
          {this.state.showCompleted && (
            <table className='table table-striped table-bordered'>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Done</th>
                </tr>
              </thead>
              <tbody>{this.todoTableRows(true)}</tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}
export default App;
