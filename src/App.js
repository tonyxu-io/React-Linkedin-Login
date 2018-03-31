import React, { Component } from 'react';
import './App.css';
import ProfileCard from './components/ProfileCard';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'

var IN = null

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuthorized: false,
      firstName: null,
      lastName: null,
      headline: null,
      profileURL: null,
      pictureURL: null,
      location: null,
      positions: null,
      summary: null,
      connectionsCount: null
    }
  }
  isLinkedinAuthorized = () => {
    return IN.User.isAuthorized()
  }
  linkedinAuthorize = () => {
    IN.User.authorize(this.onLinedInLoad());
  }
  updateAuthorizeStatus = () => {
    if (IN === null) {
      IN = window.IN
    }
    if (this.isLinkedinAuthorized()){
      this.setState({
        isAuthorized: true
      })
      this.requestLinkedinProfile()
    }
  }
  onLinedInLoad = () => {
    IN.Event.on(IN, "auth", this.updateAuthorizeStatus);
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

  requestLinkedinProfile = () => {
    IN.API.Raw('/people/~:(first-name,last-name,public-profile-url,location,headline,picture-url,positions,summary,num-connections)?format=json').method('GET').body().result(this.updateLinkedinProfile);
  }

  updateLinkedinProfile = (profile) => {
    console.log(profile)
    this.setState({
      firstName: profile.firstName,
      headline: profile.headline,
      lastName: profile.lastName,
      profileURL: profile.publicProfileUrl,
      pictureURL: profile.pictureUrl,
      location: profile.location.name,
      positions: profile.positions,
      summary: profile.summary,
      connectionsCount: profile.numConnections
    })
  }

  shareToLinkedin = () => {
    // Build the JSON payload containing the content to be shared
    var payload = { 
      "comment": `Check out ${window.location.href} !`, 
      "visibility": { 
        "code": "anyone"
      } 
    };

    IN.API.Raw("/people/~/shares?format=json")
      .method("POST")
      .body(JSON.stringify(payload))
      .result(this.onShareSuccess)
      .error(this.onShareError);
  }

  onShareSuccess = (data) => {
    console.log(data)
    Alert.info(`<div style="text-align:left"><p>You shared on Linkedin Successfully!<p><br/><a href=${data.updateUrl} target="_blank">Open</a></div>`, {
      html: true
    });
  }

  onShareError = (error) => {
    console.log(error)
    Alert.error('Something wrong, please try again.');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Linkedin Login</h1>
          <p className="App-intro">A demo page for Linkedin login</p>
          <FontAwesomeIcon icon={["fab", "github"]}/> <a href="https://github.com/yihan-us/React-Linkedin-Login" className="github-link">yihan-us/React-Linkedin-Login</a>
          <Alert/>
        </header>
        <div className="App-body">
          {
            this.state.isAuthorized
            ?
            <span>
              <button onClick={this.linkedinLogout}>Linkedin Logout</button>
              <button onClick={this.shareToLinkedin}>Share on Linkedin</button>
            </span>
            :
            <button onClick={this.linkedinAuthorize}>Linkedin Login</button>
          }
          {
            this.state.isAuthorized && this.state.summary &&
            <ProfileCard firstName={this.state.firstName} headline={this.state.headline} lastName={this.state.lastName} profileURL={this.state.profileURL} pictureURL={this.state.pictureURL} location={this.state.location} positions={this.state.positions} summary={this.state.summary} connectionsCount={this.state.connectionsCount}/>
          }
        </div>
      </div>
    );
  }
}

export default App;
