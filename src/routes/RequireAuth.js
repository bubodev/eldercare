import React, { Component } from 'react'  
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActions from '../actions/authActions'

export default function(ComposedComponent) {  
  class Authentication extends Component {
		constructor(props){
			super(props)
		}
    componentWillMount() {
			if(!this.props.authState.authenticated) {
				console.log('hello')
				this.props.history.push('/login');
			}
    }

    componentWillUpdate(nextProps) {
			console.log(nextProps)
      if(!nextProps.authState.authenticated) {
				console.log('hello')
      	this.props.history.push('/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

	return connect(
		(state, ownProps) => ({
			currentURL: ownProps.location.pathname,
			authState: state.authReducer
		}),
		dispatch => ({
			actions: bindActionCreators(authActions, dispatch)
		})
	)(Authentication)
}