import React, { Component } from "react";
import { Link } from "react-router-dom";
import { translate, t } from "react-multi-lang";

class BroadcastPublicVideoSec extends Component {
  render() {
    const { liveVideoSuggesstion, loadingLiveVideoSuggesstion } = this.props;
    return (
      <div className="sec-padding  broad-cast-public">
        {loadingLiveVideoSuggesstion ? (
          t('loading')
        ) : liveVideoSuggesstion.length > 0 ? (
          <div>
            <div className="public-video-header">{t("public_videos")}</div>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="Spacer-5"></div>
                <div className="row small-padding">
                  {liveVideoSuggesstion.map((video) => (
                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 top-margin">
                      <div className="live-video-box">
                        <div
                          className="public-img"
                          style={{
                            backgroundImage: `url(${video.snapshot})`,
                          }}
                        >
                          <Link
                            to={{
                              pathname:
                                video.is_user_needs_to_pay == 1
                                  ? "/invoice"
                                  : "/broadcast",
                              state: video,
                            }}
                          >
                            <div className="playbtn1">
                              <div className="white-btn-play1">
                                <img
                                  src={
                                    window.location.origin +
                                    "/assets/img/play-btn.png"
                                  }
                                />
                              </div>
                              <div className="pink-btn-play1">
                                <img
                                  src={
                                    window.location.origin +
                                    "/assets/img/play-btn-pink.png"
                                  }
                                />
                              </div>
                            </div>
                          </Link>
                        </div>
                        <div className="user-profile spacing">
                          <h4 className="h4-s user-name text-bold overflow">
                            {video.title}
                          </h4>
                          <h5 className="h5-s user-name overflow">
                            {video.description}
                          </h5>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default translate(BroadcastPublicVideoSec);