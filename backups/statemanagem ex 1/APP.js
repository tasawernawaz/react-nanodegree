import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Game from './Game'


class App extends Component {

    constructor(props) {
        super(props);
        this.checkAnswer = this.checkAnswer.bind(this);
    }

    getrandomValue = () => Math.floor(Math.random() * 100);

    makeNewQuestionArray = () => {
        const value1 = this.getrandomValue();
        const value2 = this.getrandomValue();
        const value3 = this.getrandomValue();
        const proposedAnswer = Math.floor(Math.random() * 3) + value1 + value2 + value3;
        return [value1, value2, value3, proposedAnswer];
    }

    newQuestionArray = this.makeNewQuestionArray();

    state = {
        value1: this.newQuestionArray[0],
        value2: this.newQuestionArray[1],
        value3: this.newQuestionArray[2],
        proposedAnswer: this.newQuestionArray[3],
        numQuestions: 0,
        numCorrect: 0
    }

    checkAnswer = (event) => {
        const answer = event.target.name;
        const newQuestionArray = this.makeNewQuestionArray()
        const actualAnswer = this.state.value1 + this.state.value2 + this.state.value3;

        this.setState((currentState) => ({
            numCorrect: ((answer === "true" &&  currentState.proposedAnswer === actualAnswer) ||
                (answer === "false" &&  currentState.proposedAnswer !== actualAnswer)) ? currentState.numCorrect + 1 : currentState.numCorrect,
            numQuestions: currentState.numQuestions + 1,
            value1: newQuestionArray[0],
            value2: newQuestionArray[1],
            value3: newQuestionArray[2],
            proposedAnswer: newQuestionArray[3]
        })
      )
    }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ReactND - Coding Practice</h1>
        </header>
        <div className="game">
          <h2>Mental Math</h2>
          <Game checkAnswer={this.checkAnswer}/>
          <p className="text">
            Your Score: {this.state.numCorrect}/{this.state.numQuestions}
          </p>
        </div>
      </div>
    );
  }
}

export default App;
