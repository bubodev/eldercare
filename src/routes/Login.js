import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router';  
import { bindActionCreators } from 'redux'
import * as authActions from '../actions/authActions'

class Login extends React.Component  {
	constructor(props){
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleClick = this.handleClick.bind(this)
	}
  handleSubmit(e) {
		e.preventDefault()
		const creds = {
			email: this.refs.email.value,
			password: this.refs.password.value
		}
		this.props.actions.loginUser(creds)
	}
	handleClick(e){
		e.preventDefault()
		//this.props.actions.protectedTest();
		this.props.actions.getUsers('59e12052a5fd20369c2bc2f6');
	}

  renderAlert() {
		console.log(this.props.authState)
    if(this.props.authState.error) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.authState.error}</span>
        </div>
      );
    }
  }

  render() {

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        {this.renderAlert()}
          <div>
            <label>Email</label>
            <input ref="email" name="email" className="form-control" component="input" type="text" />
          </div>
          <div>
            <label>Password</label>
            <input ref="password" name="password" className="form-control" component="input" type="password" />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
				<button onClick={this.handleClick}>Click</button>
      </div>
    );
  }
}

export default connect(
	(state, ownProps) => ({
		authState: state.authReducer
	}),
	dispatch => ({
		actions: bindActionCreators(authActions, dispatch)
	})
)(Login)