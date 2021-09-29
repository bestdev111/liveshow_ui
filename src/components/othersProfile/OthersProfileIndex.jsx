import React, { Component } from "react";
import OtherProBannerSec from "./OthersProBannerSec";
import OtherProNavSec from "./OtherProNavSec";
import OtherProAboutSec from "./OtherProAboutSec";
import OtherProFollowerSec from "./OtherProFollowerSec";
import OtherProFollowingSec from "./OtherProFollowingSec";
import Sidebar from "../layouts/sidebar/Sidebar";
import api from "../../Environment";
import ToastContent from "../helper/ToastContent";
import { withToastManager } from "react-toast-notifications";
import OtherProGallerySec from "./OtherProGallerySec";
import { translate, t } from "react-multi-lang";

class OtherProfileIndex extends Component {
  state = {
    userData: null,
    loadingData: true,
    isBlocked: 0,
    followerData: null,
    loadingFollower: true,
    followingData: null,
    loadingFollowing: true,
    loadMoreButtonDisable: false,
    loadingContent: null,
    skipCountFollower: 0,
    skipCountFollowing: 0,
    skipCountGallery: 0,
    galleryData: null,
    loadingGallery: true,
    followbuttonLoadingContent: null,
    followButtonDisable: false,
    blockDisablebBlock: false,
    blockLoadingContent: null,
    followInputData: {},
  };

  componentDidMount() {
    this.getOtherProfileDetails();
  }

  getOtherProfileDetails = () => {
    api
      .postMethod("other_profile", {
        unique_id: this.props.match.params.user_unique_id,
      })
      .then((response) => {
        if (response.data.success) {
          this.setState({
            userData: response.data.data,
            loadingData: false,
          });
        } else {
        }
      });
  };

  blockUser = (event) => {
    event.preventDefault();
    this.setState({
      blockDisablebBlock: true,
      blockLoadingContent: t('loading'),
    });
    api
      .postMethod("users_block", {
        user_id: this.state.userData.user_id,
      })
      .then((response) => {
        if (response.data.success) {
          const userData = { ...this.state.userData };
          userData["show_unblock"] = 1;
          userData["show_block"] = 0;
          this.setState({ userData });

          ToastContent(
            this.props.toastManager,
            response.data.message,
            "success"
          );
        } else {
          ToastContent(this.props.toastManager, response.data.error, "error");
        }
        this.setState({
          blockDisablebBlock: false,
          blockLoadingContent: null,
        });
      });
  };

  unBlockUser = (event) => {
    event.preventDefault();
    this.setState({
      blockDisablebBlock: true,
      blockLoadingContent: t('loading'),
    });
    api
      .postMethod("users_unblock", {
        user_id: this.state.userData.user_id,
      })
      .then((response) => {
        if (response.data.success) {
          const userData = { ...this.state.userData };
          userData["show_unblock"] = 0;
          userData["show_block"] = 1;
          this.setState({ userData });

          ToastContent(
            this.props.toastManager,
            response.data.message,
            "success"
          );
        } else {
          ToastContent(this.props.toastManager, response.data.error, "error");
        }
        this.setState({
          blockDisablebBlock: false,
          blockLoadingContent: null,
        });
      });
  };

