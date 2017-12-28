import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
  constructor(props){
    super(props)
    this.state = {
      orderForm: {
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your name'
          },
          value: '',
          validation: {
            require: true,
          },
          validateMessage: 'Please enter a valid name',
          valid: true,
          touched: false
        },
        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Street'
          },
          value: '',
          validation: {
            require: true,
          },
          validateMessage: 'Please enter a valid street',
          valid: true,
          touched: false
        },
        zipCode: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'ZIP'
          },
          value: '',
          validation: {
            require: true,
            minLength: 4,
            maxLength: 5
          },
          validateMessage: 'Please enter a valid zipcode',
          valid: true,
          touched: false
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Your Email'
          },
          value: '',
          validation: {
            require: true,
          },
          validateMessage: 'Please enter a valid email address',
          valid: true,
          touched: false
        },
        deliveryMethod : {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'fastest', displayValue: 'Fastest'},
              {value: 'cheapest', displayValue: 'Cheapest'},
            ]
          },
          value: 'fastest',
          validation: {},
          valid: true
        }
      },
      formIsValid: false,
      loading: false
    }
    this.orderHandler = this.orderHandler.bind(this)
    this.inputChangedHandler = this.inputChangedHandler.bind(this)
  }

  orderHandler(event) {
    event.preventDefault()
    this.setState({
      loading: true
    })
    const formData = {}
    for(let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData
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

  inputChangedHandler(event, inputIdentifier) {
    const updatedOrderform = {
      ...this.state.orderForm
    }
    const updatedFormElement = {
      ...updatedOrderform[inputIdentifier]
    }
    updatedFormElement.value = event.target.value
    updatedFormElement.touched = true
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedOrderform[inputIdentifier] = updatedFormElement

    let formIsValid = true
    for (let inputIdentifier in updatedOrderform) {
      formIsValid = updatedOrderform[inputIdentifier].valid && formIsValid
    }

    this.setState({
      orderForm: updatedOrderform,
      formIsValid: formIsValid
    })
  }

  checkValidity(value, rule){
    let isValid = true
    // if (!rule) {
    //   return true
    // }

    if (rule.require) {
      isValid = value.trim() !== '' && isValid
    }

    if (rule.minLength) {
      isValid = value.length >= rule.minLength && isValid
    }

    if (rule.maxLength) {
      isValid = value.length <= rule.maxLength && isValid
    }

    return isValid
  }

  render() {
    const formElementsArray = []
    for(let key in this.state.orderForm){
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      })
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input 
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid = {!formElement.config.valid}
            shouldValidate = {formElement.config.validation}
            errorMessage = {formElement.config.validateMessage}
            touched = {formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ))}
        <Button btnType="Success" disable={!this.state.formIsValid}>ORDER</Button>
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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

export default connect(mapStateToProps)(withRouter(ContactData))