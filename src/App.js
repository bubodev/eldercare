import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
					<ul>
						<Link to="/">home</Link>
						<Link to="/login">login</Link>
						
					</ul>
		    </header>
        <div className="App-intro">
					{this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
