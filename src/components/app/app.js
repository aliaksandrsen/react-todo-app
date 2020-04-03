import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch'),
    ],
    term: '',
    filter: 'all', // active, all, done
  }

  createTodoItem(label) {
    return {
      label: `${label}`, important: false, id: this.maxId++, done: false,
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newTodoData = [...todoData].filter((item) => item.id !== id);

      return {
        todoData: newTodoData,
      };
    });
  };

  addItem = (text) => {
    // without empty items
    if (text === '') return;
    this.setState(({ todoData }) => {
      const newItem = this.createTodoItem(`${text}`);
      const newTodoData = [...todoData, newItem];
      return {
        todoData: newTodoData,
      };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      const newTodoData = [...todoData];
      newTodoData.map((item) => {
        if (item.id === id) {
          item.important = !item.important;
          return item;
        }
        return item;
      })
      return {
        todoData: newTodoData,
      }
    })
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const newTodoData = [...todoData];
      newTodoData.map((item) => {
        if (item.id === id) {
          item.done = !item.done;
          return item;
        }
        return item;
      })
      return {
        todoData: newTodoData,
      }
    })
  };

  onSearchChange = (text) => {
    this.setState({
      term: text,
    });
  }

  onFillterChange = (filter) => {
    this.setState({
      filter: filter,
    });
  }

  search(items, term) {
    const newItems = items.filter((item) => {
      if (item.label.toLowerCase().indexOf(term.toLowerCase()) !== -1) return true;
      return null;
    });

    return newItems;
  }

  filter(items, filter) {
    let newItems;

    if (filter === 'active') {
      newItems = items.filter((item) => {
        if (!item.done) return true;
        return false;
      });
      return newItems;
    }

    if (filter === 'done') {
      newItems = items.filter((item) => {
        if (item.done) return true;
        return false;
      });
      return newItems;
    }

    return items;
  }

  render() {
    const { todoData, term, filter } = this.state;
    let newTodoData = this.search(todoData, term);

    newTodoData = this.filter(newTodoData, filter);

    const done = todoData.reduce((acc, item) => {
      if (item.done) acc++;
      return acc;
    }, 0);

    const toDo = todoData.length - done;

    return (
      <div className="todo-app" >
        <AppHeader toDo={toDo} done={done} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter
            onFillterChange={this.onFillterChange}
            filter={filter}
          />
        </div>
        <TodoList todos={newTodoData}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm
          onAddItem={this.addItem} />
      </div>
    );
  };
}
