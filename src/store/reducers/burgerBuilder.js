import * as actionType from '../actions/actionTypes'
import { updateOjbect } from '../utility'

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

const addIngredient = (state, action) => {
  const updatedIngredient = {
      [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  }
  const updatedIngredients = updateOjbect(
    state.ingredients,
    updatedIngredient
  )
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  }
  return updateOjbect(
    state,
    updatedState
  )
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionType.ADD_INGREDIENT:
      return addIngredient(state, action)
    case actionType.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
      }
    case actionType.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          cheese: action .ingredients.cheese,
          meat: action.ingredients.meat,
          bacon: action.ingredients.bacon
        },
        totalPrice: 4,
        error: false,
        building: false
      }
    case actionType.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      }
    default:
      return state
  }
  return state
}

export default reducer