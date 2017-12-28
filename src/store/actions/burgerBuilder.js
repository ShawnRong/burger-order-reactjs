import * as actionTypes from '../actions/actionTypes'

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