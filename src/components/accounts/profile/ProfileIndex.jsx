import React, { Component } from "react";
import Sidebar from "../../layouts/sidebar/Sidebar";
import ProfileBannerSec from "./ProfileBannerSec";
import ProfileNavSec from "./ProfileNavSec";
import ProfileUpdateSec from "./ProfileUpdateSec";
import ProfileChangePasswordSec from "./ProfileChangePasswordSec";
import ProfileDeleteSec from "./ProfileDeleteSec";
import Helper from "../../helper/Helper";
import ProfileBlockList from "./ProfileBlockList";
import ProfileAboutSec from "./ProfileAboutSec";
import api from "../../../Environment";
import ToastContent from "../../helper/ToastContent";
import { withToastManager } from "react-toast-notifications";
import ProfileGalleySec from "./ProfileGalleySec";
import ProfileGalleryUploadImage from "./ProfileGalleryUploadImage";
import { translate, t } from "react-multi-lang";

const $ = window.$;

class ProfileIndex extends Helper {
  state = {
    profileData: {},
    loadingProfile: true,
    loadingContent: null,
    buttonDisable: false,
    changePasswordData: {},
    DeleteAccData: {},
    inputData: {},
    imagePreviewUrl: null,
    coverPreviewUrl: null,
    blockedUserData: null,
    loadingBlock: true,
    loadMoreButtonDisable: false,
    loadMoreLoadingContent: null,
    skipCount: 0,
    loadingContentUnblock: null,
    unBlockInput: {},
    unBlockButtonDisable: false,
    skipCountGallery: 0,
    loadingGallery: true,
    galleryData: null,
    galleryInputData: {
      gallery_description: "",
      image: [],
    },
    galleryLoadingContent: null,
    galleryButtonDisable: false,
    galleryImages: [],
  };

  componentDidMount() {
    this.getUserDetails();
  }
  saveProfile = (event) => {
    event.preventDefault();
    this.setState({
      loadingContent: t("loading"),
      buttonDisable: true,
    });

    let userDetails = { ...this.state.profileData };
    const profileInputData = {
      name: userDetails.name,
      description: userDetails.description,
      email: userDetails.email,
    };
    this.updateProfileApiCall(profileInputData);
  };

  updateProfileApiCall = (inputData) => {
    api.postMethod("update_profile", inputData).then((response) => {
      if (response.data.success) {
        ToastContent(this.props.toastManager, response.data.message, "success");
        localStorage.setItem("user_picture", response.data.data.picture);
        localStorage.setItem("username", response.data.data.name);
        this.getUserDetails();
        this.setState({ loadingContent: null, buttonDisable: false });
      } else {
        ToastContent(this.props.toastManager, response.data.error, "error");
        this.setState({ loadingContent: null, buttonDisable: false });
      }
    });
  };

  handleChangePassword = ({ currentTarget: input }) => {
    const changePasswordData = { ...this.state.changePasswordData };
    changePasswordData[input.name] = input.value;
    this.setState({ changePasswordData });
  };

  changePassword = (event) => {
    event.preventDefault();
    this.setState({
      loadingContent: t("loading"),
      buttonDisable: true,
    });

    api
      .postMethod("change_password", this.state.changePasswordData)
      .then((response) => {
        if (response.data.success) {
          ToastContent(
            this.props.toastManager,
            response.data.message,
            "success"
          );
          this.setState({ loadingContent: null, buttonDisable: false });
        } else {
          ToastContent(this.props.toastManager, response.data.error, "error");
          this.setState({ loadingContent: null, buttonDisable: false });
        }
      });
  };

  handleChangeDeleteData = ({ currentTarget: input }) => {
    const DeleteAccData = { ...this.state.DeleteAccData };
    DeleteAccData[input.name] = input.value;
    this.setState({ DeleteAccData });
  };

  handleDelete = (event) => {
    event.preventDefault();
    this.setState({
      loadingContent: t("loading"),
      buttonDisable: true,
    });
    api
      .postMethod("delete_account", this.state.DeleteAccData)
      .then((response) => {
        if (response.data.success) {
          ToastContent(
            this.props.toastManager,
            response.data.message,
            "success"
          );

          this.setState({ loadingContent: null, buttonDisable: false });
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userId");
          localStorage.removeItem("userLoginStatus");
          localStorage.removeItem("user_picture");
          localStorage.removeItem("username");
          window.location = "/";
        } else {
          ToastContent(this.props.toastManager, response.data.error, "error");
          this.setState({ loadingContent: null, buttonDisable: false });
        }
      });
  };

