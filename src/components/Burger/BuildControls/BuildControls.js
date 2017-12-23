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
      <p>Current Prices: <strong>{props.price.toFixed(2)}</strong></p>
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.type}
          label={ctrl.label}
          added={() => props.ingrediendAdded(ctrl.type)}
          removed={() => props.ingrediendRemoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
    </div>
  )
}

export default buildControls