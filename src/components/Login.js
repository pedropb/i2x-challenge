import _ from 'lodash';
import React, { Component } from 'react';
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { reduxForm, Field } from 'redux-form'
import { TextField }from 'redux-form-material-ui';

const FIELDS = {
  email: {
    floatingLabelText: 'E-mail',
    hintText: 'Enter e-mail'
  },
  password: {
    floatingLabelText: 'Password',
    hintText: 'Enter password',
    type: 'password'
  }
}

class Login extends Component {

  handleFormSubmit() {
    
  }

  renderField(fieldConfig, field) {
    return (
      <Field
        component={TextField}
        name={field}
        key={field}
        {...fieldConfig}
      />
    );
  }

  render () {
    const { handleSubmit } = this.props;

    return (
        <Card className="login-wrapper">
          <form className="login-form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <h2>Welcome!</h2><br />
            <hr className="colorgraph" />
            {_.map(FIELDS, this.renderField.bind(this))}
            <RaisedButton type="submit" label="Login" primary={true} />
          </form>
        </Card>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(FIELDS, (type, field) => {
    const fieldHelper = FIELDS[field];

    if (!values[field]) {
      errors[field] = `${fieldHelper.floatingLabelText} is required.`;
    }
    else {
      if (field === "email" && !values[field].match(/^\S+@\S+\.\S+$/) ) {
        errors[field] = "Invalid email."
      }
    }
  });

  return errors;
}

export default reduxForm({
  form: 'login',
  fields: _.keys(FIELDS),
  validate
}, null, null)(Login);