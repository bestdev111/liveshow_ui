import React, { Component } from "react";
import StreamHistoryCard from "./StreamHistoryCard";
import Sidebar from "../../../layouts/sidebar/Sidebar";
import { translate, t } from "react-multi-lang";

class StreamHistoryIndex extends Component {
  state = {};
  render() {
    return (
      <div className="main">
        <Sidebar />
        <div class="sec-padding streamed-videos left-spacing1">
          <div class="Spacer-10"></div>
          <div class="public-video-header">{t("streaming_history")}</div>
          <div className="Spacer-10"></div>
          <div className="row small-padding">
            <StreamHistoryCard />
            <StreamHistoryCard />
            <StreamHistoryCard />
            <StreamHistoryCard />
          </div>
          <div class="Spacer-10"></div>
          <div className="text-center">
              <button className="show-more-btn">{t("show_more")}</button>
            </div>
        </div>
      </div>
    );
  }
}

export default translate(StreamHistoryIndex);
