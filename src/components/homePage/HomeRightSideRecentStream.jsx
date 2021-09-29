import React, { Component } from "react";
import { Link } from "react-router-dom";
import { translate, t } from "react-multi-lang";


class HomeRightSideRecentStream extends Component {
  state = {};
  render() {
    const { loadingPopularLiveVideoData, popularLiveVideoData } = this.props;
    return (
      <div class="follow-users-list recent-streams userlist-new">
        <h5 class="h5-s stn-heading stn-sub-heading text-uppercase">{t("popular_streams")}</h5>
        {loadingPopularLiveVideoData
          ? t("loading")
          : popularLiveVideoData.length > 0
          ? popularLiveVideoData.map((video) => (
              <>
                <div class="user-details watch-user">
                  <span class="user-img-sm">
                    <img
                      class="img-circle img-responsive user-details-img"
                      src={video.snapshot}
                    />
                  </span>
                  <span class="user-name-info">{video.title}</span>
                  <span class="watch-btn-user recent-btn">
                    <Link
                      to={{
                        pathname:
                          video.is_user_needs_to_pay == 1
                            ? "/invoice"
                            : "/broadcast",
                        state: video,
                      }}
                      class="btn btn-default btn-block btn-br"
                    >
                      Watch
                    </Link>
                  </span>
                </div>
                <div class="clear-both"></div>
              </>
            ))
          : t("no_data_found")}
      </div>
    );
  }
}

export default translate(HomeRightSideRecentStream);