  handleChangeImage = ({ currentTarget: input }) => {
    ToastContent(this.props.toastManager, t("upload_image_message"), "success");
    const inputData = { ...this.state.inputData };
    if (input.type === "file") {
      inputData[input.name] = input.files[0];
      console.log("input.files: ", input.files[0]);
      inputData["name"] = this.state.profileData.name;
      inputData["email"] = this.state.profileData.email;
      inputData["description"] = this.state.profileData.description;
      this.setState({ inputData });
    }
    let reader = new FileReader();
    let file = input.files[0];

    reader.onloadend = () => {
      if (input.name == "picture")
        this.setState({
          imagePreviewUrl: reader.result,
        });
      console.log("imagePreviewUrl: ", reader.result);
      if (input.name == "cover")
        this.setState({
          coverPreviewUrl: reader.result,
        });
    };
    if (file) {
      reader.readAsDataURL(file);
      setTimeout(() => {
        this.updateProfileApiCall(this.state.inputData);
      }, 1000);
    }
  };

  loadMore = (event, type) => {
    event.preventDefault();
    this.setState({
      loadMoreButtonDisable: true,
      loadMoreLoadingContent: t("loading"),
    });
    let inputData;
    if (type == "gallery") {
      inputData = {
        skip: this.state.skipCountGallery,
      };
      this.getGalleryAPI(inputData);
    }
    if (type == "blockedUser") {
      inputData = {
        skip: this.state.skipCount,
      };
      this.getBlockedUserAPI(inputData);
    }
  };

  getBlockedUserDetails = () => {
    if (this.state.blockedUserData == null) {
      const inputData = {
        skip: this.state.skipCount,
      };
      this.getBlockedUserAPI(inputData);
    }
  };

  getBlockedUserAPI = (inputData) => {
    let items;
    api.postMethod("users_blocked_list", inputData).then((response) => {
      if (response.data.success) {
        if (this.state.blockedUserData != null) {
          items = [...this.state.blockedUserData, ...response.data.data];
        } else {
          items = [...response.data.data];
        }
        this.setState({
          blockedUserData: items,
          loadingBlock: false,
          skipCount: response.data.data.length + this.state.skipCount,
          loadMoreButtonDisable: false,
          loadMoreLoadingContent: null,
        });
      } else {
      }
    });
  };

  unBlockUser = (event, user) => {
    event.preventDefault();
    const unBlockInput = { ...this.state.unBlockInput };
    unBlockInput["user_id"] = user.block_user_id;
    this.setState({ unBlockInput });
    this.setState({
      unBlockButtonDisable: true,
      loadingContentUnblock: t("loading"),
    });
    api
      .postMethod("users_unblock", {
        user_id: user.block_user_id,
      })
      .then((response) => {
        if (response.data.success) {
          let array = [...this.state.blockedUserData]; // make a separate copy of the array
          let index = array.indexOf(user);
          if (index !== -1) {
            array.splice(index, 1);
            this.setState({ blockedUserData: array });
          }
          ToastContent(
            this.props.toastManager,
            response.data.message,
            "success"
          );
        } else {
          ToastContent(this.props.toastManager, response.data.error, "error");
        }
        this.setState({
          unBlockButtonDisable: false,
          loadingContentUnblock: null,
        });
      });
  };

  getGalleryDetails = () => {
    if (this.state.galleryData == null) {
      const inputData = {
        skip: this.state.skipCountGallery,
      };
      this.getGalleryAPI(inputData);
    }
  };

  getGalleryAPI = (inputData) => {
    let items;
    api.postMethod("galleries", inputData).then((response) => {
      if (response.data.success) {
        if (this.state.galleryData != null) {
          items = [...this.state.galleryData, ...response.data.data];
        } else {
          items = [...response.data.data];
        }
        this.setState({
          galleryData: items,
          loadingGallery: false,
          skipCountGallery:
            response.data.data.length + this.state.skipCountGallery,
          loadMoreButtonDisable: false,
          loadMoreLoadingContent: null,
        });
      } else {
      }
    });
  };

  galleryInputChange = ({ currentTarget: input }) => {
    const galleryInputData = { ...this.state.galleryInputData };
    galleryInputData[input.name] = input.value;
    this.setState({ galleryInputData });
  };

  addGalleryImage = (event) => {
    const galleryInputData = { ...this.state.galleryInputData };
    galleryInputData["image"] = event.target.files[0];
    this.setState({ galleryInputData });
  };

  gallerySave = (event) => {
    event.preventDefault();
    this.setState({
      galleryButtonDisable: true,
      galleryLoadingContent: t("loading"),
    });
    api
      .postMethod("galleries_save", this.state.galleryInputData)
      .then((response) => {
        if (response.data.success) {
          ToastContent(
            this.props.toastManager,
            response.data.message,
            "success"
          );
          const galleryInputData = { ...this.state.galleryInputData };
          galleryInputData["image"] = [];
          galleryInputData["gallery_description"] = "";
          this.setState({ galleryInputData });
          this.setState({
            galleryLoadingContent: null,
            galleryButtonDisable: false,
          });
        } else {
          ToastContent(this.props.toastManager, response.data.error, "error");
          this.setState({
            galleryLoadingContent: null,
            galleryButtonDisable: false,
          });
        }
        $("#image_upload").modal("hide");
      });
  };

