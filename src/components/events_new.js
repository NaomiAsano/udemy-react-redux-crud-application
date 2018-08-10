import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {postEvent} from '../actions'

class EventsNew extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  renderField(field) {
    const {input, label, type, meta: {touched, error}} = field

    return (
        <TextField
          error={touched && error}
          placeholder={label}
          label={label}
          type={type}
          helperText={touched && error}
          {...input}
          fullWidth={true}
        />
    )
  }

  async onSubmit(values) {
    await  this.props.postEvent(values)
    this.props.history.push('/')
  }

  render() {
    const {handleSubmit, pristine, submitting, invalid } = this.props
    const inputStyle = { display: 'none' }
    const buttonStyle = { margin: 12 }
    return (
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div><Field label="Title" name="title" type="text" component={this.renderField}/></div>
          <div><Field label="Body" name="body" type="text" component={this.renderField}/></div>
          <div>
            <input
                type="submit"
                id="submit-button"
                multiple
                style={inputStyle}
            />
            <label htmlFor="submit-button">
              <Button
                  variant="contained"
                  component="span"
                  style={buttonStyle}
                  disabled={pristine || submitting || invalid}
              >
                Submit
              </Button>
            </label>
            <Button
              variant="contained"
              style={buttonStyle}
              href="/"
            >
              Cancel
            </Button>
          </div>
        </form>
    )
  }
}

const validate = values => {
  const errors = {}

  if (!values.title) errors.title = "Enter a title, please."
  if (!values.body) errors.body = "Enter a body, please."

  return errors
}

const mapDispatchToProps = ({postEvent})

export default connect(null, mapDispatchToProps)(
    reduxForm({validate, form: 'eventNewForm'})(EventsNew)
)
