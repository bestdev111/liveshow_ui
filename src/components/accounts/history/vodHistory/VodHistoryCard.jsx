import React, { Component } from "react";
import { translate, t } from "react-multi-lang";

class VodHistoryCard extends Component {
  state = {};
  render() {
    return (
      <div className="col-md-12">
        <div className="notify-box">
          <div className="row">
            <div className="col-md-7">
              <div className="row">
                <div className="col-md-6">
                  <div className="notify-img">
                    <a href="#" className="user-profile">
                      <img src="assets/img/moon-bg.jpg" alt="" />
                    </a>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="notify-content">
                    <h4>{t("video_name")}</h4>
                    <p>
                      {t("layout_and_visual_mockups")}
                    </p>
                    <h5 className="h5-s user-name text-grey-clr mt-5">
                      <i className="fa fa-calendar-alt icon"></i>March 30, 2020
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5 text-right resp-left">
              <a href="#">
                <div className="notify-close-icon">
                  <i className="fas fa-times"></i>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default translate(VodHistoryCard);