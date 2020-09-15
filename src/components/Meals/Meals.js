import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MealsContext } from "../../config";
import "./Meals.css";

const Meals = () => {
  const { search, recipes, error, loading } = useContext(MealsContext);
  return (
    <>
      {error && (
        <h2 className="errorMsg">
          {search
            ? `Sorry, we couldn't find anything about ${search}.`
            : `Sorry, we couldn't find what you were looking for.`}
        </h2>
      )}
      {recipes &&
        !error &&
        !loading &&
        recipes.map((recipe, index) => (
          <div key={index} className="recipe">
            <a
              href={recipe.recipe.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="recipeBg"
                style={{
                  background: `#111 url(${recipe.recipe.image}) no-repeat center/cover`,
                }}
              ></div>
            </a>

            <div className="recipeInfo">
              <p>{recipe.recipe.label}</p>
              <ul>
                <li>
                  <i className="fas fa-pizza-slice"></i>
                  {Math.floor(recipe.recipe.calories)} calories
                </li>

                {recipe.recipe.dietLabels[0] && (
                  <li>
                    <i className="fas fa-pizza-slice"></i>
                    {recipe.recipe.dietLabels[0]}
                  </li>
                )}

                {recipe.recipe.healthLabels && (
                  <li>
                    <i className="fas fa-pizza-slice"></i>
                    {recipe.recipe.healthLabels.join(", ")}
                  </li>
                )}
              </ul>
              <Link to={`/meal/${recipe.recipe.label}`}>View More</Link>
            </div>
          </div>
        ))}
    </>
  );
};

export default Meals;
