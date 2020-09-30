import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class EditMeal extends Component {

  constructor(props) {
    super(props)

    this.onChangeMealName = this.onChangeMealName.bind(this);
    this.onChangeMealIngredients = this.onChangeMealIngredients.bind(this);
    this.onChangeMealHealthy = this.onChangeMealHealthy.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      name: '',
      ingredients: '',
      healthy: false
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/meals/edit-Meal/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          name: res.data.name,
          ingredients: res.data.ingredients,
          healthy: res.data.healthy
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeMealName(e) {
    this.setState({ name: e.target.value })
  }

  onChangeMealIngredients(e) {
    this.setState({ ingredients: e.target.value })
  }

  onChangeMealHealthy(e) {
      this.setState({healthy: !this.state.healthy})
  }

  onSubmit(e) {
    e.preventDefault()

    const MealObject = {
      name: this.state.name,
      ingredients: this.state.ingredients,
      healthy: this.state.healthy
    };

    axios.put('http://localhost:4000/meals/update-meal/' + this.props.match.params.id, MealObject)
      .then((res) => {
        console.log(res.data)
        console.log('Meal successfully updated')
      }).catch((error) => {
        console.log(error)
      })

    // Redirect to Meal List 
    this.props.history.push('/meal-list')
  }


  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={this.state.name} onChange={this.onChangeMealName} />
        </Form.Group>

        <Form.Group controlId="ingredients">
          <Form.Label>Ingredients</Form.Label>
          <Form.Control type="text" value={this.state.ingredients} onChange={this.onChangeMealIngredients} />
        </Form.Group>

        <Form.Group controlId="healthy">
          <Form.Label>Healthy</Form.Label>
          <Form.Control type="checkbox"  checked={this.state.healthy} onChange={this.onChangeMealHealthy}/>
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Update Meal
        </Button>
      </Form>
    </div>);
  }
}