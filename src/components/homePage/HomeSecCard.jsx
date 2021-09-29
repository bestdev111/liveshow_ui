import React, { Component } from "react";
import { Link } from "react-router-dom";
import { translate, t } from "react-multi-lang";

class HomeSecCard extends Component {
  state = {};
  render() {
    const { video } = this.props;
    return (
      <div class="live-video-box">
        <div class="embed-responsive embed-responsive-16by9 ">
          <div class="inner-video">
            <div
              class="profile-bg-image embed-responsive-item"
              style={{
                backgroundImage: `url(${video.snapshot})`,
              }}
            ></div>
          </div>
          <Link
            to={{
              pathname:
                video.is_user_needs_to_pay == 1 ? "/invoice" : "/broadcast",
              state: video,
            }}
          >
            <div class="playbtn">
              <div class="white-btn-play">
                <img src="assets/img/play-btn.png" />
              </div>
              <div class="pink-btn-play">
                <img src="assets/img/play-btn-pink.png" />
              </div>
            </div>
          </Link>
        </div>
        {video.is_user_needs_to_pay == 1 ? (
          <div class="content-stm-video">
            <div class="ribbon-1">
              <h4 class="head">{video.amount_formatted}</h4>
            </div>
          </div>
        ) : null}
        {/* <div class="content-stm-video">
          <div class="video-right-btn">
            <button class="btn btn-default btn-block btn-br" type="button">
              Lorem Ipsum Lorem
            </button>
            <button class="btn btn-default btn-block btn-br" type="button">
              Music
            </button>
            <button class="btn btn-default btn-block btn-br" type="button">
              Music
            </button>
          </div>
          <div class="video-content">
            <h1 class="h4-s text-bold top">{video.title}</h1>
            <div class="row video-watch-time">
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 watched-user">
                {t("watching")} - {video.viewer_cnt}
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 strated-time">
                {t("started")} - {video.publish_time}
              </div>
            </div>
            <div class="user-details">
              <Link to={`/profile/${video.user_unique_id}`}>
                <span class="user-img-sm">
                  <img
                    class="img-circle img-responsive user-details-img"
                    src={video.user_picture}
                  />
                </span>
                <span class="user-name-info">{video.user_name}</span>
              </Link>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

export default translate(HomeSecCard);
