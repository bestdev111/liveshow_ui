import React, { Component } from "react";
import Sidebar from "../layouts/sidebar/Sidebar";
import FollowerCard from "../accounts/followers/FollowerCard";
import SearchCard from "./SearchCard";
import { translate, t } from "react-multi-lang";

class SearchIndex extends Component {
  state = {};

  render() {
    return (
      <div className="main">
        <Sidebar />
        <div class="sec-padding  search-results left-spacing1">
          <div class="Spacer-10"></div>
          <div class="public-video-header">{t("search_results")}</div>
          <div class="Spacer-5"></div>
          <div class="row small-padding">
            <SearchCard />
            <SearchCard />
            <SearchCard />
          </div>
        </div>
      </div>
    );
  }
}

export default translate(SearchIndex);
