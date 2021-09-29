import React, { Component } from "react";
import { translate, t } from "react-multi-lang";

class FollowingCard extends Component {
  state = {};
  render() {
    const {
      following,
      followUser,
      unFollowUser,
      buttonDisable,
      buttonLoadingContent,
      followingInputData,
    } = this.props;
    return (
      <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 top-margin">
        <div class="user-profile text-center box-shadow">
          <a href="#"><div class="profile-user-img">
            <img
              class="img-circle img-responsive following-img"
              src={following.picture}
            />
          </div></a>
          <h4 class="h4-s user-name text-bold overflow">{following.name}</h4>
          {following.show_follow == 1 ? (
            <button
              class="btn btn-default btn-block btn-lg"
              type="button"
              onClick={(event) => followUser(event, following)}
            >
              {t("follow")}
            </button>
          ) : null}
          {following.show_unfollow == 1 ? (
            <button
              class="btn btn-default btn-block btn-lg"
              type="button"
              disabled={
                followingInputData.user_id == following.user_id &&
                buttonDisable == true
                  ? true
                  : false
              }
              onClick={(event) => unFollowUser(event, following)}
            >
              {followingInputData.user_id == following.user_id &&
              buttonLoadingContent != null
                ? buttonLoadingContent
                : t('unfollow')}
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}

export default translate(FollowingCard);