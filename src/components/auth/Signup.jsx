import React, { Component } from "react";
import config from "react-global-configuration";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { translate, t } from "react-multi-lang";

class Signup extends Component {
  state = {};
  render() {
    const {
      inputData,
      handleChange,
      handleSignup,
      loadingContent,
      buttonDisable,
      signUpType,
      handleGoogleResponse,
    } = this.props;
    return (
      <div
        className="modal fade modal-index"
        id="signup-streamer"
        role="dialog"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
              <h4 className="modal-title">{t("register")}</h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="header-content">
                    <h5>
                      {t("hey_there")} {signUpType},
                    </h5>
                    {signUpType == "creator" ? (
                      <p>
                       {t("control_streaming_with_subscription_note")}
                      </p>
                    ) : (
                      <p>
                       {t("register_and_support_your_favorite")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="Spacer-10"></div>
              <div className="row">
                <div className="col-md-6">
                  <form onSubmit={handleSignup}>
                    <div className="form-group">
                      <input
                        type="name"
                        className="form-control"
                        id="exampleInputName"
                        placeholder={t('name')}
                        name="name"
                        value={inputData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder={t('email')}
                        name="email"
                        value={inputData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder={t('password')}
                        name="password"
                        value={inputData.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder={t('confirm_password')}
                        name="password_confirmation"
                        value={inputData.password_confirmation}
                        onChange={handleChange}
                      />
                    </div>
                    <p>
                      {t("sign_up_or_countinue")}{" "}
                      {config.get("configData.site_name")}{" "}
                      <Link to="/page/terms" target="_blank">
                        {t("terms_and_conditions")}
                      </Link>{" "}
                      and{" "}
                      <Link to="/page/privacy" target="_blank">
                        {t("privacy_policy")}
                      </Link>
                    </p>
                    {/* <div className="checkbox">
                        <label>
                            <input type="checkbox" />{" "}
                            <span className="checkbox-text">
                                {t("terms_of_privacy_policy")}
                            </span>
                        </label>
                    </div> */}
                    <div className="Spacer-2"></div>
                    <div className="modal-btn">
                      <button
                        href="#"
                        className="btn-register"
                        disabled={buttonDisable}
                      >
                        {loadingContent != null ? loadingContent : t('register')}
                      </button>
                    </div>
                  </form>
                </div>
                {config.get("configData.GOOGLE_CLIENT_ID") ? 
                <div className="divider">
                  <span>{t("or")}</span>
                </div>
                : ''}
                {config.get("configData.GOOGLE_CLIENT_ID") ? (
                  <div className="col-md-6">
                    <GoogleLogin
                      clientId={config.get("configData.GOOGLE_CLIENT_ID")}
                      render={(renderProps) => (
                        <a
                          href="#"
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                        >
                          <div className="google-info text-center">
                            <div className="google-img">
                              <img
                                src={
                                  window.location.origin +
                                  "/assets/img/google-logo.png"
                                }
                                className="logo-img"
                              />
                              <p>{t("sign_up_with_google")}</p>
                            </div>
                          </div>
                        </a>
                        // <button className="social"  onClick={renderProps.onClick}
                        //   disabled={renderProps.disabled}>
                        //   <i className="fab fa-google-plus-square google social-icons" />{" "}
                        //   Login Using Google
                        // </button>
                      )}
                      buttonText="Signup"
                      onSuccess={this.props.handleGoogleResponse}
                      onFailure={this.props.handleGoogleResponse}
                      cookiePolicy={"single_host_origin"}
                    />
                    {/* <a href="#">
                      <div className="google-info text-center">
                        <div className="google-img">
                          <img
                            src={
                              window.location.origin +
                              "/assets/img/google-logo.png"
                            }
                            className="logo-img"
                          />
                          <p>{t("sign_in_with_google")}</p>
                        </div>
                      </div>
                    </a> */}
                  </div>
                ) : (
                  " "
                )}
                <div className="Spacer-10"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default translate(Signup);