import React, { Component } from "react";
import OtherVodViewAllCard from "./OtherVodViewAllCard";
import Sidebar from "../../../layouts/sidebar/Sidebar";
import api from "../../../../Environment";
import _ from "lodash";
import { translate, t } from "react-multi-lang";
import ToastContent from "../../../helper/ToastContent";
import { withToastManager } from "react-toast-notifications";

class OtherVodViewAllIndex extends Component {
  state = {
    vodData: null,
    loadingVod: true,
    skipCount: 0,
    loadMoreButtonDisable: false,
    loadingContent: null,
    isLoadingSearch: false,
    results: [],
  };
  componentDidMount() {
    const inputData = {
      skip: this.state.skipCount,
    };
    this.getVodVideosList(inputData);
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

    this.getVodVideosList(inputData);
  };

  getVodVideosList = (inputData) => {
    let items;
    api.postMethod("vod_videos_list", inputData).then((response) => {
      if (response.data.success) {
        if (this.state.vodData != null) {
          items = [...this.state.vodData, ...response.data.data];
        } else {
          items = [...response.data.data];
        }

        if(response.data.data.length == 0){

          ToastContent(this.props.toastManager, "No videos found", "error");
          this.setState({ loadingContent: null, buttonDisable: false });
        }
        
        this.setState({
          vodData: items,
          loadingVod: false,
          skipCount: response.data.data.length + this.state.skipCount,
          loadMoreButtonDisable: false,
          loadingContent: null,
        });
      } else {
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
        results: _.filter(this.state.vodData, isMatch),
      });
    }, 300);
  };

  render() {
    const { loadingVod, vodData } = this.state;
    let renderData;
    if (this.state.results.length > 0) {
      renderData = this.state.results;
    } else {
      renderData = vodData;
    }
    return (
      <div className="main">
        <Sidebar />
        <div class="sec-padding livetv left-spacing1">
          <div class="Spacer-5"></div>
          <div class="public-video-header">{t("vod_videos")}</div>
          <div class="Spacer-10"></div>
          <div class="row small-padding">
            <div class="row">
              <div class="col-md-12">
                <div id="wrap">
                  <form action="" autocomplete="on">
                    <input
                      name="search"
                      type="text"
                      placeholder={t('search')}
                      onChange={this.handleSearchChange}
                    />
                    <i class="fas fa-search"></i>
                  </form>
                </div>
              </div>
            </div>
            <div class="Spacer-10"></div>
            {loadingVod ? (
              t("loading")
            ) : renderData.length > 0 ? (
              renderData.map((video) => <OtherVodViewAllCard video={video} />)
            ) : (
              <div className="no-data-found-img">
                <div className="Spacer-10"></div>
                <img src="../assets/img/no-data-found.png"></img>
              </div>
            )}
          </div>
          <div class="Spacer-5"></div>
          <div class="row">
            <div class="col-md-12 text-center">
              <button
                class="show-more-btn"
                type="submit"
                onClick={this.loadMore}
                disabled={this.state.loadMoreButtonDisable}
              >
                {this.state.loadingContent != null
                  ? this.state.loadingContent
                  : t("show_more")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withToastManager(translate(OtherVodViewAllIndex));
