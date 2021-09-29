import React, { Component } from "react";
import Sidebar from "../../layouts/sidebar/Sidebar";
import ViewAllCard from "./ViewAllCard";
import api from "../../../Environment";
import _ from "lodash";
import { translate, t } from "react-multi-lang";

class LiveTvViewAllIndex extends Component {
  state = {
    liveTVData: null,
    loadingLiveTv: true,
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
    this.getLiveTvData(inputData);
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

    this.getLiveTvData(inputData);
  };

  getLiveTvData = (inputData) => {
    let items;
    api.postMethod("livetv_list", inputData).then((response) => {
      if (response.data.success) {
        if (this.state.liveTVData != null) {
          items = [...this.state.liveTVData, ...response.data.data];
        } else {
          items = [...response.data.data];
        }
        this.setState({
          liveTVData: items,
          loadingLiveTv: false,
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
        results: _.filter(this.state.liveTVData, isMatch),
      });
    }, 300);
  };

  render() {
    const { loadingLiveTv, liveTVData } = this.state;
    let renderData;
    if (this.state.results.length > 0) {
      renderData = this.state.results;
    } else {
      renderData = liveTVData;
    }
    return (
      <div className="main">
        <Sidebar />
        <div class="sec-padding livetv left-spacing1">
          <div class="Spacer-5"></div>
          <div class="public-video-header">{t("live_tv")}</div>
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
            {loadingLiveTv
              ? t("loading")
              : renderData.length > 0
              ? renderData.map((video) => <ViewAllCard video={video} />)
              : t("no_data_found")}
          </div>
          <div class="Spacer-10"></div>
          <div class="row">
            <div class="col-md-12 text-center">
              <button class="show-more-btn" type="submit">
                {t("show_more")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default translate(LiveTvViewAllIndex);
