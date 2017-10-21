import React from 'react'

class NavBar extends React.Component{
	render() {
		return(
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h1 className="App-title">Welcome to React</h1>
				<ul>
					<li><Link to="/">home</Link></li>
					<li><Link to="/about">about</Link></li>
				</ul>
			</header>
		)
	}
}

export default Navbar