import React, { useState, useEffect } from 'react';
import './App.css';
import { recipes } from './recipes';
import { RecipeCard } from './RecipeCard';

function App() {

  const [input, setInput] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [sortBy, setSortBy] = useState('calories');

  const handleSearch = (event) => {
    setInput(event.target.value);
  }

  const handleSort = (event) => {
    setSortBy(event.target.value);
  }

  useEffect(() => {
    let temp = [];
    if (input === '') {
      temp = [...recipes];
      // setFilteredRecipes(temp.sort((a, b) => a.calories - b.calories));
    } else {
      temp = recipes.filter(
        (recipe) => Object.keys(recipe.ingredients).join(' ').toLowerCase().includes(input.toLowerCase()) || recipe.title.toLowerCase().includes(input.toLowerCase()) || recipe.tags.join(' ').toLowerCase().includes(input.toLocaleLowerCase()) || recipe.subTitle.toLowerCase().includes(input.toLowerCase())
      );
    }

    switch (sortBy) {
      case 'calories':
        temp.sort((a, b) => a.calories - b.calories);
        break;
      case 'preparation time':
        temp.sort((a, b) => a.preparationTime - b.preparationTime);
        break;
      default:
        break;
    }

    setFilteredRecipes(temp);
  }, [input, sortBy]);

  return (
    <div className="App container">

      <h1 style={{ color: 'white' }}>Recipe Index</h1>

      <div className="row" style={{ padding: '2rem 0' }}>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="">Search</span>
          </div>
          <input type="text" className="search-bar form-control" onChange={event => handleSearch(event)} value={input} placeholder="e.g. 'vegetarian', 'pasta', 'chicken', etc." />
        </div>
      </div>

      <div className="row">
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">Sort By</span>
          </div>
          <select className="form-select" aria-label="Default select example" onChange={(event) => handleSort(event)}>
            <option value=''>-</option>
            <option value="calories" selected>Calories</option>
            <option value="preparation time">Preparation Time</option>
          </select>
        </div>
        <em id='counter' style={{ paddingBottom: '2rem', color: 'white', fontSize: '1.2rem' }}>{filteredRecipes.length} recipe(s)</em>
      </div>

      <div className="row">
        {filteredRecipes.map((recipe, i) => {
          return (
            <div key={i} className="col-md-6 col-xl-4">
              <RecipeCard recipeTitle={recipe.title} recipeSubTitle={recipe.subTitle} image={recipe.image} duration={recipe.preparationTime} calories={recipe.calories} ingredients={recipe.ingredients} identifier={i} />
            </div>
          )
        })}
      </div>
    </div >
  );
}

export default App;
