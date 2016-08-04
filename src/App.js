import React, { Component } from 'react'

import FormBuilder from './FormBuilder'

export default class App extends Component {
  render() {
    const scheme = {
      desc: 'Welcome aboard !',
      fields: [{
        name: 'input',
        type: 'input',
        required: false,
      }, {
        name: 'input',
        type: 'radio',
        required: true,
        choices: [
          '',
          '',
          'May be',
        ]
      }, {
        name: 'checkbox',
        type: 'checkbox',
        required: true,
        choices: [
          'Yes',
          'No',
          'May be',
        ]
      }, {
        name: 'select',
        type: 'select',
        required: false,
        choices: [
          'Yes',
          'No',
          'May be',
        ]
      }, {
        name: 'file',
        type: 'file',
        required: false,
      }, {
        name: 'textarea',
        type: 'textarea',
        required: false,
      }],
    }

    return (
      <div>
        App

        <div>
          <FormBuilder
            formScheme={scheme}
            title='San Francisco Driving Form'
            onSave={f => console.info('save', f)} />
        </div>
      </div>
    )
  }
}
