import React from 'react'

import trashbin from './img/trashbin.svg'
import Editable from './Editable'

const AddChoice = ({addChoice, id}) =>
  <a className='Choices__AddChoice' onClick={() => addChoice(id)}>
    + Add Choice
  </a>

const Trash = ({id, index, actions}) =>
  <a className='Trash__Container' onClick={() => {actions.removeChoice(id, index)}} title='Remove'>
    <img className='Trash__Icon' alt='Remove icon' src={trashbin} />
  </a>

export const Input = () =>
  <input placeholder='Single-line text' className='Editable__ExampleInput' />

export const RadioCheckbox = ({ choices = [], actions, id, type }) =>
  <div>
    <ul className='Choices__List'>
      {choices.map((item, index) =>
        <li key={index}>
          {type === 'radio'
            ? <input type='radio' />
            : <input type='checkbox' />}
          {' '}<Editable text={item} onChange={value => actions.editChoice(id, index, value)} />
          <Trash actions={actions} id={id} index={index} />
        </li>
      )}
    </ul>
    <div>
      <AddChoice id={id} addChoice={actions.addChoice} />
    </div>
  </div>

export const Select = ({ choices = [], actions, id }) =>
  <div>
    <select className='Choices__Select'>
      {choices.map((item, index) =>
        <option key={index}>{item}</option>
      )}
    </select>
    <ul className='Choices__List'>
      {choices.map((item, index) =>
        <li key={index}>
          {' '}<Editable text={item} onChange={value => actions.editChoice(id, index, value)} />
          <Trash actions={actions} id={id} index={index} />
        </li>
      )}
    </ul>
    <div>
      <AddChoice id={id} addChoice={actions.addChoice} />
    </div>
  </div>

export const File = () =>
  <input type='file' />

export const Textarea = () =>
  <textarea className='Editable__ExampleInput' />
