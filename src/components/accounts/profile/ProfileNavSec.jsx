import React, { Component } from "react";
import { translate, t } from "react-multi-lang";

class ProfileNavSec extends Component {
  state = {};
  render() {
    const { getGalleryDetails, getBlockedUserDetails } = this.props;
    return (
      <div className="overlay1 container">
        <ul className="nav nav-tabs profile-tab" role="tablist">
          <li role="presentation" className="active">
            <a
              href="#about"
              aria-controls="home"
              role="tab"
              data-toggle="tab"
              className="white-text hidden-xs hide-md"
            >
              {t("about")}
            </a>
            <a
              href="#about"
              aria-controls="home"
              role="tab"
              data-toggle="tab"
              className="white-text visible-xs text-bold"
            >
              <i className="fa fa-info"></i>
            </a>
          </li>
          <li role="presentation">
            <a
              href="#blocked-list"
              aria-controls="blocked-list"
              role="tab"
              data-toggle="tab"
              className="white-text hidden-xs hide-md text-bold"
              onClick={getBlockedUserDetails}
            >
              {t("blocked_list")}
            </a>
            <a
              href="#blocked-list"
              aria-controls="blocked-list"
              role="tab"
              data-toggle="tab"
              className="white-text visible-xs"
            >
              <i className="fa fa-ban"></i>
            </a>
          </li>
          <li role="presentation" className="right-align">
            <a
              href="#delete"
              aria-controls="messages"
              role="tab"
              data-toggle="tab"
              className="white-text hidden-xs hide-md text-bold"
            >
              {t("delete_account")}
            </a>
            <a
              href="#delete"
              aria-controls="messages"
              role="tab"
              data-toggle="tab"
              className="white-text visible-xs"
            >
              <i className="fa fa-trash"></i>
            </a>
          </li>
          <li role="presentation" className="right-align">
            <a
              href="#change"
              aria-controls="settings"
              role="tab"
              data-toggle="tab"
              className="white-text hidden-xs hide-md text-bold"
            >
              {t("change_password")}
            </a>
            <a
              href="#change"
              aria-controls="settings"
              role="tab"
              data-toggle="tab"
              className="white-text visible-xs"
            >
              <i className="fa fa-key"></i>
            </a>
          </li>
          <li role="presentation" className="right-align">
            <a
              href="#update"
              aria-controls="settings"
              role="tab"
              data-toggle="tab"
              className="white-text hidden-xs hide-md text-bold"
            >
              {t("update_profile")}
            </a>
            <a
              href="#update"
              aria-controls="settings"
              role="tab"
              data-toggle="tab"
              className="white-text visible-xs"
            >
              <i className="fa fa-pencil-square-o"></i>
            </a>
          </li>
          <li role="presentation" className="right-align">
            <a
              href="#gallery"
              aria-controls="settings"
              role="tab"
              data-toggle="tab"
              className="white-text hidden-xs hide-md text-bold"
              onClick={getGalleryDetails}
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
            <i class="fas fa-images"></i>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default translate(ProfileNavSec);