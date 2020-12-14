import React, { Component } from 'react'

class AddItem extends Component {
    state ={
        inputValue : ""
    }

    inputIsEmpty = () => {
        return this.state.inputValue === '';
    };

    handleChange = event => {
        this.setState({ inputValue: event.target.value });
    };


    render () {
        return (
        <form onSubmit={(event) => this.props.addItem(event)}>
            <input
              name="txtAddItem"
              type="text"
              placeholder="Enter New Item"
              value={this.state.inputValue}
              onChange={this.handleChange}
            />
            <button disabled={this.inputIsEmpty()}>Add</button>
          </form>
        )
    }

}

export default AddItem;