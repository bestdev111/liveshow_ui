import React, { Component } from "react";
import OtherProFollowingSecCard from "./OtherProFollowingSecCard";
import { translate, t } from "react-multi-lang";

class OtherProFollowingSec extends Component {
  state = {};
  render() {
    const {
      loadingContent,
      loadMoreButtonDisable,
      loadingFollowing,
      followingData,
      loadMore,
      followbuttonLoadingContent,
      followButtonDisable,
      followInputData,
      followUser,
      unFollowUser,
    } = this.props;
    return (
      <div id="following" className=" tab-pane fade zero-padding">
        {loadingFollowing ? (
          t('loading')
        ) : followingData.length > 0 ? (
          <>
            <div className="container">
              <div className="row">
                {followingData.map((user) => (
                  <OtherProFollowingSecCard
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
                  onClick={(event) => loadMore(event, "following")}
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

export default translate(OtherProFollowingSec);