  followUser = (event, user, type) => {
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
          let array = [];
          if (type == "follower") {
            array = [...this.state.followerData];
          }
          if (type == "following") {
            array = [...this.state.followingData];
          }
          let index = array.indexOf(user);
          if (index !== -1) {
            array[index].show_unfollow = 1;
            array[index].show_follow = 0;
            this.setState({ followerData: array });
          } else {
            const userData = { ...this.state.userData };
            userData["show_unfollow"] = 1;
            userData["show_follow"] = 0;
            var total_followers = this.state.userData.total_followers + 1;
            userData["total_followers"] = total_followers;
            this.setState({ userData });
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

  unFollowUser = (event, user, type) => {
    event.preventDefault();
    const followInputData = { ...this.state.followInputData };
    followInputData["user_id"] = user.user_id;
    this.setState({ followInputData });
    this.setState({
      followbuttonDisable: true,
      followbuttonLoadingContent: t('loading'),
    });
    api
      .postMethod("users_unfollow", {
        user_id: user.user_id,
      })
      .then((response) => {
        if (response.data.success) {
          let array = [];
          if (type == "follower") {
            array = [...this.state.followerData];
          }
          if (type == "following") {
            array = [...this.state.followingData];
          }
          let index = array.indexOf(user);
          if (index !== -1) {
            array[index].show_unfollow = 0;
            array[index].show_follow = 1;
            this.setState({ followerData: array });
          } else {
            const userData = { ...this.state.userData };
            userData["show_unfollow"] = 0;
            userData["show_follow"] = 1;
            var total_followers = this.state.userData.total_followers - 1;
            userData["total_followers"] = total_followers;
            this.setState({ userData });
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

  loadMore = (event, type) => {
    event.preventDefault();
    this.setState({
      loadMoreButtonDisable: true,
      loadingContent: t('loading'),
    });
    if (type == "follower") {
      const inputData = {
        user_id: this.state.userData.user_id,
        skip: this.state.skipCountFollower,
      };
      this.getFollowerAPI(inputData);
    }
    if (type == "following") {
      const inputData = {
        user_id: this.state.userData.user_id,
        skip: this.state.skipCountFollowing,
      };
      this.getFollowingAPI(inputData);
    }
    if (type == "gallery") {
      const inputData = {
        user_id: this.state.userData.user_id,
        skip: this.state.skipCountGallery,
      };
      this.getGalleryAPI(inputData);
    }
  };

  getFollowerDetails = () => {
    if (this.state.followerData == null) {
      const inputData = {
        user_id: this.state.userData.user_id,
        skip: this.state.skipCountFollower,
      };
      this.getFollowerAPI(inputData);
    }
  };

  getFollowerAPI = (inputData) => {
    let items;
    api.postMethod("other_profile_followers", inputData).then((response) => {
      if (response.data.success) {
        if (this.state.followerData != null) {
          items = [...this.state.followerData, ...response.data.data];
        } else {
          items = [...response.data.data];
        }
        this.setState({
          followerData: items,
          loadingFollower: false,
          skipCountFollower:
            response.data.data.length + this.state.skipCountFollower,
          loadMoreButtonDisable: false,
          loadingContent: null,
        });
      } else {
      }
    });
  };

  getFollowingDetails = () => {
    if (this.state.followingData == null) {
      const inputData = {
        user_id: this.state.userData.user_id,
        skip: this.state.skipCountFollowing,
      };
      this.getFollowingAPI(inputData);
    }
  };

  getFollowingAPI = (inputData) => {
    let items;
    api.postMethod("other_profile_followings", inputData).then((response) => {
      if (response.data.success) {
        if (this.state.followingData != null) {
          items = [...this.state.followingData, ...response.data.data];
        } else {
          items = [...response.data.data];
        }
        this.setState({
          followingData: items,
          loadingFollowing: false,
          skipCountFollowing:
            response.data.data.length + this.state.skipCountFollowing,
          loadMoreButtonDisable: false,
          loadingContent: null,
        });
      } else {
      }
    });
  };

  getGalleryDetails = () => {
    if (this.state.galleryData == null) {
      const inputData = {
        user_id: this.state.userData.user_id,
        skip: this.state.skipCountGallery,
      };
      this.getGalleryAPI(inputData);
    }
  };

  getGalleryAPI = (inputData) => {
    let items;
    api.postMethod("other_profile_galleries", inputData).then((response) => {
      if (response.data.success) {
        if (this.state.galleryData != null) {
          items = [...this.state.galleryData, ...response.data.data];
        } else {
          items = [...response.data.data];
        }
        this.setState({
          galleryData: items,
          loadingGallery: false,
          skipCountGallery:
            response.data.data.length + this.state.skipCountGallery,
          loadMoreButtonDisable: false,
          loadMoreLoadingContent: null,
        });
      } else {
      }
    });
  };

  render() {
    const {
      userData,
      loadingData,
      loadMoreButtonDisable,
      loadingContent,
      loadingFollower,
      followerData,
      loadingFollowing,
      followingData,
      loadingGallery,
      galleryData,
      followbuttonLoadingContent,
      followButtonDisable,
      blockDisablebBlock,
      blockLoadingContent,
      followInputData,
    } = this.state;
    return (
      <div className="main">
        
        {loadingData ? (
          t("loading")
        ) : (
          <>
            <div
              class="profile-bg-image left-spacing1"
              style={{ backgroundImage: `url(${userData.cover})` }}
            >
              <OtherProBannerSec
                userData={userData}
                blockUser={this.blockUser}
                unBlockUser={this.unBlockUser}
                followUser={this.followUser}
                unFollowUser={this.unFollowUser}
                followbuttonLoadingContent={followbuttonLoadingContent}
                followButtonDisable={followButtonDisable}
                blockDisablebBlock={blockDisablebBlock}
                blockLoadingContent={blockLoadingContent}
              />

              <div class="Spacer-10"></div>
              <OtherProNavSec
                getFollowerDetails={this.getFollowerDetails}
                getFollowingDetails={this.getFollowingDetails}
                getGalleryDetails={this.getGalleryDetails}
              />
            </div>
            <div class="tab-content left-spacing1">
              <OtherProAboutSec userData={userData} />
              <OtherProFollowerSec
                loadingFollower={loadingFollower}
                followerData={followerData}
                loadMore={this.loadMore}
                loadingContent={loadingContent}
                loadMoreButtonDisable={loadMoreButtonDisable}
                followUser={this.followUser}
                unFollowUser={this.unFollowUser}
                followInputData={followInputData}
                followbuttonLoadingContent={followbuttonLoadingContent}
                followButtonDisable={followButtonDisable}
              />
              <OtherProFollowingSec
                loadingFollowing={loadingFollowing}
                followingData={followingData}
                loadMore={this.loadMore}
                loadingContent={loadingContent}
                loadMoreButtonDisable={loadMoreButtonDisable}
                followUser={this.followUser}
                unFollowUser={this.unFollowUser}
                followInputData={followInputData}
                followbuttonLoadingContent={followbuttonLoadingContent}
                followButtonDisable={followButtonDisable}
              />
              <OtherProGallerySec
                galleryData={galleryData}
                loadingGallery={loadingGallery}
                loadMoreButtonDisable={loadMoreButtonDisable}
                loadingContent={loadingContent}
                loadMore={this.loadMore}
              />
            </div>
          </>
        )}
      </div>
    );
  }
}

export default withToastManager(translate(OtherProfileIndex));
