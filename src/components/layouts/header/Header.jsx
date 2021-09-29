import React, { Component } from "react";
import Notification from "./Notification";
import SignInChoose from "../../auth/SignInChoose";
import SignupChoose from "../../auth/SignupChoose";
import SignIn from "../../auth/SignIn";
import Signup from "../../auth/Signup";
import ToastContent from "../../helper/ToastContent";
import { withToastManager } from "react-toast-notifications";
import api from "../../../Environment";
import ForgotPassword from "../../auth/ForgotPassword";
import { Link } from "react-router-dom";
import { translate, t } from "react-multi-lang";
import logo from "./../../../logo2.svg";
import squareLogo from "./../../../small.png";

var const_time_zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const $ = window.$;

class Header extends Component {
  state = {
    signInType: null,
    signUpType: null,
    inputData: { timezone: const_time_zone },
    loadingContent: null,
    buttonDisable: false,
    searchInputData: {},
    searchData: null,
    loadingSearch: true,
    searchLoadingContent: null,
    notificationCountLoading: true,
    notificationCount: null,
    notificationData: null,
    loadingNotification: true,
    profileData: {},
    activeType: "home",
  };
  componentDidMount() {
    this.getNotificationCount();
  }
  ChooseSignInType = (event, type) => {
    this.setState({ signInType: type });
    const inputData = { ...this.state.inputData };
    inputData["login_type"] = type;
    this.setState({ inputData });
  };

  ChooseSignUpType = (event, type) => {
    this.setState({ signUpType: type });
    const inputData = { ...this.state.inputData };
    inputData["login_type"] = type;
    this.setState({ inputData });
  };

  handleChange = ({ currentTarget: input }) => {
    const inputData = { ...this.state.inputData };
    inputData[input.name] = input.value;
    this.setState({ inputData });
  };

  forgotPasswordClicked = () => {
    // close login model.
    $("/signin-streamer").modal("hide");
  };

  handleLogin = (event) => {
    event.preventDefault();
    const path = this.props.location;
    this.setState({
      loadingContent: t('loading'),
      buttonDisable: true,
    });
    api
      .postMethod("login", this.state.inputData)
      .then((response) => {
        if (response.data.success) {
          localStorage.setItem("userId", response.data.data.user_id);
          localStorage.setItem("accessToken", response.data.data.token);
          localStorage.setItem("userLoginStatus", true);
          localStorage.setItem("user_picture", response.data.data.picture);
          localStorage.setItem(
            "isStreamer",
            response.data.data.is_content_creator
          );
          localStorage.setItem("username", response.data.data.name);
          localStorage.setItem(
            "total_followers",
            response.data.data.total_followers
          );
          localStorage.setItem(
            "total_followings",
            response.data.data.total_followings
          );
          localStorage.setItem(
            "total_live_videos",
            response.data.data.total_live_videos
          );

          ToastContent(
            this.props.toastManager,
            response.data.message,
            "success"
          );
          this.setState({
            loadingContent: null,
            buttonDisable: false,
          });
          $("/signin-streamer").modal("hide");
          if (path) {
            this.props.history.push(path.pathname);
          } else {
            this.props.history.push("/");
          }
          window.location.reload();
        } else {
          this.setState({
            loadingContent: null,
            buttonDisable: false,
          });
          ToastContent(this.props.toastManager, response.data.error, "error");
        }
      })
      .catch((error) => {
        this.setState({ loadingContent: null, buttonDisable: false });
      });
  };

  handleSignup = (event) => {
    event.preventDefault();
    const path = this.props.location;
    this.setState({
      loadingContent: t('loading'),
      buttonDisable: true,
    });
    api
      .postMethod("register", this.state.inputData)
      .then((response) => {
        if (response.data.success) {
          localStorage.setItem("userId", response.data.data.user_id);
          localStorage.setItem("accessToken", response.data.data.token);
          localStorage.setItem("userLoginStatus", true);
          localStorage.setItem("user_picture", response.data.data.picture);
          localStorage.setItem("username", response.data.data.name);
          localStorage.setItem(
            "isStreamer",
            response.data.data.is_content_creator
          );
          localStorage.setItem(
            "total_followers",
            response.data.data.total_followers
          );
          localStorage.setItem(
            "total_followings",
            response.data.data.total_followings
          );
          localStorage.setItem(
            "total_live_videos",
            response.data.data.total_live_videos
          );

          ToastContent(
            this.props.toastManager,
            response.data.message,
            "success"
          );
          this.setState({
            loadingContent: null,
            buttonDisable: false,
          });
          $("/signup-streamer").modal("hide");

          if (path) {
            this.props.history.push(path.pathname);
          } else {
            this.props.history.push("/");
          }
        } else {
          ToastContent(this.props.toastManager, response.data.error, "error");
          if (
            response.data.error_code == 1001 ||
            response.data.error_code == 1000
          ) {
            $("/signup-streamer").modal("hide");
          }
          this.setState({
            loadingContent: null,
            buttonDisable: false,
          });
        }
      })
      .catch(function (error) {});
  };

