import React, { Component } from "react";
import api from "../../Environment";
import { translate, t } from "react-multi-lang";
import Search from "../layouts/header/Search";
import { Link } from "react-router-dom";
import HomeEventCard from "./HomeEventCard";

class HomeIndex extends Component {
  state = {
    liveVideoData: null,
    loadingLiveVideo: true,
    skipCountLiveVideo: 0,
    liveVideoPublicData: null,
    loadingLiveVideoPublic: true,
    skipCountLiveVideoPublic: 0,
    liveVideoPrivateData: null,
    loadingLiveVideoPrivate: true,
    skipCountLiveVideoPrivate: 0,
    loadMoreButtonDisable: false,
    searchInputData: {},
    searchData: null,
    loadingSearch: true,
    searchLoadingContent: null,
    loadingContent: null,
    popularLiveVideoData: null,
    loadingPopularLiveVideoData: true,
    skipCountPopularLiveVideo: 0,
    userSuggesstionData: null,
    loadingUserSuggesstionData: true,
    skipCountUserSuggesstion: 0,
    totalLiveVideos: 0,
    totalFollowers: 0,
    totalFollowings: 0,
  };

  componentDidMount() {
    const inputData = {
      skip: this.state.skipCountLiveVideo,
    };
    this.getLiveVideoAPI(inputData);
    this.getPopularLiveVideo();
    this.getUserSuggesstion();
  }

  loadMore = (event, type) => {
    event.preventDefault();
    this.setState({
      loadMoreButtonDisable: true,
      loadingContent: t('loading'),
    });
    let inputData;
    if (type == "home") {
      inputData = {
        skip: this.state.skipCountLiveVideo,
      };
      this.getLiveVideoAPI(inputData);
    }
    if (type == "public") {
      inputData = {
        skip: this.state.skipCountLiveVideoPublic,
      };
      this.getLiveVideoPublicAPI(inputData);
    }
    if (type == "private") {
      inputData = {
        skip: this.state.skipCountLiveVideoPrivate,
      };
      this.getLiveVideoPrivateAPI(inputData);
    }
  };

  getLiveVideoAPI = (inputData) => {  
    let items;
    api.postMethod("home", inputData).then((response) => {
      if (response.data.success) {
        if (this.state.liveVideoData != null) {
          items = [...this.state.liveVideoData, ...response.data.data];
        } else {
          items = [...response.data.data];
        }
        this.setState({
          liveVideoData: items,
          loadingLiveVideo: false,
          skipCountLiveVideo:
            response.data.data.length + this.state.skipCountLiveVideo,
          loadMoreButtonDisable: false,
          loadingContent: null,
        });
      } else {
      }
    });
  };

  getLiveVideoPublicDetails = () => {
    const inputData = {
      skip: this.state.skipCountLiveVideoPublic,
    };
    if (this.state.liveVideoPublicData == null)
      this.getLiveVideoPublicAPI(inputData);
  };

  getLiveVideoPublicAPI = (inputData) => {
    let items;
    api.postMethod("live_videos_public", inputData).then((response) => {
      if (response.data.success) {
        if (this.state.liveVideoPublicData != null) {
          items = [...this.state.liveVideoPublicData, ...response.data.data];
        } else {
          items = [...response.data.data];
        }
        this.setState({
          liveVideoPublicData: items,
          loadingLiveVideoPublic: false,
          skipCountLiveVideoPublic:
            response.data.data.length + this.state.skipCountLiveVideoPublic,
          loadMoreButtonDisable: false,
          loadingContent: null,
        });
      } else {
      }
    });
  };

  getLiveVideoPrivateDetails = () => {
    const inputData = {
      skip: this.state.skipCountLiveVideoPrivate,
    };
    if (this.state.liveVideoPrivateData == null)
      this.getLiveVideoPrivateAPI(inputData);
  };

  getLiveVideoPrivateAPI = (inputData) => {
    let items;
    api.postMethod("live_videos_private", inputData).then((response) => {
      if (response.data.success) {
        if (this.state.liveVideoPrivateData != null) {
          items = [...this.state.liveVideoPrivateData, ...response.data.data];
        } else {
          items = [...response.data.data];
        }
        this.setState({
          liveVideoPrivateData: items,
          loadingLiveVideoPrivate: false,
          skipCountLiveVideoPrivate:
            response.data.data.length + this.state.skipCountLiveVideoPrivate,
          loadMoreButtonDisable: false,
          loadingContent: null,
        });
      } else {
      }
    });
  };

