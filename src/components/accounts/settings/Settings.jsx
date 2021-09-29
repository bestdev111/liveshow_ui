import React, { Component } from "react";
import Sidebar from "../../layouts/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { translate, t } from "react-multi-lang";

class Settings extends Component {
  state = {};
  render() {
    return (
      <div className="main">
        <Sidebar />
        <div className="sec-padding settings left-spacing1">
          <h3 className="heading-element text-center">{t("settings")}</h3>
          <div className="row">
            <Link to={"/account"}>
              <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                <div className="subcription-card">
                  <div className="text-center">
                    <i className="fa fa-user"></i>
                    <h3>{t("profile")}</h3>
                  </div>
                </div>
              </div>
            </Link>
            {/* <a
                            className="pointer"
                            data-toggle="modal"
                            data-target="#language-modal"
                            >
                            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                                <div className="subcription-card">
                                <div className="text-center">
                                    <i className="fa fa-language"></i>
                                    <h3>{t("language")}</h3>
                                </div>
                                </div>
                            </div>
                            </a> */}
            {localStorage.getItem("isStreamer") == 1 ? (
              <span>
                <Link to={"/subscriptions"}>
                  <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <div className="subcription-card">
                      <div className="text-center">
                        <i className="fa fa-paypal"></i>
                        <h3>{t("subscriptions")}</h3>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to={"/my-subscription-plans"}>
                  <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <div className="subcription-card">
                      <div className="text-center">
                        <i className="fa fa-history"></i>
                        <h3>{t("my_subscriptions")}</h3>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to={"/paid-live-streaming-history"}>
                  <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <div className="subcription-card">
                      <div className="text-center">
                        <i className="fa fa-play-circle"></i>
                        <h3>{t("paid_streaming_history")}</h3>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to={"/live-streaming/history/list"}>
                  <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <div className="subcription-card">
                      <div className="text-center">
                        <i className="fa fa-video-camera"></i>
                        <h3>{t("streaming_history")}</h3>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to={"/vod/list"}>
                  <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <div className="subcription-card">
                      <div className="text-center">
                        <i className="fa fa-video-camera"></i>
                        <h3>{t("vod_manager")}</h3>
                      </div>
                    </div>
                  </div>
                </Link>
                {/* <Link to={"/vod-history"}>
                                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                                    <div className="subcription-card">
                                    <div className="text-center">
                                        <i className="fa fa-history"></i>
                                        <h3>{t("vod_history")}</h3>
                                    </div>
                                    </div>
                                </div>
                                </Link> */}
                <Link to={"/revenue-dashboard"}>
                  <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <div className="subcription-card">
                      <div className="text-center">
                        <i className="fa fa-dollar"></i>
                        <h3>{t("revenue_dashboard")}</h3>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to={"/cards"}>
                  <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <div className="subcription-card">
                      <div className="text-center">
                        <i className="fa fa-credit-card"></i>
                        <h3>{t("cards")}</h3>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to={"/redeem"}>
                  <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <div className="subcription-card">
                      <div className="text-center">
                        <i className="fa fa-usd"></i>
                        <h3>{t("redeems")}</h3>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to={"/group/view-all"}>
                  <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <div className="subcription-card">
                      <div className="text-center">
                        <i className="fa fa-users"></i>
                        <h3>{t("groups")}</h3>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to={"/live-tv/list"}>
                  <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <div className="subcription-card">
                      <div className="text-center">
                        <i className="fa fa-video-camera"></i>
                        <h3>{t("live_tv")}</h3>
                      </div>
                    </div>
                  </div>
                </Link>
              </span>
            ) : (
              <span>
                <Link to={"/cards"}>
                  <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <div className="subcription-card">
                      <div className="text-center">
                        <i className="fa fa-credit-card"></i>
                        <h3>{t("cards")}</h3>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link to={"/paid-live-streaming-history"}>
                  <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <div className="subcription-card">
                      <div className="text-center">
                        <i className="fa fa-play-circle"></i>
                        <h3>{t("paid_streaming_history")}</h3>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to={"/group/view-all"}>
                  <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <div className="subcription-card">
                      <div className="text-center">
                        <i className="fa fa-users"></i>
                        <h3>{t("groups")}</h3>
                      </div>
                    </div>
                  </div>
                </Link>
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default translate(Settings);
