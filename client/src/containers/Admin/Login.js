import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import { Actions } from '../../store/actions/user.actions';

class Login extends Component {

  state = {
    form: {
      email: '',
      password: ''
    },
    error: null
  }


  onSubmit = e => {

    e.preventDefault();
    const { email, password } = this.state.form;
    this.props.dispatch(Actions.login(email, password));

  }

  onInputChanged = ({ target: { name, value } }) => {
    this.setState((state) => ({
      ...state,
      form: {
        ...state.form,
        [name]: value
      }
    }))
  }


  render() {
    return (
      <div className="rl_container">
        <form onSubmit={this.onSubmit}>
          <h2>Login here</h2>


          <div className="form_element">
            <input
              name="email"
              type="email"
              placeholder="Enter email..."
              value={this.state.form.email}
              onChange={this.onInputChanged}
            />
          </div>

          <div className="form_element">
            <input
              name="password"
              type="password"
              placeholder="Enter password..."
              value={this.state.form.password}
              onChange={this.onInputChanged}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
        {!!this.props.user && <Redirect to="/user" />}
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => (user)

export default connect(mapStateToProps, null)(withRouter(Login))

