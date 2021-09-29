import React, { Component } from "react";
import Sidebar from "../../layouts/sidebar/Sidebar";
import FollowingCard from "./FolllowingCard";
import api from "../../../Environment";
import ToastContent from "../../helper/ToastContent";
import { withToastManager } from "react-toast-notifications";
import { translate, t } from "react-multi-lang";

class FollowingIndex extends Component {
  state = {
    followingData: null,
    loadingFollowing: true,
    skipCount: 0,
    loadMoreButtonDisable: false,
    loadingContent: null,
    buttonDisable: false,
    buttonLoadingContent: null,
    followingInputData: {},
  };
  componentDidMount() {
    const inputData = {
      skip: this.state.skipCount,
    };
    this.getFollowingDetails(inputData);
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

    this.getFollowingDetails(inputData);
  };

  getFollowingDetails = (inputData) => {
    let items;
    api.postMethod("followings", inputData).then((response) => {
      if (response.data.success) {
        if (this.state.followingData != null) {
          items = [...this.state.followingData, ...response.data.data];
        } else {
          items = [...response.data.data];
        }
        this.setState({
          followingData: items,
          loadingFollowing: false,
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
    api
      .postMethod("users_follow", {
        user_id: user.user_id,
      })
      .then((response) => {
        if (response.data.success) {
          let array = [...this.state.followingData]; // make a separate copy of the array
          let index = array.indexOf(user);
          if (index !== -1) {
            array[index].show_unfollow = 1;
            array[index].show_follow = 0;
            this.setState({ followingData: array });
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

  unFollowUser = (event, user) => {
    event.preventDefault();
    const followingInputData = { ...this.state.followingInputData };
    followingInputData["user_id"] = user.user_id;
    this.setState({ followingInputData });
    this.setState({
      buttonDisable: true,
      buttonLoadingContent:  t('loading'),
    });

    api
      .postMethod("users_unfollow", {
        user_id: user.user_id,
      })
      .then((response) => {
        if (response.data.success) {
          let array = [...this.state.followingData]; // make a separate copy of the array
          let index = array.indexOf(user);
          if (index !== -1) {
            array.splice(index, 1);
            this.setState({ followingData: array });
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
          buttonDisable: false,
          buttonLoadingContent: null,
        });
      });
  };

  render() {
    const {
      loadingContent,
      loadMoreButtonDisable,
      loadingFollowing,
      followingData,
      followingInputData,
      buttonLoadingContent,
      buttonDisable,
    } = this.state;
    return (
      <div className="main">
        <Sidebar />
        <div class="sec-padding  following left-spacing1">
          <div class="public-video-header top-margin">{t("c_following")}</div>
          {loadingFollowing ? (
             t('loading')
          ) : followingData.length > 0 ? (
            <>
              <div class="row small-padding">
                {followingData.map((following) => (
                  <FollowingCard
                    following={following}
                    followingInputData={followingInputData}
                    buttonDisable={buttonDisable}
                    buttonLoadingContent={buttonLoadingContent}
                    followUser={this.followUser}
                    unFollowUser={this.unFollowUser}
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
                    {loadingContent != null ? loadingContent :  t('load_more')}
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

export default withToastManager(translate(FollowingIndex));
