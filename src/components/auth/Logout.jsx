import React, { Component } from "react";
import api from "../../Environment";
import ToastContent from "../helper/ToastContent";
import { withToastManager } from "react-toast-notifications";

class Logout extends Component {
  state = {
    loadingContent: null,
    buttonDisable: false,
  };
  componentDidMount() {
    api.postMethod("logout").then((response) => {
        if (response.data.success) {
             ToastContent(this.props.toastManager, response.data.message, "success");
             this.setState({ loadingContent: null, buttonDisable: false });
            console.log("success");
        } else {
          ToastContent(this.props.toastManager, response.data.error, "error");
          this.setState({ loadingContent: null, buttonDisable: false });

        }
    });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userLoginStatus");
    localStorage.removeItem("user_picture");
    localStorage.removeItem("username");
    localStorage.removeItem("total_followers");
    localStorage.removeItem("total_followings");
    localStorage.removeItem("total_live_videos");
    this.props.history.push("/");
  }
  render() {
    return "";
  }
}

export default withToastManager(Logout);
