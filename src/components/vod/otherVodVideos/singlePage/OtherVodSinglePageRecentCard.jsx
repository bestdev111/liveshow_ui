import React, { Component } from "react";
import { Link } from "react-router-dom";

class OtherVodSinglePageRecentCard extends Component {
  render() {
    const { video } = this.props;
    return (
      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 resp-mrg-btm resp-mrg-btm-md">
        <div className="live-video-box">
          <div
            className="public-img"
            style={{ backgroundImage: `url(${video.image})` }}
          >
            <Link
              to={{
                pathname:
                  video.is_needs_to_pay == 1
                    ? "/vod/invoice"
                    : `/vod/single/${video.title}`,
                state: video,
              }}
            >
              <div className="playbtn1">
                <div className="white-btn-play1">
                  <img
                    src={window.location.origin + "/assets/img/play-btn.png"}
                  />
                </div>
                <div className="pink-btn-play1">
                  <img
                    src={
                      window.location.origin + "/assets/img/play-btn-pink.png"
                    }
                  />
                </div>
              </div>
            </Link>
          </div>
          <div class="user-profile spacing">
            <h4 class="h4-s title  overflow">{video.title}</h4>
            <a href="#">
              <h5 class="h5-s desc overflow text-grey-clr">
                {video.user_name}{" "}
              </h5>
            </a>
            {video.amount != 0 ? (
              <span className="current-amount">{video.amount_formatted}</span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default OtherVodSinglePageRecentCard;