  deleteGalleryImage = (event, image) => {
    event.preventDefault();
    api
      .postMethod("galleries_delete", {
        gallery_id: image.gallery_id,
      })
      .then((response) => {
        if (response.data.success) {
          let array = [...this.state.galleryData]; // make a separate copy of the array
          let index = array.indexOf(image);
          if (index !== -1) {
            array.splice(index, 1);
            this.setState({ galleryData: array });
          }
          ToastContent(
            this.props.toastManager,
            response.data.message,
            "success"
          );
        } else {
          ToastContent(this.props.toastManager, response.data.error, "error");
        }
      });
  };

  resetForm = (event) => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    this.setState({ changePasswordData: {}, DeleteAccData: {} });
  };

  render() {
    const {
      profileData,
      loadingProfile,
      loadingContent,
      buttonDisable,
      changePasswordData,
      DeleteAccData,
      inputData,
      imagePreviewUrl,
      coverPreviewUrl,
      blockedUserData,
      loadingBlock,
      loadMoreButtonDisable,
      loadMoreLoadingContent,
      loadingContentUnblock,
      unBlockButtonDisable,
      unBlockInput,
      loadingGallery,
      galleryData,
      galleryLoadingContent,
      galleryButtonDisable,
      galleryInputData,
    } = this.state;
    return (
      <div className="main">
        <Sidebar />
        {loadingProfile ? (
          t("loading")
        ) : (
          <div
            class="profile-bg-image left-spacing1"
            style={{
              backgroundImage: `url(${
                coverPreviewUrl != null ? coverPreviewUrl : profileData.cover
              })`,
            }}
            // style={{ backgroundImage: `url(${profileData.cover})` }}
          >
            <ProfileBannerSec profileData={profileData} />
            <div className="Spacer-10"></div>
            <ProfileNavSec
              getBlockedUserDetails={this.getBlockedUserDetails}
              getGalleryDetails={this.getGalleryDetails}
            />
          </div>
        )}
        <div class="tab-content left-spacing1">
          {loadingProfile ? (
            t("loading")
          ) : (
            <React.Fragment>
              <ProfileAboutSec profileData={profileData} />
              <ProfileBlockList
                blockedUserData={blockedUserData}
                loadingBlock={loadingBlock}
                loadMoreButtonDisable={loadMoreButtonDisable}
                loadMoreLoadingContent={loadMoreLoadingContent}
                loadMore={this.loadMore}
                unBlockUser={this.unBlockUser}
                unBlockButtonDisable={unBlockButtonDisable}
                unBlockInput={unBlockInput}
                loadingContentUnblock={loadingContentUnblock}
              />
              <ProfileUpdateSec
                profileData={profileData}
                handleChangeProData={this.handleChangeProData}
                saveProfile={this.saveProfile}
                handleChangeImage={this.handleChangeImage}
                imagePreviewUrl={imagePreviewUrl}
                coverPreviewUrl={coverPreviewUrl}
                inputData={inputData}
                loadingContent={loadingContent}
                buttonDisable={buttonDisable}
              />
              <ProfileChangePasswordSec
                changePasswordData={changePasswordData}
                handleChangePassword={this.handleChangePassword}
                changePassword={this.changePassword}
                loadingContent={loadingContent}
                buttonDisable={buttonDisable}
                resetForm={this.resetForm}
              />
              <ProfileDeleteSec
                DeleteAccData={DeleteAccData}
                handleChangeDeleteData={this.handleChangeDeleteData}
                handleDelete={this.handleDelete}
                loadingContent={loadingContent}
                buttonDisable={buttonDisable}
                resetForm={this.resetForm}
              />

              <ProfileGalleySec
                galleryData={galleryData}
                loadingGallery={loadingGallery}
                loadMoreButtonDisable={loadMoreButtonDisable}
                loadMoreLoadingContent={loadMoreLoadingContent}
                loadMore={this.loadMore}
                deleteGalleryImage={this.deleteGalleryImage}
              />
            </React.Fragment>
          )}
        </div>
        <ProfileGalleryUploadImage
          galleryInputChange={this.galleryInputChange}
          addGalleryImage={this.addGalleryImage}
          gallerySave={this.gallerySave}
          galleryLoadingContent={galleryLoadingContent}
          galleryButtonDisable={galleryButtonDisable}
          galleryInputData={galleryInputData}
        />
      </div>
    );
  }
}

export default withToastManager(translate(ProfileIndex));
