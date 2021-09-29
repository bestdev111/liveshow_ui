import React, { Component } from "react";
import HomePublicCard from "./HomePublicCard";
import { translate, t } from "react-multi-lang";

class HomePublic extends Component {
  state = {};
  render() {
    const {
      loadingContent,
      loadMoreButtonDisable,
      liveVideoPublicData,
      loadingLiveVideoPublic,
    } = this.props;
    return (
      <div role="tabpanel" class="tab-pane" id="public">
        <div class="row">
          {loadingLiveVideoPublic ? (
            t("loading")
          ) : liveVideoPublicData.length > 0 ? (
            liveVideoPublicData.map((video) => (
              <>
                <HomePublicCard video={video} />
              </>
            ))
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

export default translate(HomePublic);
