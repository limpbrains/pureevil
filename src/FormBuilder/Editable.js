import React, { Component } from 'react'
import AutosizeInput from 'react-input-autosize'

import pencil from './img/pencil.svg'

export default class Editable extends Component {
  constructor(props) {
    super(props)
    this.state = {edit: false}
    this.switch = this.switch.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleChange({ target: { value }}) {
    const { onChange } = this.props
    onChange(value)
  }

  handleKeyDown({ keyCode }) {
    if ([13, 27].indexOf(keyCode) !== -1) {
      this.setState({edit: false})
    }
  }

  switch() {
    this.setState({edit: !this.state.edit})
  }

  render() {
    const { edit } = this.state
    const { text } = this.props

    return edit
      ? (
        <AutosizeInput
            minWidth={50}
            onBlur={this.switch}
            value={text}
            onKeyDown={this.handleKeyDown}
            onChange={this.handleChange}
            className='Editable__Input'
            ref={input => {
              if (input != null) {
                input.focus()
              }
            }}
            />
      ) : (
        <span>
          {text}
          <a className='Edit__Container' onClick={this.switch} title='Edit'>
            <img className='Edit__Icon' alt='Edit' src={pencil} />
          </a>
        </span>
      )
  }
}
