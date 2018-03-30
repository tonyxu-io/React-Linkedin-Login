import React, { Component } from 'react';
import './App.css';

var IN = null

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuthorized: false,
    }
  }
  isLinkedinAuthorized = () => {
    return IN.User.isAuthorized()
  }
  linkedinAuthorize = () => {
    IN.User.authorize(this.updateAuthorizeStatus(true));
  }
  updateAuthorizeStatus = (status) => {
    if (IN === null) {
      IN = window.IN
    }
    if (status) {
      this.setState({
        isAuthorized: status
      })
    }
    else {
      this.setState({
        isAuthorized: this.isLinkedinAuthorized()
      })
    }
  }
  linkedinLogout = () => {
    IN.User.logout(this.updateAuthorizeStatus);
  }
  componentDidMount = () => {
    this.loadLinkedinJS()
  }

  loadLinkedinJS = () => {
    window.updateAuthorizeStatus = this.updateAuthorizeStatus
    var script = window.document.createElement("script");
    script.src = "//platform.linkedin.com/in.js";
    script.innerHTML = 
    `api_key:   86012cynxvvidr
    authorize: true
    onLoad:updateAuthorizeStatus`
    script.async = true;
    document.getElementsByTagName('head')[0].appendChild(script);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Linkedin Login</h1>
          <p className="App-intro">A demo page for Linkedin login</p>
        </header>
        <div className="App-body">
          <button onClick={this.linkedinAuthorize}>Linkedin Login</button>
          <button onClick={this.linkedinLogout}>Linkedin Logout</button>
          <p>Logged in: {this.state.isAuthorized.toString()}</p>
        </div>
      </div>
    );
  }
}

export default App;
