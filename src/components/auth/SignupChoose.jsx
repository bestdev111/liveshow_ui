import React, { Component } from "react";
import Signup from "./Signup";
import { translate, t } from "react-multi-lang";

class SignupChoose extends Component {
  // state = {modalOpend : false, data: 1234};
  render() {
    const { ChooseSignUpType } = this.props;
    return (
      <li className="dropdown-submenu register-modal-display">
        <a
          href="#"
          className="dropdown-toggle btn-register"
          data-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
          // onClick={() => this.setState({ ...this.state, modalOpend: true })}
        >
          {t("sign_up")}
        </a>
        {/* {this.state.modalOpend && ( */}
        <ul className="dropdown-menu register-modal-menu dropdown-submenu-style signup-flex-modal" >
          <div className="row register-info">
            <div calss="col-md-12">
              <div className="options">
                <div className="row icons">
                  <div className="col-md-6">
                    <a
                      href="#"
                      data-toggle="modal"
                      data-target="#signup-streamer"
                      onClick={(event) => ChooseSignUpType(event, "creator")}
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
                        <p className="btn-signup">
                          {t("sign_up")} <i className="fas fa-chevron-right"></i>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="col-md-6">
                    <a
                      href="#"
                      data-toggle="modal"
                      data-target="#signup-streamer"
                      onClick={(event) => ChooseSignUpType(event, "viewer")}
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
                        <p className="btn-signup">
                          {t("sign_up")} <i className="fas fa-chevron-right"></i>
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ul>
        {/* )} */}
      </li>
    );
  }
}

export default translate(SignupChoose);