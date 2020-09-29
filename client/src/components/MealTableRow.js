import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


export default class MealTableRow extends Component {
    
    render() {
        return (
         
            <tr>
                <td>{this.props.day}</td>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.ingredients}</td>
                <td>{this.props.health}</td>
                <td>
                    <Link className="edit-link" to={"/edit-meal/" + this.props.obj._id}>
                        Edit
                    </Link>
                    <Button size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
        );
    }
}