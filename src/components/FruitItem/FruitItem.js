import React, { Component } from 'react';
import { connect } from 'react-redux';

class FruitItem extends Component {
    removeItem = () => {
        this.props.dispatch({
            type: 'DELETE_FRUIT',
            payload: this.props.basketItem.id
        });
        // axios({
        //     method: 'DELETE',
        //     url: `/fruit/${this.props.basketItem.id}`
        // }).then((response) => {
        //     this.getFruit();
        // }).catch((error) => {
        //     console.log(error);
        //     alert('Unable to delete item');
        // });  
    }

    getFruit() {
        this.props.dispatch({
            type: 'FETCH_FRUIT'
        });
    }

    render() {
        return (
            <li>
                <span>{this.props.basketItem.fruit}</span>
                <button onClick={this.removeItem}>Remove</button>
            </li>
        )
    }
}

export default connect()(FruitItem);