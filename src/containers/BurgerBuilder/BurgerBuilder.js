import React, { Component }from 'react'
import { connect } from 'react-redux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import { ingredientAdded } from '../../store/actions/burgerBuilder';

class BurgerBuilder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      purchasing: false,
      loading: false,
      error: false
    }
    this.queryParams = []

    this.purchaseHandler = this.purchaseHandler.bind(this)
    this.purchaseCancelHandler = this.purchaseCancelHandler.bind(this)
    this.purchaseContinueHandler = this.purchaseContinueHandler.bind(this)
  }

  componentDidMount(){
    // axios.get('https://react-my-burger-899e3.firebaseio.com/ingredients.json')
    //     .then(response => {
    //       this.setState({
    //         ingredients: response.data
    //       })
    //     })
    //     .catch(error => {
    //       this.setState({
    //         error: true
    //       })
    //     })
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0)
      return sum > 0
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
    this.props.history.push('/checkout')
  }

  render() {
    const disableInfo = {
      ...this.props.ings
    }
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0
    }
    let orderSummary = null
    if (this.state.loading) {
      orderSummary = <Spinner />
    }
    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
    if (this.props.ings) {
      burger = (
        <Auxiliary>
        <Burger ingredients={this.props.ings}/>
        <BuildControls
          ingrediendAdded={this.props.onIngredientAdded}
          ingrediendRemoved={this.props.onIngredientRemoved}
          disabled={disableInfo}
          price={this.props.price}
          purchaseable={!this.updatePurchaseState(this.props.ings)}
          ordered = {this.purchaseHandler}/>
        </Auxiliary>
      )
      orderSummary = <OrderSummary ingredients={this.props.ings}
            price={this.props.price}
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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.ingredientAdded(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.ingredientRemoved(ingName)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))