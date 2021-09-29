import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { translate, t } from "react-multi-lang";

class Sidebar extends Component {
  state = {
    activeClassName: "active-pink",
    activeType: "home",
  };
  changeActiveType = (event, activeType) => {
    this.setState({
      activeType: activeType,
    });
  };
  render() {
    const { activeType, activeClassName } = this.state;
    return (
      <div className="side-menubar">
        <ul className="side-menubar1">
          <li className="side-men">
            <Link
              onClick={(event) => this.changeActiveType(event, "home")}
              to={"/"}
            >
              <i
                className={
                  activeType == "home"
                    ? "fa fa-home sidemenu-icon " + activeClassName
                    : "fa fa-home sidemenu-icon "
                }
              ></i>
            </Link>
          </li>
          <ul className="sidenav">
            <li>{t("homes")}</li>
          </ul>
          <li className="side-men">
            <NavLink activeClassName="active-pink" to={"/vod/video-list"}>
              <i
                className={
                  activeType == "vod-videos"
                    ? "fa fa-file-video-o sidemenu-icon " + activeClassName                                                                                   
                    : "fa fa-file-video-o sidemenu-icon"
                }
              ></i>
            </NavLink>
          </li>
          <ul className="sidenav1">
            <li>{t("vod_videos")}</li>
          </ul>
          <li className="side-men">
            <Link
              onClick={(event) => this.changeActiveType(event, "live-tv")}
              to={"/live-tv/view-all"}
            >
              <i
                className={
                  activeType == "live-tv"
                    ? "fa fa-video sidemenu-icon " + activeClassName
                    : "fa fa-video sidemenu-icon"
                }
              ></i>
            </Link>
          </li>
          <ul className="sidenav2">
            <li>{t("live_tv")}</li>
          </ul>
          {localStorage.getItem("userLoginStatus") ? (
            <>
              <li className="side-men">
                <Link
                  onClick={(event) => this.changeActiveType(event, "settings")}
                  to={"/settings"}
                >
                  <i className="fa fa-cog sidemenu-icon"></i>
                </Link>
              </li>
              <ul className="sidenav3">
                <li>{t("settings")}</li>
              </ul>

              {localStorage.getItem("isStreamer") == 1 ? (
                <span>
                  <li className="side-men">
                    <Link
                      onClick={(event) =>
                        this.changeActiveType(event, "broadcast")
                      }
                      to={"/broadcast"}
                    >
                      <i className="fa fa-globe sidemenu-icon"></i>
                    </Link>
                  </li>
                  <ul className="sidenav4">
                    <li>{t("broadcast_yourself")}</li>
                  </ul>
                </span>
              ) : (
                ""
              )}

              <li className="side-men">
                <Link
                  onClick={(event) => this.changeActiveType(event, "logout")}
                  to={"/logout"}
                >
                  <i className="fa fa-sign-in sidemenu-icon"></i>
                </Link>
              </li>
              <ul className="sidenav5">
                <li>{t("logout")}</li>
              </ul>
            </>
          ) : null}
        </ul>
      </div>
    );
  }
}

export default translate(Sidebar);
