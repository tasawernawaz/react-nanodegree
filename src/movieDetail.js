import React, { Component } from 'react';


class MovieDetail extends Component {

    render () {
       return (
        <li>
            <h2>{this.props.movieNmae}</h2>
                <p>Liked By:</p>
            <ul>
            {this.props.users.map(user => {
                return (
                <li>{user}</li>
                )
            })}

            </ul>
        </li>
       )
    }
}

export default MovieDetail;

