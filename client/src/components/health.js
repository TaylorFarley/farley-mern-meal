import React, { Component } from 'react';




export default class Health extends Component {

    render() {
        return (
         
         <button onChange={this.props.fn}> CLICK ME FOR HEALTHY WEEKS </button>
        );
    }
}