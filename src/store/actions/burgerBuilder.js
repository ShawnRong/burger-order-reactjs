import * as actionTypes from '../actions/actionTypes'
import axios from '../../axios-orders'

export const ingredientAdded = (ingName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName
  }
}

export const ingredientRemoved = (ingName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingName
  }
}

//Async actions

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  }
}

export const initIngredients = () => {
  return dispatch => {
    axios.get('https://react-my-burger-899e3.firebaseio.com/ingredients.json')
        .then(response => {
          dispatch(setIngredients(response.data))
        })
        .catch(error => {
          dispatch(fetchIngredientsFailed())
        })
  }
}