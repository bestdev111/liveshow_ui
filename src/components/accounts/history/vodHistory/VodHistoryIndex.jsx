import React, { Component } from "react";
import Sidebar from "../../../layouts/sidebar/Sidebar";
import VodHistoryCard from "./VodHistoryCard";
import { translate, t } from "react-multi-lang";

class VodHistoryIndex extends Component {
  state = {};
  render() {
    return (
      <div className="main">
        <Sidebar />
        <div className="sec-padding vodstreaming left-spacing1">
          <div className="Spacer-5"></div>
          <div className="public-video-header">{t("vod_streaming")}</div>
          <div className="row small-padding">
            <div className="col-md-12">
              <div className="Spacer-10"></div>
              <div className="row">
                <div className="col-md-12 text-right">
                  <button className="btn2" type="submit">
                    {t("clear_all")}
                  </button>
                </div>
              </div>
              <div className="Spacer-10"></div>
              <div className="row">
                <VodHistoryCard />
                <VodHistoryCard />
                <VodHistoryCard />
              </div>
              <div className="Spacer-5"></div>
              <div className="row">
                <div className="col-md-12 text-center">
                  <button className="show-more-btn" type="submit">
                    {t("show_more")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default translate(VodHistoryIndex);
