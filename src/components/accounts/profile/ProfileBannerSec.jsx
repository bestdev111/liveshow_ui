import React, { Component } from "react";
import { Link } from "react-router-dom";
import { translate, t } from "react-multi-lang";

class ProfileBannerSec extends Component {
  state = {};
  render() {
    const { profileData } = this.props;
    return (
      <div className="container">
        <div className="Spacer-25 hidden-xs"></div>
        <div className="Spacer-18 visible-xs"></div>
        <div className=" row">
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 center-align">
            <div
              style={{ backgroundImage: `url(${profileData.picture})` }}
              className="user-profile1"
            ></div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-8 col-lg-8 white-text">
            <div className="Spacer-10"></div>
            <h1 className="signup-head">{profileData.name}</h1>
            <div className="Spacer-5"></div>
            <h3 className="signup-head">{profileData.email}</h3>
            <div className="Spacer-5"></div>
            <h4 className="signup-head">
              <Link to={"/follower"} className="pro-head">
                {t("followers")} - {profileData.total_followers}
              </Link>
              <Link to={"/following"} className="left-spacing pro-head">
                {t("following")} - {profileData.total_followings}
              </Link>
            </h4>
            <hr />
          </div>
        </div>
      </div>
    );
  }
}

export default translate(ProfileBannerSec);
