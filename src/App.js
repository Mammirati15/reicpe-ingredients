/*global fetch*/
import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';


const App = () => {
  const APP_ID = '172e50e6'
  const API_KEY = 'd9065034566c9d1e74ad1aed58c0c61f'
 
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('salmon');
  
  useEffect(() => {
    getRecipes();
  }, [query]);
  
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`);
    const data = await response.json();
    setRecipes(data.hits)
  }
  
  const updateSearch = (e) => {
    setSearch(e.target.value);
  }
  
  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }
  
  return (
    <div className="App"> 
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} 
        onChange={updateSearch} />
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="style-recipe">
      {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories} 
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>  
    )
  };

export default App;
