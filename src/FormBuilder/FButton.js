import React from 'react'
import classNames from 'classnames'

export default (props)=>
  <button
    className={classNames('FButton', {'FButton--stretch': 'stretch' in props})}
    onClick={props.onClick}>
    {props.children}
  </button>
