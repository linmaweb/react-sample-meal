import React, { useContext } from "react";
import { MealsContext } from "../../config";
import "./Search.css";

const Search = () => {
  const { search, setSearch, getRecipes } = useContext(MealsContext);
  return (
    <div className="formWrapper">
      <form onSubmit={getRecipes}>
        <div className="formContainer">
          <input
            type="text"
            required
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your meal"
          />
          <button className="btn">Search</button>
        </div>
      </form>
    </div>
  );
};

export default Search;
