import React, { useEffect, useState } from 'react';
import './recipePage.css'
import './recipePreview.css'

export default function RecipePage({name, desc, image, ingredients, instructions}) {
  const [newIngredient, setNewIngredient] = useState('');
  const [submitIng, setSubmitIng] = useState('');
  useEffect(() => {
    if (submitIng === '') return;
    
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({newIngredient: submitIng})
    };  
    const updateIngredients = async () => {
        fetch(`http://localhost:3001/api/recipe/${name}/ingredient`, requestOptions)
        .then(console.log("Success"))
        .catch(err => console.log(err));
      }
    updateIngredients();
  },[submitIng])

  const [newInstruction, setNewInstruction] = useState('');
  const [submitIns, setSubmitIns] = useState('');
  useEffect(() => {
    if (submitIns === '') return;
    
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({newInstruction: submitIns})
    };  
    const updateInstructions = async () => {
        fetch(`http://localhost:3001/api/recipe/${name}/instruction`, requestOptions)
        .then(console.log("Success"))
        .catch(err => console.log(err));
      }
    updateInstructions();
  },[submitIns])

  let addIngredient = () => {
    let ul = document.getElementById("ingredients-list");
    let li = document.createElement("li");
    let ingredient = document.getElementById("new-ingredient").value;
    li.appendChild(document.createTextNode(ingredient));
    ul.appendChild(li);
    setSubmitIng(newIngredient)
}

  let addInstruction = () => {
      let ol = document.getElementById("instructions-list");
      let li = document.createElement("li");
      let instruction = document.getElementById("new-instruction").value;
      li.appendChild(document.createTextNode(instruction));
      ol.appendChild(li);
      setSubmitIns(newInstruction)
  }

  return (
  <div className="recipe">
      
      <h2 id="recipeName">{name}</h2>
      <h3>Description</h3>
      <div className="description">
          <p id="recipe-description">
              {desc}
          </p>
          <div className="menu-image"><img src={image} id="recipe-img"/></div>
      </div>
      <hr></hr>
      <h3>Ingredients</h3>
      
      <p>Note: There are no measurements on purpose. All ingredients are to your discretion and a lot of taste testing!</p>
      <ul id="ingredients-list">
        {ingredients.map(function(name, index) {
            return <li key={index}>{name}</li>;
        })}
      </ul>
      <div id="form">
        <h4>Add an Ingredient</h4>
        <label>Ingredient: </label>
        <input id="new-ingredient" placeholder="Bok Choi" value={newIngredient} onChange={ (e) => {
            setNewIngredient(e.target.value);
        }
        }/>
        <br />
        <button onClick={addIngredient}>Add Ingredient</button>
      </div>
      
      <hr></hr>
      <h3>Instructions</h3>
      
      <ol id="instructions-list">
        {instructions.map(function(name, index) {
            return <li key={index}>{name}</li>;
        })}
      </ol>
      
      <br></br>
      <div id="form">
        <h4>Add an Instruction</h4>
        <label>Instruction: </label>
        <textarea id="new-instruction" placeholder="Plate and serve" value={newInstruction} onChange= {(e) => {
                setNewInstruction(e.target.value);            
        }}></textarea>
        <br />
        <button onClick={addInstruction}>Add Instruction</button>
      </div>
      <br></br>
  </div>
  );
}