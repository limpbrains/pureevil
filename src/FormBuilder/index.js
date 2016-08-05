import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from './actions'
import Tabs from './Tabs'
import Editor from './Editor'

import './FormBuilder.css'

class FormBuilder extends Component {
  static propTypes = {
    formScheme: PropTypes.object,
    title: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    // state
    scheme: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    // actions
    actions: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleSave = this.handleSave.bind(this)
    this.componentWillMount = this.componentWillMount.bind(this)
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
  }

  handleSave(cb) {
    const { scheme, onSave } = this.props

    // remove fields id's
    const newScheme = {
      ...scheme,
      fields: scheme.fields.map(({...f, id}) => f)
    }

    onSave(newScheme)
  }

  componentWillMount() {
    const { formScheme, actions: { reset } } = this.props

    if (formScheme) {
      reset(formScheme)
    }
  }

  componentWillReceiveProps({ formScheme }) {
    const { actions: { reset } } = this.props

    if (formScheme && formScheme !== this.props.formScheme) {
      reset(formScheme)
    }
  }

  render() {
    return (
      <div className='FormBuilder'>
        <Tabs {...this.props} />
        <Editor {...this.props}
          handleSave={this.handleSave} />
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => ({
  scheme: state.builder.scheme,
  errors: state.builder.errors,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormBuilder)
