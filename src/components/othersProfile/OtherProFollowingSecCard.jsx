import React, { Component } from "react";
import { translate, t } from "react-multi-lang";


class OtherProFollowingSecCard extends Component {
  state = {};
  render() {
    const {
      user,
      followbuttonLoadingContent,
      followButtonDisable,
      followInputData,
      followUser,
      unFollowUser,
    } = this.props;
    return (
      <div className="col-xs-12 col-sm-4 col-md-3 col-lg-3 top-margin bottom-space">
        <div className="user-profile text-center box-shadow">
          <div className="profile-user-img">
            <img
              className="img-circle img-responsive following-img"
              src={user.picture}
            />
          </div>
          <h4 className="h4-s user-name text-bold overflow">{user.name}</h4>

          {localStorage.getItem("userLoginStatus") ? (
            <>
              {user.show_follow == 1 ? (
                <button
                  className="btn btn-default btn-block btn-lg"
                  type="button"
                  disabled={
                    followInputData.user_id == user.user_id &&
                    followButtonDisable
                      ? true
                      : false
                  }
                  onClick={(event) => followUser(event, user, "following")}
                >
                  {followInputData.user_id == user.user_id &&
                  followbuttonLoadingContent != null
                    ? followbuttonLoadingContent
                    : t("follow")}
                </button>
              ) : null}
              {user.show_unfollow == 1 ? (
                <button
                  className="btn btn-default btn-block btn-lg"
                  type="button"
                  disabled={
                    followInputData.user_id == user.user_id &&
                    followButtonDisable
                      ? true
                      : false
                  }
                  onClick={(event) => unFollowUser(event, user, "following")}
                >
                  {followInputData.user_id == user.user_id &&
                  followbuttonLoadingContent != null
                    ? followbuttonLoadingContent
                    : t("unfollow")}
                </button>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    );
  }
}

export default translate(OtherProFollowingSecCard);
