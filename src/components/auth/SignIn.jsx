import React, { Component } from "react";
import config from "react-global-configuration";
import GoogleLogin from "react-google-login";
import { translate, t } from "react-multi-lang";

class SignIn extends Component {
  state = {};
  render() {
    const {
      inputData,
      handleChange,
      handleLogin,
      handleGoogleResponse,
      loadingContent,
      buttonDisable,
      signInType,
      forgotPasswordClicked,
    } = this.props;
    return (
      <div
        className="modal fade modal-index login-modal"
        id="signin-streamer"
        role="dialog"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
              <h4 className="modal-title">{t("login")}</h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="header-content">
                    <h5>
                      {t("hey_there")} {signInType},
                    </h5>

                    {signInType == "creator" ? (
                      <p>{t("creator_login_tag")}</p>
                    ) : (
                      <p>{t("viewer_login_tag")}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="Spacer-10"></div>
              <div className="row">
                <div className="col-md-6">
                  <form onSubmit={handleLogin}>
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
                    <div className="modal-btn">
                      <button
                        type="submit"
                        className="btn-login"
                        disabled={buttonDisable}
                      >
                        {loadingContent != null ? loadingContent : t('login')}
                      </button>
                    </div>
                  </form>
                  <div className="mt-medium">
                    <a
                      href="/"
                      className="forgot-password-btn"
                      data-toggle="modal"
                      data-target="#forgot-password-stremer"
                      onClick={forgotPasswordClicked}
                    >
                      {t("forgot_password")}
                    </a>
                  </div>
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
                          href="/"
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
                                alt="google-logo"
                              />
                              <p>{t("sign_in_with_google")}</p>
                            </div>
                          </div>
                        </a>
                        // <button className="social"  onClick={renderProps.onClick}
                        //   disabled={renderProps.disabled}>
                        //   <i className="fab fa-google-plus-square google social-icons" />{" "}
                        //   Login Using Google
                        // </button>
                      )}
                      buttonText="Login"
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

export default translate(SignIn);
