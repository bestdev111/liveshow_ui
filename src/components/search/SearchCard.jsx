import React, { Component } from "react";
import { translate, t } from "react-multi-lang";


class SearchCard extends Component {
  state = {};
  render() {
    return (
      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 top-margin">
        <div className="live-video-box">
          <div
            className="followers-img"
            style={{ backgroundImage: "url(assets/img/image2.jpg)" }}
          ></div>
          <div className="user-profile spacing">
            <h4 className="h4-s user-name text-bold overflow">John Doe</h4>
            <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <h4 className="h4-s user-name primary-clr">
                  <i className="fa fa-eye icon"></i>2 {t("followers")}
                </h4>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <button
                  className=" btn-default btn-follow right-align left"
                  type="button"
                >
                  <i className="fa fa-user-plus icon"></i> {t("follow")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default translate(SearchCard);
