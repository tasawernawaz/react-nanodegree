import React, {Component} from 'react'
import { render } from 'react-dom';


class Game extends Component {


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
    }

    render () {
        return (
            <div>
            <div className="equation">
                <p className="text">{`${this.state.value1} + ${this.state.value2} + ${this.state.value3} = ${this.state.proposedAnswer}`}</p>
            </div>
            <button name="true" onClick={(event) => this.props.checkAnswer(event)}>True</button>
            <button name="false" onClick={(event) => this.props.checkAnswer(event)}>False</button>
            </div>
        );
    }
}




export default Game;