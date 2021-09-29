import React, { Component } from "react";
import { translate, t } from "react-multi-lang";

class StreamHistoryCard extends Component {
  state = {};
  render() {
    return (
      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
        <div className="live-video-box">
          <div className="total-revenue-sec">
            <div className="total-revenue-amount">
              {t("total_revenue")}:&nbsp;<span className="black-clr">$18.4</span>
            </div>
          </div>
          <div
            className="paid-video-img"
            style={{
              backgroundImage:
                "url(https://live.appswamy.com/uploads/rooms/2944.png)",
            }}
          >
            <div className="p-10 text-right">
              <span className="label label-success">{t("public")}</span>
            </div>
            <div className="watch-count">
              <h5 className="h5-s user-name m-0">
                <i className="fa fa-eye icon"></i>0
              </h5>
            </div>
          </div>
          <div className="user-profile spacing resp-center">
            <h4 className="h4-s user-name text-bold overflow">{t("welcome_back")}</h4>
            <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-5 resp-center">
                <h5 className="h5-s user-name text-grey-clr mt-5 overflow">
                  <i className="fa fa-calendar-alt icon"></i>13 Apr 20
                </h5>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-7 text-right resp-center">
                <span className="label label-success">{t("broadcast_ended")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default translate(StreamHistoryCard);