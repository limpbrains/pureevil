import React, { Component } from 'react'

import DNDContainer from './DNDContainer'

export default class Editor extends Component {
  render() {
    const { title, scheme: { fields, desc }, actions, errors, handleSave } = this.props

    return (
      <div className='FormBuilder__Editor'>
        <div className='FormBuilder__EditorBody'>
          <h2 className='Editor__Header'>
            {title}
            <button
              style={{float: 'right'}}
              className='FButton'
              onClick={handleSave}>
              Save
            </button>
          </h2>
          <p className='Editor__Desc'>
            <span className='Editor__DescSpan'>DESCRIPTION:</span> {desc}
          </p>

          <div className='Editor__TableCaption'>
            <div style={{flex: '40 1 auto'}}>
              Question Title
            </div>

            <div style={{flex: '23 1 auto'}}>
              Choices
            </div>

            <div style={{flex: '5 1 auto'}}>
              Required?
            </div>
          </div>

          <DNDContainer
            fields={fields}
            errors={errors}
            actions={actions} />
        </div>
      </div>
    )
  }
}
