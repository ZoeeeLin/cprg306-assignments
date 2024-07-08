"use client"

import { useEffect, useState } from "react";

export default function MealIdeas({ingredient}){

    const [meals, setMeals] = useState([]);
    const [displayIngredient, setDisplayIngredient] = useState({});

    async function fetchMealIdeas(ingredient){
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
            if (!response.ok) console.log(`Error: ${response.status}`);
            const data = await response.json();
            console.log(data);
            return data.meals;
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }

    async function loadMealIdeas(){
        try {
            const data = await fetchMealIdeas(ingredient);
            if (data != null) setMeals(data);
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }

    useEffect( () => {
        loadMealIdeas();
    }, [ingredient])

    async function parseIngredient(idMeal){
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
            if (!response.ok) console.log(`Error: ${response.status}`);
            const data = await response.json();
            console.log(data);
            const meal = data.meals[0];
            const ingredients = [];
            for (let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`];
                const measure = meal[`strMeasure${i}`];
                if (ingredient) {
                    ingredients.push(`${measure} ${ingredient}`);
                }
            }
            return ingredients;
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }

    //const handleIngredient = () => setDisplayIngredient(true);\
    const handleIngredient = async (idMeal) => {
        if (displayIngredient === idMeal) {
            setDisplayIngredient(null);
        } else {
            const ingredients = await parseIngredient(idMeal);
            setDisplayIngredient({
                id: idMeal,
                ingredients: ingredients
            });
        }
    }

    return(
        <div className="max-w-md mx-auto p-8">
            <h1 className="text-white text-4xl font-bold mb-6 p-3 text-center">Meal Ideas</h1>
            {ingredient ? ( 
            <>
                <p className="text-white">Showing ideas for: {ingredient}</p>
                <ul>
                    {meals.map( (meal) => (
                        <li key={meal.idMeal}>
                            <h3 className="text-white text-xl font-bold">{meal.strMeal}{meal.idMeal}</h3>
                            {displayIngredient && displayIngredient.id === meal.idMeal ? (
                                <ul>
                                    {displayIngredient.ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ul>
                            ) : (
                                <img onClick={() => handleIngredient(meal.idMeal)} src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover rounded-lg mb-2" />
                            )}
                        </li>
                    ))}
                </ul>
            </>
            ) : (
                <p className="text-white">Select an item to see meal ideas.</p>
            )}
        </div>
    );
}