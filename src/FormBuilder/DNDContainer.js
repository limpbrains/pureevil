import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import Card from './Card'

export default class DNDContainer extends Component {
  constructor(props) {
    super(props)
    this.moveCard = this.moveCard.bind(this)
  }

  moveCard(dragIndex, hoverIndex) {
    const { actions: { move } } = this.props
    move(dragIndex, hoverIndex)
  }

  render() {
    const { fields, actions, errors } = this.props
    const len = fields.length;

    return (
      <div>
        {fields.map((field, i) => {
          return (
            <Card key={field.id}
                  index={i}
                  first={i === 0}
                  last={i === len - 1}
                  field={field}
                  errors={errors[field.id]}
                  actions={actions}
                  moveCard={this.moveCard} />
          )
        })}
      </div>
    )
  }
}

// eslint-disable-next-line new-cap
DNDContainer = DragDropContext(HTML5Backend)(DNDContainer)

export default DNDContainer
