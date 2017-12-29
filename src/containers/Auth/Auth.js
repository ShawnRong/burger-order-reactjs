import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css'

class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      controls: {
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Mail Address'
          },
          value: '',
          validation: {
            require: true,
            isEmail: true
          },
          validateMessage: 'Please enter a email',
          valid: false,
          touched: false
        },
        password: {
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: 'Password'
          },
          value: '',
          validation: {
            require: true,
            minLength: 6
          },
          validateMessage: 'Please enter a password',
          valid: false,
          touched: false
        },
      }
    }
    this.inputChangedHandler = this.inputChangedHandler.bind(this)
  }

  checkValidity(value, rule){
    let isValid = true
    if (!rule) {
      return true
    }

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

  inputChangedHandler(event, controlName) {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    }
    this.setState({
      controls: updatedControls
    })
  }

  render() {
    const formElementsArray = []
    for(let key in this.state.controls){
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      })
    }
    const form = formElementsArray.map(formElement => (
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
    ))
    return (
      <div className={classes.Auth}>
        {form}
        <Button btnType="Success" disable={!this.state.formIsValid}>SUBMIT</Button>
      </div>
    )
  }
}

export default Auth