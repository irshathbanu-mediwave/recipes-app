import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Recipe.css";
const RecipeForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    steps: [{ id: uuidv4(), text: "" }],
  });
  const [recipes, setRecipes] = useState([]);
  const [submittedData, setSubmittedData] = useState(null);
  const [titleError, setTitleError] = useState("");
  const [imageUrlError, setImageUrlError] = useState("");
  const [stepsError, setStepsError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleStepChange = (e, stepId) => {
    const { value } = e.target;
    setFormData((prevState) => {
      const newSteps = prevState.steps.map((step) =>
        step.id === stepId ? { ...step, text: value } : step
      );
      return {
        ...prevState,
        steps: newSteps,
      };
    });
  };
  const handleAddStep = () => {
    setFormData((prevState) => ({
      ...prevState,
      steps: [...prevState.steps, { id: uuidv4(), text: "" }],
    }));
  };
  const validateForm = () => {
    let isValid = true;
    if (formData.title.trim() === "") {
      setTitleError("Title is required.");
      isValid = false;
    } else {
      setTitleError("");
    }
    if (formData.imageUrl.trim() === "") {
      setImageUrlError("Image URL is required.");
      isValid = false;
    } else {
      setImageUrlError("");
    }
    const stepsTextArray = formData.steps.map((step) => step.text.trim());
    if (stepsTextArray.some((text) => text === "")) {
      setStepsError("All steps must be filled.");
      isValid = false;
    } else {
      setStepsError("");
    }
    return isValid;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newRecipe = { ...formData, id: uuidv4() };
      setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
      setSubmittedData(newRecipe);
      setFormData({
        title: "",
        imageUrl: "",
        steps: [{ id: uuidv4(), text: "" }],
      });
    }
  };
  return (
    <>
      <div className="container">
        <div className="item">
          <h2>Create a Recipe</h2>
          <form className="total" onSubmit={handleSubmit}>
            <label>
              <h2>Enter Title</h2>
            </label>
            <input
              type="text"
              placeholder="Enter title"
              id="title"
              name="title"
              className="title-card"
              value={formData.title}
              onChange={handleChange}
            />
            <div className="error">{titleError}</div>
            <label>
              <h2>Enter Image url</h2>
            </label>
            <input
              type="text"
              placeholder="Enter url"
              id="image"
              name="imageUrl"
              className="title-card"
              value={formData.imageUrl}
              onChange={handleChange}
            />
            <div className="error">{imageUrlError}</div>
            <label>
              <h2>Enter Steps</h2>
            </label>
            {formData.steps.map((step, index) => (
              <div className="textarea-div" key={step.id}>
                <input
                  type="text"
                  placeholder="Enter step"
                  id={`step-${index}`}
                  value={step.text}
                  onChange={(e) => handleStepChange(e, step.id)}
                />
              </div>
            ))}
            <div className="error">{stepsError}</div>
            <div id="btn">
              <button
                type="button"
                className="add-step-button"
                onClick={handleAddStep}
              >
                Add step
              </button>
              <button type="submit" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mapping">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <h2>Recipe Cards</h2>
            <h3>{recipe.title}</h3>
            <p>Steps:</p>
            <ul>
              {recipe.steps.map((step) => (
                <li key={step.id}>{step.text}</li>
              ))}
            </ul>
            <div>
              <img src={recipe.imageUrl} alt="Recipe" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default RecipeForm;
