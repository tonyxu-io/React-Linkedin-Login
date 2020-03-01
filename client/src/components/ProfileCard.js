import '../App.css';

import React, {Component} from 'react';

class ProfileCard extends Component {

  render(){
    return (
      <div className="profile">
        <div className="profile-container">
          <h1><a href={this.props.profileURL} target="_blank">{this.props.firstName} {this.props.lastName}</a></h1>
          <h2>{this.props.headline}</h2>
          <p className="profile-summary">{this.props.summary}</p>
        </div>
      </div>
    )
  }
}

export default ProfileCard;