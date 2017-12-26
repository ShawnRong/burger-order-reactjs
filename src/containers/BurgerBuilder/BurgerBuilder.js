import React, { Component }from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

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
      ingredients: null,
      totalPrice: 4,
      purchaseable: false,
      purchasing: false,
      loading: false,
      error: false
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

    this.queryParams = []

    this.purchaseHandler = this.purchaseHandler.bind(this)
    this.purchaseCancelHandler = this.purchaseCancelHandler.bind(this)
    this.purchaseContinueHandler = this.purchaseContinueHandler.bind(this)
  }

  componentDidMount(){
    axios.get('https://react-my-burger-899e3.firebaseio.com/ingredients.json')
        .then(response => {
          this.setState({
            ingredients: response.data
          })
        })
        .catch(error => {
          this.setState({
            error: true
          })
        })
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
    for (let i in this.state.ingredients){
      this.queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    }

    this.queryParams.push('price='+ this.state.totalPrice)
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + this.queryParams.join('&')
    })
  }

  render() {
    const disableInfo = {
      ...this.state.ingredients
    }
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0
    }
    let orderSummary = null
    if (this.state.loading) {
      orderSummary = <Spinner />
    }
    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
    if (this.state.ingredients) {
      burger = (
        <Auxiliary>
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
      orderSummary = <OrderSummary ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseContinued={this.purchaseContinueHandler}
            purchaseCancelled={this.purchaseCancelHandler}
          />
    }
    return (
      <Auxiliary>
        <Modal show={this.state.purchasing} closeModal={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios)