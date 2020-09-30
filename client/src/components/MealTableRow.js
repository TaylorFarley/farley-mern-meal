import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';




export default class MealTableRow extends Component {
    constructor(props) {
        super(props);
        this.deleteMeal = this.deleteMeal.bind(this);
    }

    deleteMeal() {
        axios.delete('meals/delete-meal/' + this.props.obj._id)
            .then((res) => {
                console.log('Meal successfully deleted!')
              
            }).catch((error) => {
                console.log(error)
            })
    }



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
                    <Button onClick={this.deleteMeal} size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
        );
    }
}