  handleGoogleResponse = (event) => {
    console.log("handleGoogleResponse", event);
    const { path } = this.props.location;
    const response = event.profileObj;
    if (response) {
      this.setState({
        loadingContent: t('loading'),
        buttonDisable: true,
      });

      const googleInputData = {
        social_unique_id: response.googleId,
        login_by: "google",
        email: response.email,
        name: response.name,
        picture: response.imageUrl,
        device_type: "web",
        device_token: "123466",
        timezone: const_time_zone,
        login_type: this.state.inputData.login_type,
      };

      api
        .postMethod("register", googleInputData)
        .then((response) => {
          if (response.data.success) {
            localStorage.setItem("userId", response.data.data.user_id);
            localStorage.setItem("accessToken", response.data.data.token);
            localStorage.setItem("userLoginStatus", true);
            localStorage.setItem(
              "isStreamer",
              response.data.data.is_content_creator
            );
            localStorage.setItem("user_picture", response.data.data.picture);
            localStorage.setItem("username", response.data.data.name);
            localStorage.setItem(
              "total_followers",
              response.data.data.total_followers
            );
            localStorage.setItem(
              "total_followings",
              response.data.data.total_followings
            );
            localStorage.setItem(
              "total_live_videos",
              response.data.data.total_live_videos
            );

            ToastContent(
              this.props.toastManager,
              response.data.message,
              "success"
            );
            this.setState({
              loadingContent: null,
              buttonDisable: false,
            });

            $("/signup-streamer").modal("hide");
            $("/signin-streamer").modal("hide");

            if (path) {
              this.props.history.push(path.pathname);
            } else {
              this.props.history.push("/");
            }
          } else {
            ToastContent(this.props.toastManager, response.data.error, "error");
            if (
              response.data.error_code == 1001 ||
              response.data.error_code == 1000
            ) {
              $("/signup-streamer").modal("hide");
              $("/signin-streamer").modal("hide");
            }
            this.setState({
              loadingContent: null,
              buttonDisable: false,
            });
          }
        })
        .catch(function (error) {});
    }
  };

  handleForgotPassword = (event) => {
    event.preventDefault();
    const path = this.props.location;

    this.setState({
      loadingContent: t('loading'),
      buttonDisable: true,
    });
    api
      .postMethod("forgot_password", this.state.inputData)
      .then((response) => {
        if (response.data.success) {
          ToastContent(
            this.props.toastManager,
            response.data.message,
            "success"
          );
          this.setState({
            loadingContent: null,
            buttonDisable: false,
          });
          $("/forgot-password-stremer").modal("hide");

          if (path) {
            this.props.history.push(path.pathname);
          } else {
            this.props.history.push("/");
          }
        } else {
          ToastContent(this.props.toastManager, response.data.error, "error");
          if (
            response.data.error_code == 1001 ||
            response.data.error_code == 1000
          ) {
            $("/forgot-password-stremer").modal("hide");
          }
          this.setState({
            loadingContent: null,
            buttonDisable: false,
          });
        }
      })
      .catch(function (error) {});
  };

  handleSearchChange = ({ currentTarget: input }) => {
    this.setState({ searchLoadingContent: t('loading') });
    const searchInputData = { ...this.state.searchInputData };
    searchInputData[input.name] = input.value;
    this.setState({ searchInputData });
    setTimeout(() => {
      if (this.state.searchInputData.key.length > 0) {
        this.searchAPI();
      } else {
        this.setState({
          searchData: null,
          loadingSearch: true,
          searchLoadingContent: null,
        });
      }
    }, 1000);
  };

  searchAPI = () => {
    api
      .postMethod("users_search", this.state.searchInputData)
      .then((response) => {
        if (response.data.success) {
          this.setState({
            searchData: response.data.data,
            loadingSearch: false,
            searchLoadingContent: null,
          });
        } else {
        }
      });
  };

  getNotificationCount = () => {
    api.postMethod("bell_notifications_count").then((response) => {
      if (response.data.success) {
        this.setState({
          notificationCount: response.data.data.count,
          notificationCountLoading: false,
        });
      } else {
      }
    });
  };

  getNotificationDetails = () => {
    if (this.state.notificationData == null) {
      this.getNotificationAPI();
    }
  };

