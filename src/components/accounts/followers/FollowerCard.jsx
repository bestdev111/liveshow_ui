import React, { Component } from "react";
import { translate, t } from "react-multi-lang";

class FollowerCard extends Component {
  state = {};
  render() {
    const {
      follower,
      unFollowUser,
      followUser,
      followButtonDisable,
      followButtonLoadingContent,
      followInputData,
      unfollowButtonDisable,
      unfollowButtonLoadingContent,
      unfollowInputData,
    } = this.props;
    return (
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 top-margin">
        <div class="live-video-box">
          <a href="#"><div
            class="followers-img"
            style={{ backgroundImage: `url(${follower.picture})` }}
          ></div></a>
          <div class="user-profile spacing">
            <h4 class="h4-s user-name text-bold overflow">{follower.name}</h4>
            <div class="row">
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <h4 class="h4-s user-name primary-clr">
                  <i class="fa fa-eye icon"></i>
                  {follower.total_followers} {t("followers")}
                </h4>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                {follower.show_follow == 1 ? (
                  <button
                    class=" btn-default btn-follow right-align left"
                    type="button"
                    disabled={
                      followInputData.user_id == follower.user_id &&
                      followButtonDisable == true
                        ? true
                        : false
                    }
                    onClick={(event) => followUser(event, follower)}
                  >
                    <i class="fa fa-user-plus icon"></i>
                    {followInputData.user_id == follower.user_id &&
                    followButtonLoadingContent != null
                      ? followButtonLoadingContent
                      : t('follow')}
                  </button>
                ) : null}
                {follower.show_unfollow == 1 ? (
                  <button
                    class=" btn-default btn-follow right-align left"
                    type="button"
                    disabled={
                      unfollowInputData.user_id == follower.user_id &&
                      unfollowButtonDisable == true
                        ? true
                        : false
                    }
                    onClick={(event) => unFollowUser(event, follower)}
                  >
                    <i class="fa fa-user-plus icon"></i>{" "}
                    {unfollowInputData.user_id == follower.user_id &&
                    unfollowButtonLoadingContent != null
                      ? unfollowButtonLoadingContent
                      : t('unfollow')}
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default translate(FollowerCard);