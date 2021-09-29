import React, { Component } from "react";
import { Link } from "react-router-dom";

class SinglePageRecentCard extends Component {
  state = {};
  render() {
    const { video } = this.props;
    return (
      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
        <div className="live-video-box">
          <div
            className="public-img"
            style={{ backgroundImage: `url(${video.image})` }}
          >
            <Link
              to={{
                pathname: `/live-tv/single-view/${video.title}`,
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
          <div className="user-profile spacing">
            <h4 className="h4-s title overflow">{video.title}</h4>
            <h5 className="h5-s desc overflow">
              Publisher Name:{video.user_name}
            </h5>
          </div>
        </div>
        <div className="Spacer-10"></div>
      </div>
    );
  }
}

export default SinglePageRecentCard;
