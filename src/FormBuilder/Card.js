import classNames from 'classnames'
import { findDOMNode } from 'react-dom'
import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd'

import Arrows from './Arrows'
import Editable from './Editable'
import * as widgets from './widgets'
import reorderHandle from './img/reorder-handle.svg'


const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    }
  }
}

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    if (dragIndex === hoverIndex) {
      return
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
    const clientOffset = monitor.getClientOffset()
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    props.moveCard(dragIndex, hoverIndex)
    monitor.getItem().index = hoverIndex
  }
}

export default class Card extends Component {
  render() {
    const { isDragging, connectDragSource, connectDropTarget, connectDragPreview } = this.props
    const { field: { name, type, required, id, ...other }, actions, errors, first, last, index } = this.props

    let widget

    switch (type) {
      case 'input':
        widget = <widgets.Input />
        break
      case 'radio':
        widget = <widgets.RadioCheckbox type='radio' {...other} actions={actions} id={id} />
        break
      case 'checkbox':
        widget = <widgets.RadioCheckbox type='checkbox' {...other} actions={actions} id={id} />
        break
      case 'select':
        widget = <widgets.Select {...other} actions={actions} id={id} />
        break
      case 'file':
        widget = <widgets.File />
        break
      case 'textarea':
        widget = <widgets.Textarea />
        break

      default:
        throw new Error('Unknown field type')
    }

    return connectDragPreview(connectDropTarget(
      <div className={classNames('Card', {'Card--dragging': isDragging})}>

        <div style={{flex: '50 1 50%', wordWrap: 'break-word'}}>
          {connectDragSource(
            <div className='Card__Drag'>
              <img src={reorderHandle} alt='Reorder' />
            </div>
          )}
          <div style={{marginLeft: '20px'}}>
            <Arrows first={first} last={last} actions={actions} index={index} />


            <Editable text={name} onChange={value => actions.editField(id, value)} />
            <ul className='Errors__List'>
              {errors && [...errors].map(e =>
                <li key={e}>{e}</li>
              )}
            </ul>
          </div>
        </div>

        <div style={{flex: '30 1 30%'}}>
          {widget}
        </div>

        <div style={{flex: '1 0 auto', paddingRight: '1em'}}>
          <input type='checkbox' checked={required} onChange={() => actions.changeRequired(id)} />
        </div>

        <div style={{flex: '1 0 auto'}}>
          <a className='Card__Remove' onClick={e => actions.remove(id)}>Remove</a>
        </div>
      </div>
    ))

  }
}

// eslint-disable-next-line new-cap
Card = DragSource('field', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))(Card)

// eslint-disable-next-line new-cap
Card = DropTarget('field', cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(Card)

export default Card
