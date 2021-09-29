import React, { Component } from "react";
import Sidebar from "../../../layouts/sidebar/Sidebar";
import PaidStreamCard from "./PaidStreamCard";
import api from "../../../../Environment";
import { translate, t } from "react-multi-lang";

class PaidStreamIndex extends Component {
  state = {
    streamData: null,
    loadingStreamData: true,
    skipCount: 0,
    loadMoreButtonDisable: false,
    loadingContent: null,
    viewDetailsVideoId: 0,
    displayStatus: "none",
  };
  componentDidMount() {
    const inputData = {
      skip: this.state.skipCount,
    };
    this.getStreamDetails(inputData);
  }

  loadMore = (event) => {
    event.preventDefault();
    this.setState({
      loadMoreButtonDisable: true,
      loadingContent: t('loading'),
    });
    const inputData = {
      skip: this.state.skipCount,
    };

    this.getStreamDetails(inputData);
  };

  getStreamDetails = (inputData) => {
    let items;
    api
      .postMethod("live_videos_payment_history", inputData)
      .then((response) => {
        if (response.data.success) {
          if (this.state.streamData != null) {
            items = [...this.state.streamData, ...response.data.data];
          } else {
            items = [...response.data.data];
          }
          this.setState({
            streamData: items,
            loadingStreamData: false,
            skipCount: response.data.data.length + this.state.skipCount,
            loadMoreButtonDisable: false,
            loadingContent: null,
          });
        } else {
        }
      });
  };
  viewDetails = (event, video) => {
    event.preventDefault();
    this.setState({
      viewDetailsVideoId: video.live_video_id,
      displayStatus: "block",
    });
  };
  closeDetails = () => {
    this.setState({
      viewDetailsVideoId: 0,
    });
  };
  render() {
    const {
      streamData,
      loadingContent,
      loadMoreButtonDisable,
      loadingStreamData,
      viewDetailsVideoId,
      displayStatus,
    } = this.state;
    return (
      <div className="main">
        <Sidebar />

        <div class="sec-padding vodhistory left-spacing1">
          <div class="Spacer-5"></div>
          <div class="public-video-header">{t("paid_live_streaming_history")}</div>
          {loadingStreamData ? (
            t('loading')
          ) : streamData.length > 0 ? (
            <>
              <div class="row small-padding">
                {streamData.map((video) => (
                  <PaidStreamCard
                    video={video}
                    viewDetails={this.viewDetails}
                    closeDetails={this.closeDetails}
                    viewDetailsVideoId={viewDetailsVideoId}
                    displayStatus={displayStatus}
                  />
                ))}
              </div>
              <div class="Spacer-10"></div>
              <div className="text-center">
                <button
                  className="show-more-btn"
                  type="submit"
                  onClick={this.loadMore}
                  disabled={this.state.loadMoreButtonDisable}
                >
                  {this.state.loadingContent != null
                    ? this.state.loadingContent
                    : t('load_more')}
                </button>
              </div>
            </>
          ) : (
            <div className="no-data-found-img">
              <div className="Spacer-10"></div>
              <img src="../assets/img/no-data-found.png"></img>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default translate(PaidStreamIndex);
