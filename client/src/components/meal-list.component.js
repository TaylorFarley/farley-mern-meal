import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import MealTableRow from './MealTableRow';


export default class MealList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      meals: [],
      checkme: false,
      buttonValue: true
    };
    this.healthyHandler = this.healthyHandler.bind(this)
  
  }




  componentDidMount() {
    axios.get('http://localhost:4000/meals/')
      .then(res => {         
          function shuffle(array) {
            return array.sort(() => Math.random() - 0.5);
           }               
           let arr = res.data;           
           let xx = shuffle(arr)
          this.setState({
          meals: xx       
        });
      })
      .catch((error) => {
        console.log(error);
      })

  }
 
  DataTable() {

    const dates = ['m','t','w','th','f','s','sn']

    if(this.state.checkme)
    {
    return this.state.meals.map((res, i) => { 
      if (this.state.checkme==res.healthy)
      return <MealTableRow day={dates[i]} obj={res} key={i} health={JSON.stringify(res.healthy)}/>;
    });
    }
    else
    {
      return this.state.meals.map((res, i) => { 
             return <MealTableRow day={dates[i]} obj={res} key={i} health={JSON.stringify(res.healthy)}/>;
      }); 
    }
  }

  healthyHandler(){
    this.setState(prevState =>{
      return{
           ...prevState,
           checkme : !prevState.checkme,
           buttonValue: !prevState.buttonValue
      }
   })
}



  render() {
    return (

    <div className="table-wrapper">
 <button onClick={this.healthyHandler}>{this.state.buttonValue? 'Show Me Healthy': 'Show Everything Else'}</button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Ingredients</th>
            <th>Healthy</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>

      </Table>
    
    </div>);
  }
}