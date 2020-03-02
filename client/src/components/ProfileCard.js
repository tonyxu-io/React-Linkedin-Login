import '../App.css';

import React, {Component} from 'react';

class ProfileCard extends Component {

  render(){
    return (
      <div className="profile">
        <div className="profile-container">
          <img src={this.props.pictureURL} alt="" height="200px" width="200px"/>
          <h1><a href={this.props.profileURL} target="_blank">{this.props.firstName} {this.props.lastName}</a></h1>
          <h2>{this.props.headline}</h2>
        </div>
      </div>
    )
  }
}

export default ProfileCard;