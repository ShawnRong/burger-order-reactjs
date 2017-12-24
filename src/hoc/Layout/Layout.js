import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import classes from  './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSideDrawer: false
    }
    this.sideDrawerClosedHandler = this.sideDrawerClosedHandler.bind(this)
    this.sideDrawerToggleHandler = this.sideDrawerToggleHandler.bind(this)
  }

  sideDrawerClosedHandler() {
    this.setState({
      showSideDrawer: false
    })
  }

  sideDrawerToggleHandler() {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer}
    })
  }

  render() {
    return (
      <Auxiliary>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Auxiliary>
    )
  }
}

export default Layout