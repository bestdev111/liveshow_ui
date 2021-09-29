import React, { Component } from "react";
import { Link } from "react-router-dom";

class HomePublicCard extends Component {
  state = {};
  render() {
    const { video } = this.props;
    return (
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 top-margin">
        <div class="live-video-box">
          <div
            class="public-img"
            style={{ backgroundImage: `url(${video.snapshot})` }}
          >
            <Link
              to={{
                pathname:
                  video.is_user_needs_to_pay == 1 ? "/invoice" : "/broadcast",
                state: video,
              }}
            >
              <div class="playbtn1">
                <div class="white-btn-play1">
                  <img src="assets/img/play-btn.png" />
                </div>
                <div class="pink-btn-play1">
                  <img src="assets/img/play-btn-pink.png" />
                </div>
              </div>
            </Link>
            {video.is_user_needs_to_pay == 1 ? (
              <div class="">
                <div class="ribbon">
                  <h4 class="head">{video.amount_formatted}</h4>
                </div>
              </div>
            ) : null}
            <a href="#">
              <div class="followers-count">
                <i class="fa fa-eye icon"></i>
                <span>{video.viewer_cnt}</span>
              </div>
            </a>
          </div>
          <div class="user-profile spacing">
            <h4 class="h4-s user-name text-bold overflow">{video.user_name}</h4>
            <h5 class="h5-s user-name overflow">{video.title}</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePublicCard;
