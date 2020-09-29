import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import MealTableRow from './MealTableRow';
import Health from './health';

export default class MealList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      meals: []
    };
    this.healthyHandler = this.healthyHandler.bind(this)
  }

  componentDidMount() {
    axios.get('http://localhost:4000/meals/')
      .then(res => {
          //randomize here
          function shuffle(array) {
            return array.sort(() => Math.random() - 0.5);
           }
           
           let arr = res.data;           
           let xx = shuffle(arr)
      
           //
          
          
          this.setState({
          meals: xx       
        });
      })
      .catch((error) => {
        console.log(error);
      })
   
  }

  DataTable() {
    // console.log(this.state.meals)
    const dates = ['m','t','w','th','f','s','sn']
    return this.state.meals.map((res, i) => { 
     
      return <MealTableRow day={dates[i]} obj={res} key={i} health={JSON.stringify(res.healthy)}/>;
    });
  }


  healthyHandler() {
    const dates = ['m','t','w','th','f','s','sn']
    return this.state.meals.map((res, i) => { 
      if(res.healthy)    
      return <MealTableRow day={dates[i]} obj={res} key={i} health={JSON.stringify(res.healthy)}/>;
    });
}



  render() {
    return (
    
    <div className="table-wrapper">
     
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
     <button onClick={this.healthyHandler}>CLICK ME</button>
    </div>);
  }
}