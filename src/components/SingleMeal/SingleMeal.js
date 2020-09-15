import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { MealsContext } from "../../config";
import "./SingleMeal.css";

const SingleMeal = () => {
  const { recipes } = useContext(MealsContext);
  const { id } = useParams();

  return (
    <section className="singleMeal">
      <div className="container">
        {recipes &&
          recipes
            .filter((recipeData) => recipeData.recipe.label === id)
            .map((recipeData, index) => (
              <div key={index} className="singleMealCard">
                <div
                  className="singleMealBg"
                  style={{
                    background: `url(${recipeData.recipe.image}) no-repeat center/cover`,
                  }}
                ></div>
                <div className="singleMealInfo">
                  <h2>{recipeData.recipe.label}</h2>
                  <ul>
                    {recipeData.recipe.ingredientLines.map(
                      (ingredient, index) => (
                        <li key={index}>
                          <i className="fas fa-pizza-slice"></i>
                          {ingredient}
                        </li>
                      )
                    )}
                  </ul>
                  <Link to={`/`} className="btn">
                    <button>Go Back</button>
                  </Link>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
};

export default SingleMeal;
