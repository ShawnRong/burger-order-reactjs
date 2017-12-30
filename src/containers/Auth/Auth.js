import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
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
      },
      isSignUp: true
    }
    this.inputChangedHandler = this.inputChangedHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
    this.switchAuthModeHandler = this.switchAuthModeHandler.bind(this)
  }

  componentDidMount() {
    if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath()
    }
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

  onSubmitHandler(event) {
    event.preventDefault()
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
  }

  switchAuthModeHandler() {
    this.setState(prevState => {
      return {
        isSignUp: !prevState.isSignUp
      }
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
    let form = formElementsArray.map(formElement => (
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
    if (this.props.loading) {
      form = <Spinner />
    }

    let errorMessage = null;
    if (this.props.error)  {
      errorMessage = (
        <p>{this.props.error.message}</p>
      )
    }

    let authRedirect = null
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.onSubmitHandler}>
          {form}
          <Button btnType="Success" disable={!this.state.formIsValid}>SUBMIT</Button>
        </form>
        <Button
          clicked={this.switchAuthModeHandler}
          btnType="Danger">SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () =>dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)