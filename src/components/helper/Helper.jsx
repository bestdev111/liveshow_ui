import React, { Component } from "react";
import api from "../../Environment";
import { apiConstants } from "../Constant/constants";

class Helper extends Component {
  state = {
    profileData: {},
    loadingProfile: true,
    profileError: null,
    cardData: null,
    loadingCard: true,
    inputData: {},
    loadingContent: null,
    buttonDisable: false,
    imagePreviewUrl: null,
    videoPreviewUrl: null,
  };
  getUserDetails() {
    api.postMethod("profile").then((response) => {
      if (response.data.success) {
        this.setState({
          profileData: response.data.data,
          loadingProfile: false,
        });
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
      } else {
        const check = this.checkLoginUser(response.data);
        if (check) {
          this.setState({ profileError: "Please login to continue" });
        } else {
          this.setState({ profileError: response.data.error });
        }
      }
    });
  }

  listCardApi() {
    api.postMethod("cards_list").then((response) => {
      if (response.data.success) {
        this.setState({
          cardData: response.data.data,
          loadingCard: false,
        });
      } else {
      }
    });
  }

  handleChangeProData = ({ currentTarget: input }) => {
    const profileData = { ...this.state.profileData };
    profileData[input.name] = input.value;
    this.setState({ profileData });
  };

  checkMimeType = (event) => {
    //getting file object
    let files = event.target.files;
    //define message container
    let err = "";
    // list allow mime type
    const types = ["image/png", "image/jpeg", "image/gif"];
    // loop access array
    for (var x = 0; x < files.length; x++) {
      // compare file type find doesn't matach
      if (types.every((type) => files[x].type !== type)) {
        // create error message and assign to container
        err += files[x].type + " is not a supported format\n";
      }
    }

    if (err !== "") {
      // if message not same old that mean has error
      event.target.value = null; // discard selected file
      console.log(err);
      return false;
    }
    return true;
  };

  checkLoginUser(data) {
    return apiConstants.ERROR_CODE.includes(data.error_code);
  }

  handleChange = ({ currentTarget: input }) => {
    const inputData = { ...this.state.inputData };
    inputData[input.name] = input.value;
    this.setState({ inputData });
  };

  handleChangeImage = ({ currentTarget: input }) => {
    const inputData = { ...this.state.inputData };
    if (input.type === "file") {
      inputData[input.name] = input.files[0];
      this.setState({ inputData });
    }
    let reader = new FileReader();
    let file = input.files[0];

    reader.onloadend = () => {
      if (input.name == "picture" || input.name == "image")
        this.setState({
          imagePreviewUrl: reader.result,
        });
      if (input.name == "video")
        this.setState({
          videoPreviewUrl: reader.result,
        });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
}

export default Helper;
