import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Auxiliary from '../Auxiliary/Auxiliary'

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        error: null
      }
      this.errorConfirmedHandler = this.errorConfirmedHandler.bind(this)
    }

    componentWillMount() {
      this.requestInterceptor = axios.interceptors.request.use(req => {
        this.setState({
          error: null
        })
        return req
      })
      this.responseInterceptor = axios.interceptors.response.use(res => res, error=>{
        this.setState({
          error: error
        })
      })
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor)
      axios.interceptors.request.eject(this.responseInterceptor)
    }

    errorConfirmedHandler() {
      this.setState({
        error: null
      })
    }

    render() {
      return (
        <Auxiliary>
          <Modal show={this.state.error}
          closeModal={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Auxiliary>
      )
    }
  }
}

export default withErrorHandler