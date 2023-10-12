import React from "react";
import "./Recipe.css";
function Home({ recipes }) {
  return (
    <div className="home">
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index} className="recipe-card">
            <div>
              <img src={recipe.imageUrl} alt={recipe.name} />
              <h3>{recipe.name}</h3>
              <p>{recipe.steps}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
