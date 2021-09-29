import React, { Component } from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { translate, t } from "react-multi-lang";


class SinglePageVideo extends Component {
  state = {};
  render() {
    const { video } = this.props;
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div className="live-video-box border-zero live-video-box-small">
            <ReactPlayer
              ref={this.ref}
              url={video.hls_video_url}
              controls={true}
              width="100%"
              height="100%"
              playing={true}
            />

            <div className="user-profile spacing">
              <div className="row">
                <div className="col-md-6  resp-text-center">
                  <h4 className="h4-s title overflow">{video.title}</h4>
                  <h5 className="h5-s desc text-grey-clr">
                    {video.description}
                  </h5>
                </div>
                <div className="col-md-6 ">
                  <div className="user-img text-right resp-text-center">
                    <img src={video.user_picture} alt="user" />
                    <h3 className="upload-txt-name">{t("uploaded_by")}</h3>

                    <Link
                      to={`/profile/${video.user_unique_id}`}
                      className="streamer-name overflow"
                    >
                      {video.user_name}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default translate(SinglePageVideo);
