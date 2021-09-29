import React, { Component } from "react";
import { translate, t } from "react-multi-lang";


class OtherProBannerSec extends Component {
  state = {};
  render() {
    const {
      userData,
      followbuttonLoadingContent,
      followButtonDisable,
      blockDisablebBlock,
      blockLoadingContent,
      unBlockUser,
      blockUser,
      followUser,
      unFollowUser,
    } = this.props;
    return (
      <div className="container">
        <div className="Spacer-25 hidden-xs"></div>
        <div className="Spacer-18 visible-xs"></div>
        <div className=" row">
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 center-align">
            <div
              style={{
                backgroundImage: `url(${userData.picture})`,
              }}
              className="user-profile1"
            ></div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-8 col-lg-8 white-text">
            <div className="Spacer-10"></div>
            <h1 className="signup-head">{userData.name}</h1>
            <div className="Spacer-5"></div>
            <h4 className="signup-head">
              Followers - {userData.total_followers}{" "}
              <span className="left-spacing">
                Following - {userData.total_followings}
              </span>
            </h4>
            <div className="Spacer-3"></div>
            <hr />
            <div className="Spacer-3"></div>
            {localStorage.getItem("userLoginStatus") ? (
              <div>
                {userData.show_follow == 1 ? (
                  <button
                    className="btn2 width-150"
                    type="button"
                    disabled={followButtonDisable}
                    onClick={(event) => followUser(event, userData, "")}
                  >
                    <i className="fa fa-user-plus icon"></i>
                    {followbuttonLoadingContent != null
                      ? followbuttonLoadingContent
                      : t("follow")}
                  </button>
                ) : null}
                {userData.show_unfollow == 1 ? (
                  <button
                    className="btn2 width-150"
                    type="button"
                    disabled={followButtonDisable}
                    onClick={(event) => unFollowUser(event, userData, "")}
                  >
                    <i className="fa fa-user-plus icon"></i>{" "}
                    {followbuttonLoadingContent != null
                      ? followbuttonLoadingContent
                      : t("unfollow")}
                  </button>
                ) : null}

                <div className="Spacer-3 visible-xs"></div>
                {userData.show_block == 1 ? (
                  <button
                    className="btn3 width-150"
                    type="button"
                    disabled={blockDisablebBlock}
                    onClick={blockUser}
                  >
                    <i className="fa fa-ban icon"></i>{" "}
                    {blockLoadingContent != null
                      ? blockLoadingContent
                      : t("block")}
                  </button>
                ) : null}
                {userData.show_unblock == 1 ? (
                  <button
                    className="btn3 width-150"
                    type="button"
                    disabled={blockDisablebBlock}
                    onClick={unBlockUser}
                  >
                    <i className="fa fa-ban icon"></i>
                    {blockLoadingContent != null
                      ? blockLoadingContent
                      : t("unblock")}
                  </button>
                ) : null}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default translate(OtherProBannerSec);
