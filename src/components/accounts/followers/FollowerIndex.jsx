import React, { Component } from "react";
import Sidebar from "../../layouts/sidebar/Sidebar";
import FollowerCard from "./FollowerCard";
import api from "../../../Environment";
import ToastContent from "../../helper/ToastContent";
import { withToastManager } from "react-toast-notifications";
import { translate, t } from "react-multi-lang";

class FollowerIndex extends Component {
  state = {
    followerData: null,
    loadingFollower: true,
    skipCount: 0,
    loadMoreButtonDisable: false,
    loadingContent: null,
    followButtonDisable: false,
    followButtonLoadingContent: null,
    followInputData: {},
    unfollowButtonDisable: false,
    unfollowButtonLoadingContent: null,
    unfollowInputData: {},
  };
  componentDidMount() {
    const inputData = {
      skip: this.state.skipCount,
    };
    this.getFollowerDetails(inputData);
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

    this.getFollowerDetails(inputData);
  };

  getFollowerDetails = (inputData) => {
    let items;
    api.postMethod("followers", inputData).then((response) => {
      if (response.data.success) {
        if (this.state.followerData != null) {
          items = [...this.state.followerData, ...response.data.data];
        } else {
          items = [...response.data.data];
        }
        this.setState({
          followerData: items,
          loadingFollower: false,
          skipCount: response.data.data.length + this.state.skipCount,
          loadMoreButtonDisable: false,
          loadingContent: null,
        });
      } else {
      }
    });
  };

  followUser = (event, user) => {
    event.preventDefault();
    const followInputData = { ...this.state.followInputData };
    followInputData["user_id"] = user.user_id;
    this.setState({ followInputData });
    this.setState({
      followbuttonDisable: true,
      followbuttonLoadingContent: t('loading'),
    });
    api
      .postMethod("users_follow", {
        user_id: user.user_id,
      })
      .then((response) => {
        if (response.data.success) {
          let array = [...this.state.followerData]; // make a separate copy of the array
          let index = array.indexOf(user);
          if (index !== -1) {
            array[index].show_unfollow = 1;
            array[index].show_follow = 0;
            this.setState({ followerData: array });
          }
          ToastContent(
            this.props.toastManager,
            response.data.message,
            "success"
          );
        } else {
          ToastContent(this.props.toastManager, response.data.error, "error");
        }
        this.setState({
          followbuttonDisable: false,
          followbuttonLoadingContent: null,
        });
      });
  };

  unFollowUser = (event, user) => {
    event.preventDefault();
    const unfollowInputData = { ...this.state.unfollowInputData };
    unfollowInputData["user_id"] = user.user_id;
    this.setState({ unfollowInputData });
    this.setState({
      unfollowbuttonDisable: true,
      unfollowbuttonLoadingContent: t('loading'),
    });
    api
      .postMethod("users_unfollow", {
        user_id: user.user_id,
      })
      .then((response) => {
        if (response.data.success) {
          let array = [...this.state.followerData]; // make a separate copy of the array
          let index = array.indexOf(user);
          if (index !== -1) {
            array[index].show_follow = 1;
            array[index].show_unfollow = 0;
            this.setState({ followerData: array });
          }
          ToastContent(
            this.props.toastManager,
            response.data.message,
            "success"
          );
        } else {
          ToastContent(this.props.toastManager, response.data.error, "error");
        }
        this.setState({
          unfollowbuttonDisable: false,
          unfollowbuttonLoadingContent: null,
        });
      });
  };

  render() {
    const {
      loadMoreButtonDisable,
      loadingContent,
      loadingFollower,
      followerData,
      followButtonDisable,
      followButtonLoadingContent,
      followInputData,
      unfollowButtonDisable,
      unfollowButtonLoadingContent,
      unfollowInputData,
    } = this.state;
    return (
      <div className="main">
        <Sidebar />
        <div class="sec-padding followers left-spacing1">
          <div class="public-video-header top-margin">{t("c_followers")}</div>
          {loadingFollower ? (
            t('loading')
          ) : followerData.length > 0 ? (
            <>
              <div class="row small-padding">
                {followerData.map((follower) => (
                  <FollowerCard
                    follower={follower}
                    followUser={this.followUser}
                    unFollowUser={this.unFollowUser}
                    followButtonDisable={followButtonDisable}
                    followButtonLoadingContent={followButtonLoadingContent}
                    followInputData={followInputData}
                    unfollowButtonDisable={unfollowButtonDisable}
                    unfollowButtonLoadingContent={unfollowButtonLoadingContent}
                    unfollowInputData={unfollowInputData}
                  />
                ))}
              </div>
              <div className="Spacer-10"></div>
              <div className="row">
                <div className="col-md-12 text-center">
                  <button
                    className="show-more-btn"
                    type="button"
                    onClick={(event) => this.loadMore(event)}
                    disabled={loadMoreButtonDisable}
                  >
                    {loadingContent != null ? loadingContent : t('load_more')}
                  </button>
                </div>
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

export default withToastManager(translate(FollowerIndex));