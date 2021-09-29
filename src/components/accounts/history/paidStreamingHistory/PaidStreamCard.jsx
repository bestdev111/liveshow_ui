import React, { Component } from "react";
import { translate, t } from "react-multi-lang";

class PaidStreamCard extends Component {
  render() {
    const {
      video,
      viewDetails,
      displayStatus,
      viewDetailsVideoId,
      closeDetails,
    } = this.props;
    return (
      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 top-margin">
        <div className="live-video-box relative">
          <div
            className="public-img"
            style={{
              backgroundImage: `url(${video.snapshot})`,
            }}
          >
            <a href="#">
              <div className="playbtn1">
                <div className="white-btn-play1">
                  <img src="assets/img/play-btn.png" />
                </div>
                <div className="pink-btn-play1">
                  <img src="assets/img/play-btn-pink.png" />
                </div>
              </div>
            </a>
            <div className="followers-count">
              <span>
                {video.live_video_amount_formatted}/{video.payment_mode}
              </span>
            </div>
          </div>
          <div className="user-profile spacing">
            <h4 className="h4-s user-name text-bold overflow">{video.title}</h4>
            <div className="mb-15">
              <h5 className="h5-s user-name text-grey-clr mt-5">
                <i className="fa fa-calendar-alt icon"></i>March 30, 2020
              </h5>
            </div>
            <div className="mb-15 align-left">
              <h5 className="h5-s user-name text-grey-clr mt-5">
                <i className="fa fa-clock-o icon"></i>11:30 am
              </h5>
            </div>
            <div className="text-right">
              <button
                className="view-btn view-more"
                onClick={(event) => viewDetails(event, video)}
              >
                {t("view_details")}
              </button>
            </div>
          </div>

          <div
            className="absolute-details"
            style={{
              display:
                viewDetailsVideoId == video.live_video_id ? "block" : "none",
            }}
          >
            <p className="pull-right pointer" onClick={closeDetails}>
              <i className="fa fa-close close-history"></i>
            </p>
            <h4 className="detail-head mt-0">{t("video_payment_details")}</h4>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-bar">
                  <div className="version1"></div>
                </div>
                <div className="history-content">
                  <ul>
                    <li>
                      <p className="text-grey-clr">{t("transaction_id")}</p>
                      <h4>
                        <span className="black-clr">{video.payment_id}</span>
                      </h4>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-bar">
                  <div className="version1"></div>
                </div>
                <div className="history-content">
                  <ul>
                    <li>
                      <p className="text-grey-clr">{t("amount")}</p>
                      <h4>
                        <span className="black-clr">
                          {video.live_video_amount_formatted}
                        </span>
                      </h4>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-bar">
                  <div className="version1"></div>
                </div>
                <div className="history-content">
                  <ul>
                    <li>
                      <p className="text-grey-clr">{t("paid_amount")}</p>
                      <h4>
                        <span className="black-clr">
                          {video.live_video_amount_formatted}
                        </span>
                      </h4>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default translate(PaidStreamCard);
