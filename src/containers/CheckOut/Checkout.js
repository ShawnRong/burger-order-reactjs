import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../CheckOut/ContactData/ContactData'
import * as action from '../../store/actions/index'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ingredients : null,
      totalPrice: 0
    }
    this.checkoutCancelledHanlder = this.checkoutCancelledHanlder.bind(this)
    this.checkoutContinuedHandler = this.checkoutContinuedHandler.bind(this)
  }

  checkoutCancelledHanlder() {
    this.props.history.goBack()
  }

  checkoutContinuedHandler() {
    this.props.history.replace('/checkout/contact-data')
  }

  render() {
    let summary = <Redirect to="/" />
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
      summary  = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHanlder}
            checkoutContinued={this.checkoutContinuedHandler} />
          <Route path={this.props.match.path + "/contact-data"} 
            component  = {ContactData} />
        </div>
      )
    }
    return summary
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}

export default connect(mapStateToProps)(Checkout)