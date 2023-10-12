import React, { useState } from "react";
import "./Addrecipe.css";

function AddRecipe({ addRecipe }) {
  const [recipeData, setRecipeData] = useState({
    imageUrl: "",
    name: "",
    steps: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({ ...recipeData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addRecipe({ ...recipeData });
    setRecipeData({ imageUrl: "", name: "", steps: "" });
  };

  return (
    <div className="add-recipe">
      <h2>Add Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Image URL:
          <input
            type="text"
            name="imageUrl"
            value={recipeData.imageUrl}
            onChange={handleChange}
          />
        </label>
        <label>
          Recipe Name:
          <input
            type="text"
            name="name"
            value={recipeData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Recipe Steps:
          <input
            type="text"
            name="name"
            value={recipeData.name}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddRecipe;
