import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App/App.css';

class FruitSelector extends Component {

    // Currying that returns a function
    addFruit = (fruitName) => (event) => {
        this.props.dispatch({
            type: 'CREATE_FRUIT',
            payload: { fruit: fruitName }
        });
    }

    getFruit() {
        this.props.dispatch({
            type: 'FETCH_FRUIT'
        });
    }

    // Displays the fruit selection buttons on the DOM
    render() {
        return (
            <div>
                <button className='fruitBtn' onClick={this.addFruit('Apple')}>Add Apple</button>
                <button className='fruitBtn' onClick={this.addFruit('Orange')}>Add Orange</button>
                <button className='fruitBtn' onClick={this.addFruit('Watermelon')}>Add Watermellon</button>
                <button className='fruitBtn' onClick={this.addFruit('Grapefruit')}>Add Grapefruit</button>
            </div>
        )
    }
}

export default connect()(FruitSelector);