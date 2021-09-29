import React, { Component } from "react";
import HomeRightSideFollowerList from "./HomeRightSideFollowerList";
import HomeRightSideRecentStream from "./HomeRightSideRecentStream";
import { Link } from "react-router-dom";
import { translate, t } from "react-multi-lang";


class HomeRightSideSec extends Component {
  state = {};
  render() {
    const {
      popularLiveVideoData,
      loadingPopularLiveVideoData,
      userSuggesstionData,
      loadingUserSuggesstionData,
      totalFollowings,
      totalFollowers,
      totalLiveVideos,
    } = this.props;
    return (
      <div
        className="col-xs-12 col-sm-4 col-md-4 col-lg-4 zero-padding hidden-xs"
        id="side-view"
      >
        <div className="user-profile text-center">
          {localStorage.getItem("userLoginStatus") ? (
            <>
              <Link to={"/account"}>
                <div className="profile-user-img">
                  <img
                    className="img-circle img-responsive"
                    src={localStorage.getItem("user_picture")}
                    width="150"
                    height="150"
                  />
                </div>
              </Link>
              <h4 className="h4-s user-name text-bold">
                {localStorage.getItem("username")}
              </h4>
              <span className="user-dt">
                <div className="stnw-divStats">
                  <ul className="stnw-Arrange">
                    {localStorage.getItem("isStreamer") ? (
                      <li className="stnw-ArrangeSizeFit">
                        
                          <span className="stnw-StatValue">
                          {totalLiveVideos}
                          </span>
                          <span className="stnw-StatLabel stnw-block">
                            {t("streams")}
                          </span>
                        
                      </li>
                    ) : (
                      ""
                    )}
                    <li className="stnw-ArrangeSizeFit">
                      <Link
                        to={"/following"}
                        title={localStorage.getItem("total_followings")}
                      >
                        <span className="stnw-StatValue">
                          {totalFollowings}
                        </span>
                        <span className="stnw-StatLabel stnw-block">
                          {t("following")}
                        </span>
                      </Link>
                    </li>
                    <li className="stnw-ArrangeSizeFit">
                      <Link
                        to={"/follower"}
                        title={localStorage.getItem("total_followers")}
                      >
                        <span className="stnw-StatValue">
                          {totalFollowers}
                        </span>
                        <span className="stnw-StatLabel stnw-block">
                          {t("followers")}
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </span>
              {localStorage.getItem("isStreamer") == 1 ? (
                <Link
                  to={"/broadcast"}
                  className="btn btn-default btn-block btn-lg"
                >
                  {t("go_live")}
                </Link>
              ) : (
                ""
              )}
           <hr/>
            </>
          ) : null}
          <HomeRightSideFollowerList
            userSuggesstionData={userSuggesstionData}
            loadingUserSuggesstionData={loadingUserSuggesstionData}
          />

          <HomeRightSideRecentStream
            popularLiveVideoData={popularLiveVideoData}
            loadingPopularLiveVideoData={loadingPopularLiveVideoData}
          />
        </div>
      </div>
    );
  }
}

export default translate(HomeRightSideSec);
