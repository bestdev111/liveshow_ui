import React, { Component } from "react";
import OtherProFollowerSecCard from "./OtherProFollowerSecCard";
import { translate, t } from "react-multi-lang";

class OtherProFollowerSec extends Component {
  state = {};
  render() {
    const {
      loadingContent,
      loadMoreButtonDisable,
      loadingFollower,
      followerData,
      loadMore,
      followbuttonLoadingContent,
      followButtonDisable,
      followInputData,
      followUser,
      unFollowUser,
    } = this.props;
    return (
      <div id="followers" className=" tab-pane fade zero-padding">
        {loadingFollower ? (
          t('loading')
        ) : followerData.length > 0 ? (
          <>
            <div className="container">
              <div className="row">
                {followerData.map((user) => (
                  <OtherProFollowerSecCard
                    user={user}
                    followUser={followUser}
                    unFollowUser={unFollowUser}
                    followInputData={followInputData}
                    followbuttonLoadingContent={followbuttonLoadingContent}
                    followButtonDisable={followButtonDisable}
                  />
                ))}
              </div>
            </div>
            <div className="Spacer-10"></div>
            <div className="row">
              <div className="col-md-12 text-center">
                <button
                  className="show-more-btn"
                  type="button"
                  onClick={(event) => loadMore(event, "follower")}
                  disabled={loadMoreButtonDisable}
                >
                  {loadingContent != null ? loadingContent : t("load_more")}
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
    );
  }
}

export default translate(OtherProFollowerSec);
