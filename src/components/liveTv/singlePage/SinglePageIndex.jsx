import React, { Component } from "react";
import Sidebar from "../../layouts/sidebar/Sidebar";
import SinglePageVideo from "./SinglePageVideo";
import SinglePageRecentCard from "./SinglePageRecentCard";
import ToastContent from "../../helper/ToastContent";
import { withToastManager } from "react-toast-notifications";
import api from "../../../Environment";
import { translate, t } from "react-multi-lang";


class SinglePageIndex extends Component {
  state = {
    loadingVideo: true,
    suggesstionData: null,
    loadingSuggesstion: true,
    skipCount: 0,
    loadMoreButtonDisable: false,
    loadingContent: null,
  };
  componentDidMount() {
    if (this.props.location.state == null) {
      ToastContent(this.props.toastManager, "Video not found", "error");
      this.props.history.push("/live-tv/view-all");
    }
    this.setState({ loadingVideo: false });
    const inputData = {
      skip: this.state.skipCount,
    };
    this.getLiveTvSuggesstion(inputData);
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

    this.getLiveTvSuggesstion(inputData);
  };

  getLiveTvSuggesstion = (inputData) => {
    let items;
    api.postMethod("livetv_suggestions", inputData).then((response) => {
      if (response.data.success) {
        if (this.state.suggesstionData != null) {
          items = [...this.state.suggesstionData, ...response.data.data];
        } else {
          items = [...response.data.data];
        }
        this.setState({
          suggesstionData: items,
          loadingSuggesstion: false,
          skipCount: response.data.data.length + this.state.skipCount,
          loadMoreButtonDisable: false,
          loadingContent: null,
        });
      } else {
      }
    });
  };

  render() {
    if (this.state.loadingVideo) {
      return t("loading");
    } else {
      const video = this.props.location.state;
      const {
        suggesstionData,
        loadingSuggesstion,
        loadMoreButtonDisable,
        loadingContent,
      } = this.state;
      return (
        <div className="main">
          <Sidebar />
          <div class="sec-padding livetv-view left-spacing1">
            <div class="public-video-header-1">{t("live_tv_view")}</div>
            <div class="Spacer-10"></div>
            <SinglePageVideo video={video} />
            <div class="Spacer-15"></div>
            <div class="row">
              <div class="col-md-12">
                <div class="public-video-header">{t("suggesstion")} </div>
              </div>
            </div>
            <div class="Spacer-15"></div>
            {loadingSuggesstion ? (
              t("loading")
            ) : suggesstionData.length > 0 ? (
              <>
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="row small-padding">
                      {suggesstionData.map((video) => (
                        <SinglePageRecentCard video={video} />
                      ))}
                    </div>
                  </div>
                </div>
                <div class="Spacer-10"></div>
                <div class="row">
                  <div class="col-md-12 text-center">
                    <button
                      class="show-more-btn"
                      type="submit"
                      disabled={loadMoreButtonDisable}
                      onClick={this.loadMore}
                    >
                      {loadingContent != null ? loadingContent : t("show_more")}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              t("no_data_found")
            )}
          </div>
        </div>
      );
    }
  }
}

export default withToastManager(translate(SinglePageIndex));
