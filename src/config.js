/***********************************************************/
/* need a valid app id and key from https://api.edamam.com */
/***********************************************************/

import React, { useState, useEffect, createContext } from "react";

export const MealsContext = createContext();

export const MealsState = ({ children }) => {
  const APP_ID = ""; // need a valid app id
  const APP_KEY = ""; // need a valid app key
  const URL_CORS = `https://cors-anywhere.herokuapp.com/`;
  const URL_BASE = `https://api.edamam.com/search?q=`;
  const URL_API = `app_id=${APP_ID}&app_key=${APP_KEY}`;
  const SEARCH_DEFAULT = {
    default: "salad",
    from: 0,
    to: 60,
  };

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
        if (APP_ID === "" || APP_KEY === "") {
          alert("Require a valid API ID and API Key");
          setLoading(false);
          setError(true);
          return;
        } else {
          alert(error.message);
          setLoading(false);
          setError(true);
          return;
        }
      });
    window.scrollTo(0, 0);
    setLoading(false);
  };

  const searchRecipes = async () => {
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
        alert(error.message);
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
      {children}
    </MealsContext.Provider>
  );
};
