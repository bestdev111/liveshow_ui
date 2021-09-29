import React, { Component } from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import Sidebar from "../../layouts/sidebar/Sidebar";
import ToastContent from "../../helper/ToastContent";
import { withToastManager } from "react-toast-notifications";
import { translate, t } from "react-multi-lang";


class ViewSingleVodIndex extends Component {
  state = {
    loadingVideo: true,
  };
  componentDidMount() {
    if (this.props.location.state == null) {
      ToastContent(this.props.toastManager, t("video_not_found"), "error");
      this.props.history.push("/vod/list");
    }
    this.setState({ loadingVideo: false });
  }
  render() {
    if (this.state.loadingVideo) {
      return t("loading");
    } else {
      const video = this.props.location.state;
      return (
        <div className="main">
          <Sidebar />
          <div class="sec-padding livetv-view left-spacing1">
            <div class="Spacer-5"></div>
            <div class="public-video-header">{t("live_tv_view")}</div>
            <div class="Spacer-10"></div>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="live-video-box border-zero live-video-box-small">
                  <ReactPlayer
                    ref={this.ref}
                    url={video.video}
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
          </div>
        </div>
      );
    }
  }
}

export default withToastManager(translate(ViewSingleVodIndex));
