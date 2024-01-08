import "./App.css";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";

import React, { Component } from "react";

import Alert from "react-s-alert";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import ProfileCard from "./components/ProfileCard";
import _ from 'lodash';


const client_id = "77asdfasdfa6k4geitiskdgfkah77wda46"; // put your client id here
const redirectionURL ="http://localhost:3001/callback" 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: false,
      firstName: null,
      lastName: null,
      profileURL: null,
      pictureURL: null,
    };
  }

  componentDidMount() {
    window.addEventListener('message', this.handlePostMessage);
  }

  handlePostMessage = (event) => {
    if (event.data.type === "profile") {
      this.updateProfile(event.data.profile);
      Alert.success(`Login successful: ${event.data.profile.name}`,{position:'top'});
    }
  };

  updateProfile = (profile) => {
    console.log(profile)
      this.setState({
        isAuthorized: true,
        firstName: _.get(profile,'given_name',''),
        lastName: _.get(profile,'family_name',''),
        profileURL: `https://www.linkedin.com/in/${_.get(profile,'fullname','')}`,
        pictureURL: _.get(profile,'picture','')
      })
  }

  requestProfile = () => {
   var  oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${client_id}&redirect_uri=${redirectionURL}&state=123456&scope=openid%20profile%20w_member_social%20email`

    // var oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${client_id}&scope=r_liteprofile&state=123456&redirect_uri=${redirectionURL}`
    var width = 450,
      height = 730,
      left = window.screen.width / 2 - width / 2,
      top = window.screen.height / 2 - height / 2;

      window.open(
        oauthUrl,
        "Linkedin",
        "menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=" +
          width +
          ",height=" +
          height +
          ",top=" +
          top +
          ",left=" +
          left
      );
      
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Linkedin Login</h1>
          <p className="App-intro">A demo page for Linkedin login</p>
          <FontAwesomeIcon icon={["fab", "github"]} />{" "}
          <a
            href="https://github.com/gautammali/React-Linkedin-Login"
            className="github-link"
          >
            gautammali/React-Linkedin-Login
          </a>
          <Alert />
        </header>
        <div className="App-body">
          <button onClick={this.requestProfile}>Linkedin Login</button>
          {this.state.isAuthorized &&
            (
              <ProfileCard
                firstName={this.state.firstName}
                lastName={this.state.lastName}
                profileURL={this.state.profileURL}
                pictureURL={this.state.pictureURL}
              />
            )}
        </div>
      </div>
    );
  }
}

export default App;
