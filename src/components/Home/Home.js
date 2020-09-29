import React, { useContext } from "react";
import { MealsContext } from "../../context/MealsContext";
import Search from "../Search/Search";
import Meals from "../Meals/Meals";
import Pagination from "../Pagination/Pagination";
import "./Home.css";

const Home = () => {
  const { loading } = useContext(MealsContext);

  return (
    <section className="home">
      <div className="container">
        <Search />
      </div>

      {loading ? (
        <div className="loader"></div>
      ) : (
        <>
          <div className="container">
            <Meals />
          </div>
          <Pagination />
        </>
      )}
    </section>
  );
};

export default Home;
