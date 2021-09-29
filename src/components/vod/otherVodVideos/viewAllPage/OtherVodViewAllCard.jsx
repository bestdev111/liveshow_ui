import React, { Component } from "react";
import { Link } from "react-router-dom";

class OtherVodViewAllCard extends Component {
  state = {};
  render() {
    const { video } = this.props;
    return (
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 btm-mrg">
        <div class="live-video-box">
          <div
            class="public-img"
            style={{
              backgroundImage: `url(${video.image})`,
            }}
          >
            <Link
              to={{
                pathname:
                  video.is_user_needs_to_pay == 1
                    ? "/vod/invoice"
                    : `/vod/single/${video.title}`,
                state: video,
              }}
            >
              <div class="playbtn1">
                <div class="white-btn-play1">
                  <img
                    src={window.location.origin + "/assets/img/play-btn.png"}
                  />
                </div>
                <div class="pink-btn-play1">
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

export default OtherVodViewAllCard;
