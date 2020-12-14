import React from 'react';

import './App.css';

import AddItem from './AddItems';
import Header from './Header';
import RenderItems from './ListItems';
import DeleteItem from './DeleteItem';

class App extends React.Component {
  constructor (props) {
    super(props)
    this.addItem = this.addItem.bind(this);
  }

  state = {
    items: [],
  };


  deleteLastItem = event => {
    this.setState(prevState => ({ items: this.state.items.slice(0, -1) }));
  };


  noItemsFound = () => {
    return this.state.items.length === 0;
  };

  addItem = event => {
    event.preventDefault();
    this.setState(oldState => ({
    items: [...oldState.items, event.target.txtAddItem.value],
    }));
  };

  render() {
    return (
      <div className="App">
        <Header />
        <h2>Shopping List</h2>
        <AddItem addItem={this.addItem}/>
        <DeleteItem noItemsFound={this.noItemsFound} deleteLastItem={this.deleteLastItem}/>
        <RenderItems items={this.state.items}/>
      </div>
    );
  }
}

export default App;
