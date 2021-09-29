import React, { Component } from "react";
import ProfileBlockCard from "./ProfileBlockCard";
import { translate, t } from "react-multi-lang";

class ProfileBlockList extends Component {
  state = {};
  render() {
    const {
      blockedUserData,
      loadingBlock,
      loadMoreButtonDisable,
      loadMoreLoadingContent,
      loadMore,
      unBlockUser,
      loadingContentUnblock,
      unBlockButtonDisable,
      unBlockInput,
    } = this.props;
    return (
      <div id="blocked-list" className=" tab-pane fade zero-padding">
        {loadingBlock ? (
          t('loading')
        ) : blockedUserData.length > 0 ? (
          <div className="container top-bottom-spacing">
            <div className="container">
              <div className="row">
                {blockedUserData.map((user) => (
                  <ProfileBlockCard
                    key={user.block_user_id}
                    user={user}
                    unBlockUser={unBlockUser}
                    unBlockButtonDisable={unBlockButtonDisable}
                    unBlockInput={unBlockInput}
                    loadingContentUnblock={loadingContentUnblock}
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
                  onClick={(event) => loadMore(event, "blockedUser")}
                  disabled={loadMoreButtonDisable}
                >
                  {loadMoreLoadingContent != null
                    ? loadMoreLoadingContent
                    : t('load_more')}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="container top-bottom-spacing">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="no-data-found-img">
                    <img src="../assets/img/no-data-found.png"></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default translate(ProfileBlockList);