  getNotificationAPI = () => {
    api.postMethod("bell_notifications").then((response) => {
      if (response.data.success) {
        this.setState({
          notificationData: response.data.data,
          loadingNotification: false,
        });
      } else {
      }
    });
  };
  changeActiveType = (event, activeType) => {
    this.setState({
      activeType: activeType,
    });
  };
  render() {
    const {
      signInType,
      signUpType,
      loadingContent,
      buttonDisable,
      inputData,
      notificationCount,
      notificationCountLoading,
      notificationData,
      loadingNotification,
    } = this.state;
    return (
      <>
        <header>
          <nav className="navbar navbar-default">
            <div className="text-center row" id="bs-example-navbar-collapse-1">
              <div className="flex-1 align-items-start">
                <Link to={"/"}><img src={squareLogo} className="logo-img hidden-lg hidden-md hidden-sm" alt="squarelogo"/></Link>
              </div>
              <div class="flex-1 visible-lg visible-md visible-sm main-logo-paadding">
                <Link to={"/"}><img src={logo} className="logo-img" alt="logo"/></Link>
              </div>
              <ul className="flex-1 nav-menus d-flex">

                <li class="btn dropdown visible-md visible-lg">
                  <a href="/" class="dropdown-toggle text-color-white" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">About<span class="caret"></span></a>
                  <ul class="dropdown-menu top-50 position-about">
                    <li><a href="/" className="dropdown-top-menu">About us</a></li>
                    <li><a href="/" className="dropdown-bottom-menu">Services</a></li>
                  </ul>
                </li>

                <li><a href="/" className="btn text-color-white visible-md visible-lg">FAQ</a></li>
                <li><a href="/" className="btn text-color-white visible-md visible-lg">Contact</a></li>
                {localStorage.getItem("userLoginStatus") ? (
                  <>
                    <Notification
                      notificationCountLoading={notificationCountLoading}
                      notificationCount={notificationCount}
                      getNotificationDetails={this.getNotificationDetails}
                      loadingNotification={loadingNotification}
                      notificationData={notificationData}
                    />

                    <li class="dropdown visible-md visible-lg">
                      <a href="/" class="dropdown-toggle text-color-white" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        <img
                          // src={(localStorage.getItem("user_picture")) ? (localStorage.getItem("user_picture")) : ("https://admin.lyveshow.com/uploads/users/44f3c8c2a1fb4e4bf14f8dbe5dd66f5319aa4791.jpg")}
                          src={"https://admin.lyveshow.com/uploads/users/44f3c8c2a1fb4e4bf14f8dbe5dd66f5319aa4791.jpg"}
                          className="user-img w-3 h-3"
                        />
                      </a>
                      <ul class="dropdown-menu top-50 user-avatar">
                        <li>
                        <Link
                          onClick={(event) =>
                            this.changeActiveType(event, "broadcast")
                          }
                          to={"/broadcast"}
                        >
                          <i className="fa fa-globe sidemenu-icon"></i>
                        </Link>
                        </li>
                        <li>
                          <Link
                            onClick={(event) => this.changeActiveType(event, "logout")}
                            to={"/logout"}
                          >
                            <i className="fa fa-sign-in sidemenu-icon"></i>
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </>
                ) : (
                  <>
                    <li class="dropdown visible-md visible-lg">
                      <a href="/" class="btn dropdown-toggle text-color-white" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">My Account<span class="caret"></span></a>
                      <ul class="dropdown-menu multi-level multi-attribute">
                        <SignInChoose
                          ChooseSignInType={this.ChooseSignInType}
                          signInType={signInType}
                        />
                        <SignupChoose
                          ChooseSignUpType={this.ChooseSignUpType}
                          signUpType={signUpType}
                        />
                      </ul>
                    </li>
                  </>
                )}
                <li class="visible-lg"><a href="/"><img src="/assets/img/social/facebook.svg" class="social-icon" alt="factbook"/></a></li>
                <li class="visible-lg"><a href="/"><img src="/assets/img/social/twitter.svg" class="social-icon" alt="twitter"/></a></li>
                <li class="visible-lg"><a href="/"><img src="/assets/img/social/instagram.svg" class="social-icon" alt="instagram"/></a></li>
              </ul>
            </div>

            </nav>

        </header>
          <SignIn
            signInType={signInType}
            inputData={inputData}
            handleLogin={this.handleLogin}
            loadingContent={loadingContent}
            buttonDisable={buttonDisable}
            handleChange={this.handleChange}
            forgotPasswordClicked={this.forgotPasswordClicked}
            handleGoogleResponse={this.handleGoogleResponse}
          />
          <Signup
            signUpType={signUpType}
            inputData={inputData}
            handleSignup={this.handleSignup}
            loadingContent={loadingContent}
            buttonDisable={buttonDisable}
            handleChange={this.handleChange}
          />
          <ForgotPassword
            signInType={signInType}
            inputData={inputData}
            handleForgotPassword={this.handleForgotPassword}
            loadingContent={loadingContent}
            buttonDisable={buttonDisable}
            handleChange={this.handleChange}
          />
      </>
    );
  }
}

export default withToastManager(translate(Header));
