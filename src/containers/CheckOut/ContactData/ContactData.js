import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      email: '',
      address: {
        street: '',
        postCode: ''
      },
      loading: false
    }
    this.orderHandelr = this.orderHandelr.bind(this)
  }

  orderHandelr(event) {
    event.preventDefault()
    this.setState({
      loading: true
    })
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Shawn',
        address: {
          street: 'Tiantong 1',
          zipCode: '315315',
          country: 'China'
        },
        email: 'test@123.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
        .then(response => {
          console.log(response)
          this.setState({
            loading: false
          })
          this.props.history.push('/')
        })
        .catch(error => {
          console.log(error)
          this.setState({
            loading: false
          })
        })
  }

  render() {
    let form = (
      <form>
        <Input inputtype="input" type="text" name="name" placeholder="Your name"/>
        <Input inputtype="input" type="email" name="email" placeholder="Your email"/>
        <Input inputtype="input" type="text" name="street" placeholder="Your street"/>
        <Input inputtype="input" type="text" name="post" placeholder="Post Number"/>
        <Button btnType="Success" clicked={this.orderHandelr}>ORDER</Button>
      </form>
    )
    if(this.state.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}

export default withRouter(ContactData)