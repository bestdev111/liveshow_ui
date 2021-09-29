import React, { Component } from "react";
import { translate, t } from "react-multi-lang";

class OtherProNavSec extends Component {
  state = {};
  render() {
    return (
      <div className="overlay1 container">
        <ul className="nav nav-tabs profile-tab" role="tablist">
          <li role="presentation" className="active">
            <a
              href="#about"
              aria-controls="home"
              role="tab"
              data-toggle="tab"
              className="white-text hidden-xs text-bold"
            >
              {t("about")}
            </a>
            <a
              href="#about"
              aria-controls="home"
              role="tab"
              data-toggle="tab"
              className="white-text visible-xs"
            >
              <i className="fa fa-info"></i>
            </a>
          </li>
          <li role="presentation">
            <a
              href="#followers"
              aria-controls="messages"
              role="tab"
              data-toggle="tab"
              className="white-text hidden-xs text-bold"
              onClick={this.props.getFollowerDetails}
            >
              {t("events")}
            </a>
            <a
              href="#followers"
              aria-controls="messages"
              role="tab"
              data-toggle="tab"
              className="white-text visible-xs"
            >
              <i className="fa fa fa-users"></i>
            </a>
          </li>
          <li role="presentation">
            <a
              href="#following"
              aria-controls="settings"
              role="tab"
              data-toggle="tab"
              className="white-text hidden-xs text-bold"
              onClick={this.props.getFollowingDetails}
            >
              {t("contact")}
            </a>
            <a
              href="#following"
              aria-controls="settings"
              role="tab"
              data-toggle="tab"
              className="white-text visible-xs"
            >
              <i className="fa fa fa-user-plus"></i>
            </a>
          </li>
          <li role="presentation">
            <a
              href="#gallery"
              aria-controls="settings"
              role="tab"
              data-toggle="tab"
              className="white-text hidden-xs text-bold"
              onClick={this.props.getGalleryDetails}
            >
              {t("gallery")}
            </a>
            <a
              href="#gallery"
              aria-controls="settings"
              role="tab"
              data-toggle="tab"
              className="white-text visible-xs"
            >
              <i className="fa fa-pencil-square-o"></i>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default translate(OtherProNavSec);
