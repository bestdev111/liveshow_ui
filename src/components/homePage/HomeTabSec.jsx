import React, { Component } from "react";
import { translate, t } from "react-multi-lang";

class HomeTabSec extends Component {
  state = {};
  render() {
    const {
      getLiveVideoPublicDetails,
      getLiveVideoPrivateDetails,
    } = this.props;
    return (
      <ul className="nav nav-tabs home-sec-tab" role="tablist">
        <li role="presentation" className="active">
          <a href="#home" aria-controls="home" role="tab" data-toggle="tab">
            {t("homes")}
          </a>
        </li>
        <li role="presentation">
          <a
            href="#public"
            aria-controls="messages"
            role="tab"
            data-toggle="tab"
            onClick={getLiveVideoPublicDetails}
          >
            {t("public")}
          </a>
        </li>
        <li role="presentation">
          <a
            href="#private"
            aria-controls="settings"
            role="tab"
            data-toggle="tab"
            onClick={getLiveVideoPrivateDetails}
          >
             {t("private")}
          </a>
        </li>
      </ul>
    );
  }
}

export default translate(HomeTabSec);
