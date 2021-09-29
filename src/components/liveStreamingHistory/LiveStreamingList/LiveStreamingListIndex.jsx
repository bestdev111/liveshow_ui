import React, { Component } from "react";
import api from "../../../Environment";
import _ from "lodash";
import { Link } from "react-router-dom";
import ToastContent from "../../helper/ToastContent";
import { withToastManager } from "react-toast-notifications";
import Sidebar from "../../layouts/sidebar/Sidebar";
import { translate, t } from "react-multi-lang";


class LiveStreamingListIndex extends Component {
  state = {
    liveStreamingData: null,
    loadingLiveStreaming: true,
    skipCount: 0,
    loadMoreButtonDisable: false,
    loadingContent: null,
    deletedVideoId: [],
    PPVInputData: {},
    PPVLoadingContent: null,
    PPVButtonDisable: false,
    isLoadingSearch: false,
    results: [],
    selectedPPVVideo: null,
  };
  componentDidMount() {
    const inputData = {
      skip: this.state.skipCount,
    };
    this.getLiveStreamingDetails(inputData);
  }

  loadMore = (event) => {
    event.preventDefault();
    this.setState({
      loadMoreButtonDisable: true,
      loadingContent: t("loading"),
    });
    const inputData = {
      skip: this.state.skipCount,
    };

    this.getLiveStreamingDetails(inputData);
  };

  getLiveStreamingDetails = (inputData) => {
    let items;
    api.postMethod("live_videos_owner_list", inputData).then((response) => {
      if (response.data.success) {
        if (this.state.liveStreamingData != null) {
          items = [...this.state.liveStreamingData, ...response.data.data];
        } else {
          items = [...response.data.data];
        }
        this.setState({
          liveStreamingData: items,
          loadingLiveStreaming: false,
          skipCount: response.data.data.length + this.state.skipCount,
          loadMoreButtonDisable: false,
          loadingContent: null,
        });
      } else {
      }
    });
  };

  deleteVodVideos = (event, video) => {
    event.preventDefault();
    api
      .postMethod("vod_videos_owner_delete", {
        vod_video_id: video.vod_video_id,
      })
      .then((response) => {
        if (response.data.success) {
          const deletedVideoId = [...this.state.deletedVideoId];
          deletedVideoId.push(video.vod_video_id);
          this.setState({ deletedVideoId });

          let array = [...this.state.liveStreamingData]; // make a separate copy of the array
          let index = array.indexOf(video);
          if (index !== -1) {
            array.splice(index, 1);
            this.setState({ liveStreamingData: array });
          }
          ToastContent(
            this.props.toastManager,
            response.data.message,
            "success"
          );
        } else {
          ToastContent(this.props.toastManager, response.data.error, "error");
        }
      });
  };

  handleSearchChange = ({ currentTarget: input }) => {
    this.setState({ isLoadingSearch: true });

    setTimeout(() => {
      if (input.value < 1)
        return this.setState({
          isLoadingSearch: false,
          results: [],
        });

      const re = new RegExp(_.escapeRegExp(input.value), "i");
      const isMatch = (result) => re.test(result.title);

      this.setState({
        isLoadingSearch: false,
        results: _.filter(this.state.liveStreamingData, isMatch),
      });
    }, 300);
  };

  render() {
    const { loadingLiveStreaming, liveStreamingData } = this.state;
    let renderData;
    if (this.state.results.length > 0) {
      renderData = this.state.results;
    } else {
      renderData = liveStreamingData;
    }
    return (
      <div className="main">
        <Sidebar />
        <div className="sec-padding vodlist live-streaming-history left-spacing1">
          <div className="Spacer-5"></div>
          <div className="public-video-header">{t("live_streaming_history")}</div>
          <div className="Spacer-10"></div>
          {loadingLiveStreaming ? (
            t("loading")
          ) : renderData.length > 0 ? (
            <div className="row small-padding">
              <div className="col-md-12 video-list">
                <div className="table-default left-adjust table-responsive newtable">
                  <div className="Spacer-5"></div>
                  <div className="row">
                    <div className="col-md-12">
                      <div id="wrap">
                        <form action="" autocomplete="on">
                          <input
                            name="search"
                            type="text"
                            onChange={this.handleSearchChange}
                            placeholder={t('search')}
                          />
                          <i className="fas fa-search"></i>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="Spacer-8"></div>
                  <table className="table m-0">
                    <thead>
                      <tr>
                        <th scope="col">{t("sl_no")}</th>
                        <th scope="col">{t("thumbnail")}</th>
                        <th scope="col">{t("title")}</th>
                        <th scope="col">{t("streamed_date")}</th>
                        <th scope="col">{t("revenue")}</th>
                        <th scope="col">{t("view_count")}</th>
                        <th scope="col">{t("view")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loadingLiveStreaming
                        ? t("loading")
                        : renderData.length > 0
                        ? renderData.map((video, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                <a href="#" className="user-profile">
                                  <img src={video.snapshot} alt="" />
                                </a>
                              </td>
                              <td>
                                <h5 className="listing-table-title">
                                  {video.title}
                                </h5>
                              </td>
                              <td>
                                <span className="listing-table-date">
                                  {video.created_at_formatted}
                                </span>
                              </td>
                              <td className="listing-table-ppv">
                                {video.amount_formatted}
                              </td>
                              <td>{video.viewer_cnt}</td>
                              <td>
                                <span className="badge badge-warning">
                                  <Link
                                    to={{
                                      pathname: `/live-streaming/single-view/${video.title}`,
                                      state: video,
                                    }}
                                  >
                                    View
                                  </Link>
                                </span>
                              </td>
                            </tr>
                          ))
                        : t("no_data_found")}
                    </tbody>
                  </table>
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <button
                        className="show-more-btn"
                        type="button"
                        onClick={this.loadMore}
                        disabled={this.state.loadMoreButtonDisable}
                      >
                        {this.state.loadingContent != null
                          ? this.state.loadingContent
                          : t("load_more")}
                      </button>
                    </div>
                  </div>
                  <div className="Spacer-5 resp-zero"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="row small-padding live-streaming-history">
              <div className="col-md-12 video-list">
                <div className="text-center">
                  <h4 className="text-muted ld-padding-sec">
                    {t("go_live_option")}
                  </h4>
                  <div className="Spacer10"></div>
                  <Link className="btn1 btn-sm" to="/broadcast">
                    {t("start_streaming_now")}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withToastManager(translate(LiveStreamingListIndex));