import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App/App.css';

class FruitItem extends Component {
    removeItem = () => {
        this.props.dispatch({
            type: 'DELETE_FRUIT',
            payload: this.props.basketItem.id
        });
    }

    getFruit() {
        this.props.dispatch({
            type: 'FETCH_FRUIT'
        });
    }

    render() {
        return (
            <li>
                <span className='listItem'>{this.props.basketItem.fruit}</span>
                <button className='listItem' onClick={this.removeItem}>Remove</button>
            </li>
        )
    }
}

export default connect()(FruitItem);