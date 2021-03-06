import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
export default class CreateMeal extends Component {
constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeMealName = this.onChangeMealName.bind(this);
    this.onChangeMealIngredients = this.onChangeMealIngredients.bind(this);
    this.onChangeMealHealthy = this.onChangeMealHealthy.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.ChangeStatus = this.ChangeStatus.bind(this)
    // Setting up state
    this.state = {
      id: undefined,
      name: '',
      ingredients: '',
      healthy: false,
      status: false,
      token: undefined
    }
  }

  componentDidMount(){
    let token = localStorage.getItem("auth-token");
    this.setState({
      token: token
    })
    axios.post('users/tokenIsValid',null,
    { headers: { "x-auth-token": token } }
    )
    .then(res => {    
      if (res.data) {
        axios.get("users/", {
          headers: { "x-auth-token": token },
        })
        .then(userres =>{
          this.setState({
            id: userres.data.id
          })
        
        })      
      }
    })
  }

  onChangeMealName(e) {
    this.setState({name: e.target.value})
  }

  onChangeMealIngredients(e) {
    this.setState({ingredients: e.target.value})
  }

  onChangeMealHealthy(e) {
    this.setState({healthy: !this.state.healthy})    
  }

  ChangeStatus(){
    this.setState({status: false})
  }
 
  onSubmit(e) {
    e.preventDefault()
    console.log('this is my id!!!' + this.state.id)
    console.log(`Meal successfully created!`);
    console.log(`Name: ${this.state.name}`);
    console.log(`Ingredients: ${this.state.ingredients}`);
    console.log(`IsHealthy: ${this.state.healthy}`);

    const mealObject = {
        id: this.state.id,
        name: this.state.name,
        ingredients: this.state.ingredients,
        healthy: this.state.healthy
      };
      axios.post('meals/create-meal', mealObject)
        .then(res => console.log(res.data));




   
    this.setState(prevState =>{
      return{
           ...prevState,
           name: '', 
           ingredients: '',
           healthy: false,
           status: !prevState.status
      }
   })



  }

  render() {
    return (
    
    <div className="form-wrapper">
      {this.state.id&&this.state.token ? (
         <Form onSubmit={this.onSubmit}>
         <Form.Group controlId="Name">
           <Form.Label>Name</Form.Label>
           <Form.Control autoComplete="off" type="text" value={this.state.name} onChange={this.onChangeMealName} onClick={this.ChangeStatus}/>
         </Form.Group>
 
         <Form.Group controlId="Ingredients">
           <Form.Label>Ingredients</Form.Label>
           <Form.Control autoComplete="off" type="text" value={this.state.ingredients} onChange={this.onChangeMealIngredients}/>
         </Form.Group>
 
         <Form.Group controlId="Name">
           <Form.Label>IsHealthy</Form.Label>
           <Form.Control type="checkbox"  checked={this.state.healthy} onChange={this.onChangeMealHealthy}/>
         </Form.Group>
 
         <Button variant="danger" size="lg" block="block" type="submit">
           Create Meal
         </Button>
         {this.state.status? 'Added' : ''}
       </Form>
      ) : (
        <>
          Please login
        </>
      )}
     
    </div>);
  }
}

