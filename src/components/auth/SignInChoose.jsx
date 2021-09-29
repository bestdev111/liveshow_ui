import React, { Component } from "react";
import SignIn from "./SignIn";
import { translate } from "react-multi-lang";

class SignInChoose extends Component {
  render() {
    const { t } = this.props;
    const { ChooseSignInType } = this.props;
    return (
      
      <li className="dropdown-submenu login-modal-display ">
        <a
          href="#"
          className="dropdown-toggle btn-login"
          data-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
          className="btn-login"
        >
          {t("sign_in")}
        </a>
          <ul className="dropdown-menu login-modal-menu dropdown-submenu-style1 login-flex-modal">
            <div className="row login-info">
              <div calss="col-md-12">
                <div className="options">
                  <div className="row icons">
                    <div className="col-md-6">
                      <a
                        href="#"
                        data-toggle="modal"
                        data-target="#signin-streamer"
                        onClick={(event) => ChooseSignInType(event, "creator")}
                      >
                        <div className="streamer-box">
                          <div className="streamer-img">
                            <img
                              src={
                                window.location.origin +
                                "/assets/img/streamer.svg"
                              }
                              className="fav-icon-login"
                            />
                          </div>
                          <p>{t("Lyve Streamer")}</p>
                          <p className="sub-text">
                            {t("we_vibe_community")}
                          </p>
                          <p className="btn-signin">
                            {t("sign_in")} <i className="fas fa-chevron-right"></i>
                          </p>
                        </div>
                      </a>
                    </div>
                    <div className="col-md-6">
                      <a
                        href="#"
                        data-toggle="modal"
                        data-target="#signin-streamer"
                        onClick={(event) => ChooseSignInType(event, "viewer")}
                      >
                        <div className="viewer-box">
                          <div className="streamer-img">
                            <img
                              src={
                                window.location.origin + "/assets/img/viewer.svg"
                              }
                              className="fav-icon-login"
                            />
                          </div>
                          <p>{t("Lyve Viewer")}</p>
                          <p className="sub-text">
                            {t("thank_you_for_supporting")}
                          </p>

                          <p className="btn-signin">
                            {t("sign_in")} <i className="fas fa-chevron-right"></i>
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ul>
      </li>
    );
  }
}

export default translate(SignInChoose);