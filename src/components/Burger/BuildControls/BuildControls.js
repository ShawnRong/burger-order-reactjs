import React from 'react'
import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.css'

const controls = [
  { label: 'Salad', type: 'salad'},
  { label: 'Meat', type: 'meat'},
  { label: 'Cheese', type: 'cheese'},
  { label: 'Bacon', type: 'bacon'},
]

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.type}
          label={ctrl.label}
          added={() => props.ingrediendAdded(ctrl.type)}
          removed={() => props.ingrediendRemoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
      <button className={classes.OrderButton} disabled={!props.purchaseable} onClick={props.ordered}>
        {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
      </button>
    </div>
  )
}

export default buildControls