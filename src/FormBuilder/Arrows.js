import React from 'react'

export default ({first, last, actions, index}) =>
  <span className='Arrows__Container'>
    {last
      ? <a className='Arrows__Arrow--disabled'>▼</a>
      : <a className='Arrows__Arrow' onClick={() => actions.move(index, index + 1)}>▼</a>}
    {' '}
    {first
      ? <a className='Arrows__Arrow--disabled'>▲</a>
      : <a className='Arrows__Arrow' onClick={() => actions.move(index, index - 1)}>▲</a>}
  </span>
