import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Axios from "axios";
import UserContext from "./context/UserContext";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CreateMeal from "./components/create-meal.component";
import EditMeal from "./components/edit-meal.component";
import MealList from "./components/meal-list.component";


function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);


  let Logout = () => {
    console.log('hi')
    console.log(userData.user)
    setUserData({
      token: undefined,
      user: undefined,
      email: undefined
    });
    localStorage.setItem("auth-token", "");
  };
  return (<Router>
       <UserContext.Provider value={{ userData, setUserData }}>
    <div className="App">
      <header className="App-header">
      <Navbar bg="dark" variant="dark">
          <Container>

            <Navbar.Brand>
            
              <Link to={"/create-meal"} className="nav-link">
              <img src="./img/icon.png" alt="farley-foodmelogo"></img>
                FoodPlan
              </Link>
            </Navbar.Brand>

            <Nav className="justify-content-end">
              <Nav>
                <Link to={"/create-meal"} className="nav-link">
                  Create Meal
                </Link>
              </Nav>

              {/* <Nav>
                <Link to={"/edit-student/:id"} className="nav-link">
                  Edit Student
                </Link>
              </Nav> */}

              <Nav>
                <Link to={"/meal-list"} className="nav-link">
                Meal List
                </Link>
              </Nav>

              
              {userData.user ? (
             <Nav>
             <a href="#" onClick={Logout} className="nav-link">Logout</a>
            
           
           </Nav>
               ) : (
                <>
                <Nav>
                <Link to={"/Register"} className="nav-link">
                Register
                </Link>
              </Nav>
              
              <Nav>
                <Link to={"/Login"} className="nav-link">
                Login
                </Link>
              </Nav>
        </>
      )}
              

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
                <Route path="/Register" component={Register} />
                <Route path="/Login" component={Login} />
             
                
              </Switch>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    </UserContext.Provider>  
  </Router>);
}

export default App;