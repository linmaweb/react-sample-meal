import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { MealsState } from "../../config";
import Title from "../Title/Title";
import Home from "../Home/Home";
import SingleMeal from "../SingleMeal/SingleMeal";
import "./App.css";

const App = () => {
  return (
    <>
      <Title type="Meal" />
      <MealsState>
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/meal/:id" component={SingleMeal} />
        </Router>
      </MealsState>
    </>
  );
};

export default App;
