import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { URL_CORS, URL_BASE, URL_API, SEARCH_DEFAULT } from "../../config";
import { MealsContext } from "../..//context/MealsContext";
import Title from "../Title/Title";
import Home from "../Home/Home";
import SingleMeal from "../SingleMeal/SingleMeal";
import "./App.css";

const App = () => {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [first, setFirst] = useState(SEARCH_DEFAULT.from);
  const [last, setLast] = useState(SEARCH_DEFAULT.to);
  const [loading, setLoading] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [error, setError] = useState(false);

  const URL_DEFAULT = `${URL_CORS}${URL_BASE}${SEARCH_DEFAULT.default}&${URL_API}&from=${SEARCH_DEFAULT.from}&to=${SEARCH_DEFAULT.to}`;
  const URL_SEARCH = `${URL_CORS}${URL_BASE}${search}&${URL_API}&from=${first}&to=${last}`;

  const searchDefault = () => {
    setLoading(true);
    fetch(URL_DEFAULT)
      .then((res) => {
        if (!res.ok) {
          setError(true);
          throw Error(res.statusText);
        }
        return res;
      })
      .then((res) => res.json())
      .then((data) => setRecipes(data.hits))
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
        setError(true);
        return;
      });
    window.scrollTo(0, 0);
    setLoading(false);
  };

  const searchRecipes = () => {
    setLoading(true);
    setError(false);
    fetch(URL_SEARCH)
      .then((res) => {
        if (!res.ok) {
          setError(true);
          throw Error(res.statusText);
        }
        return res;
      })
      .then((res) => res.json())
      .then((data) => {
        if (search.trim() !== "" && !data.more) {
          setLoading(false);
          setError(true);
          return;
        }
        return setRecipes(data.hits);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
        setError(true);
        return;
      });
    window.scrollTo(0, 0);
    setLoading(false);
  };

  const getRecipes = (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      return;
    }
    setIsHidden(true);
    searchRecipes();
  };

  const handlePagination = (direction) => {
    if (direction === "next") {
      setFirst((prevRecipe) => prevRecipe + SEARCH_DEFAULT.to);
      setLast((prevRecipe) => prevRecipe + SEARCH_DEFAULT.to);
      return;
    }
    if (direction === "previous" && first !== 0) {
      setFirst((prevRecipe) => prevRecipe - SEARCH_DEFAULT.to);
      setLast((prevRecipe) => prevRecipe - SEARCH_DEFAULT.to);
    }
  };

  useEffect(() => {
    searchDefault();
  }, []);

  useEffect(() => {
    searchRecipes();
  }, [first, last]);

  return (
    <MealsContext.Provider
      value={{
        recipes,
        setRecipes,
        getRecipes,
        search,
        setSearch,
        isHidden,
        error,
        loading,
        handlePagination,
      }}
    >
      <Title type="Meal" />
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/meal/:id" component={SingleMeal} />
      </Router>
    </MealsContext.Provider>
  );
};

export default App;
