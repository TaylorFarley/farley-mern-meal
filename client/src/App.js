import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CreateMeal from "./components/create-meal.component";
import EditMeal from "./components/edit-meal.component";
import MealList from "./components/meal-list.component";

function App() {
  return (<Router>
    <div className="App">
      <header className="App-header">
        <Navbar bg="dark" variant="dark">
          <Container>

            <Navbar.Brand>
            
              <Link to={"/create-meal"} className="nav-link">
              <img src="./img/icon.png" alt="farley-foodmelogo"></img>
                FoodPlan.io
              </Link>
            </Navbar.Brand>

            <Nav className="justify-content-end">
              <Nav>
                <Link to={"/create-meal"} className="nav-link">
                  Create meal
                </Link>
              </Nav>

              {/* <Nav>
                <Link to={"/edit-student/:id"} className="nav-link">
                  Edit Student
                </Link>
              </Nav> */}

              <Nav>
                <Link to={"/meal-list"} className="nav-link">
                meal List
                </Link>
              </Nav>
            </Nav>

          </Container>
        </Navbar>
      </header>

      <Container>
        <Row>
          <Col md={12}>
            <div className="wrapper">
              <Switch>
                <Route exact path='/' component={CreateMeal} />
                <Route path="/create-meal" component={CreateMeal} />
                <Route path="/edit-meal/:id" component={EditMeal} />
                <Route path="/meal-list" component={MealList} />
              </Switch>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </Router>);
}

export default App;