  getPopularLiveVideo = () => {
    const inputData = {
      skip: this.state.skipCountPopularLiveVideo,
    };
    if (this.state.popularLiveVideoData == null)
      this.getPopularLiveVideoAPI(inputData);
  };
  getPopularLiveVideoAPI = (inputData) => {
    let items;
    api.postMethod("live_videos_popular", inputData).then((response) => {
      if (response.data.success) {
        if (this.state.popularLiveVideoData != null) {
          items = [...this.state.popularLiveVideoData, ...response.data.data];
        } else {
          items = [...response.data.data];
        }
        this.setState({
          popularLiveVideoData: items,
          loadingPopularLiveVideoData: false,
          skipCountPopularLiveVideo:
            response.data.data.length + this.state.skipCountPopularLiveVideo,
          loadMoreButtonDisable: false,
          loadingContent: null,
        });
      } else {
      }
    });
  };

  handleSearchChange = ({ currentTarget: input }) => {
    this.setState({ searchLoadingContent: t('loading') });
    const searchInputData = { ...this.state.searchInputData };
    searchInputData[input.name] = input.value;
    this.setState({ searchInputData });
    setTimeout(() => {
      if (this.state.searchInputData.key.length > 0) {
        this.searchAPI();
      } else {
        this.setState({
          searchData: null,
          loadingSearch: true,
          searchLoadingContent: null,
        });
      }
    }, 1000);
  };

  searchAPI = () => {
    api
      .postMethod("users_search", this.state.searchInputData)
      .then((response) => {
        if (response.data.success) {
          this.setState({
            searchData: response.data.data,
            loadingSearch: false,
            searchLoadingContent: null,
          });
        } else {
        }
      });
  };

  clearSearchData = () => {
    this.setState({
      searchData: null,
      loadingSearch: true,
      searchLoadingContent: null,
    });
  };

  getUserSuggesstion = () => {
    const inputData = {
      skip: this.state.skipCountPopularLiveVideo,
    };
    if (this.state.userSuggesstionData == null)
      this.getUserSuggesstionAPI(inputData);
  };
  getUserSuggesstionAPI = (inputData) => {
    let items;
    api.postMethod("users_suggestions", inputData).then((response) => {
      console.log(response.data.data.suggestions);
      if (response.data.success) {
        if (this.state.userSuggesstionData != null) {
          items = [...this.state.userSuggesstionData, ...response.data.data.suggestions];
        } else {
          items = [...response.data.data.suggestions];
        }
        this.setState({
          userSuggesstionData: items,
          loadingUserSuggesstionData: false,
          skipCountUserSuggesstion:
            response.data.data.length + this.state.skipCountUserSuggesstion,
          loadMoreButtonDisable: false,
          loadingContent: null,
          totalLiveVideos: response.data.data.total_live_videos,
          totalFollowers: response.data.data.total_followers,
          totalFollowings: response.data.data.total_followings,
        });
      } else {
      }
    });
  };

  render() {
    const {
      searchInputData,
      searchData,
      loadingSearch,
      searchLoadingContent,
    } = this.state;
    return (
      <>
        <section className="video-stream position-relative">
          <video autoplay="true" controls="true">
            <source src="/assets/videos/sample.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </section>
        <section className="d-flex search-bar">
          <Search
            handleSearchChange={this.handleSearchChange}
            loadingSearch={loadingSearch}
            searchInputData={searchInputData}
            searchData={searchData}
            searchLoadingContent={searchLoadingContent}
            clearSearchData={this.clearSearchData}
          />
        </section>

        <section id="promoCarousel" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#promoCarousel" data-slide-to="0" class="active"></li>
            <li data-target="#promoCarousel" data-slide-to="1"></li>
            <li data-target="#promoCarousel" data-slide-to="2"></li>
          </ol>

          <div class="carousel-inner">
            <div class="item active">
              <img src="/assets/img/promo/1.jpg" alt="band1" />
            </div>

            <div class="item">
              <img src="/assets/img/promo/2.jpg" alt="jumping" />
            </div>

            <div class="item">
              <img src="/assets/img/promo/3.jpg" alt="city" />
            </div>
          </div>

          <a class="left carousel-control" href="#promoCarousel" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="right carousel-control" href="#promoCarousel" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right"></span>
            <span class="sr-only">Next</span>
          </a>
        </section>

        <section id="upcomingShows" class="upcoming-shows bg-black">
          <div class="container">
            <h2 class="upcoming-show-title text-center text-color-white">UPCOMING SHOW</h2>
            <div class="row">
              <HomeEventCard />
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default translate(HomeIndex);
