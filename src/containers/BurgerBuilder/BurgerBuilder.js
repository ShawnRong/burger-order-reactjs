import React, { Component }from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/burger/BuildControls/BuildControls'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      totalPrice: 4,
      purchaseable: false,
      purchasing: false
    }

    this.addIngredientHandler = (type) => {
      const oldCount = this.state.ingredients[type]
      const updatedCount = oldCount + 1
      const updatedIngredients = {
        ...this.state.ingredients
      }
      updatedIngredients[type] = updatedCount
      const priceAddtion = INGREDIENT_PRICES[type]
      const oldPrice = this.state.totalPrice
      const newPrice = oldPrice + priceAddtion
      this.setState({
        ingredients: updatedIngredients,
        totalPrice: newPrice
      })
      this.updatePurchaseState(updatedIngredients)
    }

    this.removeIngredientHandler = (type) => {
      const oldCount = this.state.ingredients[type]
      if (oldCount <= 0) {
        return
      }
      const updatedCount = oldCount - 1
      const updatedIngredients = {
        ...this.state.ingredients
      }
      updatedIngredients[type] = updatedCount
      const priceDeduction = INGREDIENT_PRICES[type]
      const oldPrice = this.state.totalPrice
      const newPrice = oldPrice - priceDeduction
      this.setState({
        ingredients: updatedIngredients,
        totalPrice: newPrice
      })
      this.updatePurchaseState(updatedIngredients)
    }

    this.purchaseHandler = this.purchaseHandler.bind(this)
    this.purchaseCancelHandler = this.purchaseCancelHandler.bind(this)
    this.purchaseContinueHandler = this.purchaseContinueHandler.bind(this)
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0)
    this.setState({
      purchaseable: sum > 0
    })
  }

  purchaseHandler () {
    this.setState({
      purchasing: true
    })
  }

  purchaseCancelHandler() {
    this.setState({
      purchasing: false
    })
  }

  purchaseContinueHandler() {
    alert('You continue')
  }

  render() {
    const disableInfo = {
      ...this.state.ingredients
    }
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0
    }
    return (
      <Auxiliary>
        <Modal show={this.state.purchasing} closeModal={this.purchaseCancelHandler}>
          <OrderSummary ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseContinued={this.purchaseContinueHandler}
            purchaseCancelled={this.purchaseCancelHandler}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingrediendAdded={this.addIngredientHandler}
          ingrediendRemoved={this.removeIngredientHandler}
          disabled={disableInfo}
          price={this.state.totalPrice}
          purchaseable={!this.state.purchaseable}
          ordered = {this.purchaseHandler}/>
      </Auxiliary>
    )
  }
}

export default BurgerBuilder