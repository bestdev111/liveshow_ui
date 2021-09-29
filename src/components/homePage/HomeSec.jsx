import React, { Component } from "react";
import HomeSecCard from "./HomeSecCard";
import { translate, t } from "react-multi-lang";

class HomeSec extends Component {
  state = {};
  render() {
    const {
      loadingContent,
      loadMoreButtonDisable,
      liveVideoData,
      loadingLiveVideo,
    } = this.props;
    return (
      <div role="tabpanel" class="tab-pane active" id="home">
        {/* <div class="Spacer-10"></div> */}
        {loadingLiveVideo ? (
          t("loading")
        ) : liveVideoData.length > 0 ? (
          liveVideoData.map((video) => (
            <>
              <HomeSecCard video={video} />
              <div class="Spacer-10"></div>
            </>
          ))
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

export default translate(HomeSec);
