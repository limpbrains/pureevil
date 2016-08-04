import React, { Component } from 'react'
import classNames from 'classnames'
import FButton from './FButton'

export default class Tabs extends Component {
  constructor(props) {
    super(props)
    this.state = {active: 1}
    this.switch = this.switch.bind(this)
  }

  switch(tab) {
    this.setState({active: tab})
  }

  render() {
    const { title, scheme: { desc }, actions: { addField, editDesc } } = this.props
    const { active } = this.state

    return (
      <div className='FormBuilder__Tabs'>
          <h2 className='Tabs__Header'>{title}</h2>
        <div >
        </div>
        <ul className='TabsButtons__TabsPanel'>
          <li className={classNames('TabsButtons__Tab', {'TabsButtons__Tab--active': active === 1})}
              onClick={() => this.switch(1)}>Custom fields</li>
          <li className={classNames('TabsButtons__Tab', {'TabsButtons__Tab--active': active === 2})}
              onClick={() => this.switch(2)}>Description (optional)</li>
        </ul>
        <div className='Tabs__Container'>
          {active === 1 &&
            <div>
              <p className='Tabs__Description'>Click to add field to form</p>
              <h3 className='Tabs__Headline'>Add custom field</h3>
              <div className='Buttons__Container'>
                <div className='Buttons__Col'>
                  <FButton stretch onClick={() => addField('input')}>Single line text</FButton><br/>
                  <FButton stretch onClick={() => addField('radio')}>Radio button</FButton><br/>
                  <FButton stretch onClick={() => addField('checkbox')}>Checkboxes</FButton><br/>
                </div>
                <div className='Buttons__Col'>
                  <FButton stretch onClick={() => addField('select')}>Select</FButton><br/>
                  <FButton stretch onClick={() => addField('file')}>File upload</FButton><br/>
                  <FButton stretch onClick={() => addField('textarea')}>Paragraph text</FButton><br/>
                </div>
              </div>
            </div>
          }
          {active === 2 &&
            <div>
              <p className='Tabs__Description'>Optional form description</p>
              <h3 className='Tabs__Headline'>Form Description</h3>
              <textarea className='Tabs__Textarea'
                onChange={({target: { value }}) => editDesc(value)}
                value={desc}
                />
            </div>
          }
        </div>

      </div>
    )
  }
}
