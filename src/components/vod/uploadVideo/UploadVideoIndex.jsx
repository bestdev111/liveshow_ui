import React, { Component } from "react";
import Sidebar from "../../layouts/sidebar/Sidebar";
import { Progress } from "reactstrap";
import api from "../../../Environment";
import Helper from "../../helper/Helper";
import ToastContent from "../../helper/ToastContent";
import { withToastManager } from "react-toast-notifications";
import { translate, t } from "react-multi-lang";


class UploadVideoIndex extends Helper {
  state = {
    loaded: 0,
    inputData: {},
    loadingContent: null,
    buttonDisable: false,
    imagePreviewUrl: null,
    videoPreviewUrl: null,
    displayPublishTime: false,
  };

  saveVideo = (event) => {
    event.preventDefault();
    this.setState({
      buttonDisable: true,
      loadingContent: t("uploading"),
    });
    api
      .postMethod("vod_videos_owner_save", this.state.inputData)
      .then((response) => {
        if (response.data.success) {
          ToastContent(
            this.props.toastManager,
            response.data.message,
            "success"
          );
          this.props.history.push("/vod/list");
        } else {
          ToastContent(this.props.toastManager, response.data.error, "error");
        }
        this.setState({
          buttonDisable: false,
          loadingContent: null,
        });
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  publishTypeStatus = (type) => {
    this.setState({ displayPublishTime: type });
  };

  render() {
    const {
      inputData,
      loadingContent,
      buttonDisable,
      imagePreviewUrl,
      videoPreviewUrl,
      displayPublishTime,
    } = this.state;
    return (
      <div className="main">
        <Sidebar />
        <div className="sec-padding upload-img-vido left-spacing1">
          <div className="Spacer-10"></div>
          <div class="public-video-header">{t("upload_your_video")}</div>
          <div className="row small-padding">
            <div className="Spacer-9"></div>

            <div className="col-md-12 p-0">
              <form className="upload-form box-shadow-1">
                <div className="form-group">
                  <label className="control-label">{t("title")}</label>
                  <input
                    className="form-control"
                    placeholder={t('enter_title')}
                    name="title"
                    value={inputData.title}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group size-16 m-t-2em">
                  <div className="row">
                    <div className="col-md-12">
                      <label>{t('publish_type')}:</label>
                    </div>

                    <div className="col-md-2">
                      <label className="custom-radio-btn">
                        {t('now')}
                        <input
                          type="radio"
                          name="publish_type"
                          value="1"
                          onChange={this.handleChange}
                          onClick={(event) => this.publishTypeStatus(false)}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="col-md-2">
                      <label className="custom-radio-btn">
                        {t('later')}
                        <input
                          type="radio"
                          name="publish_type"
                          value="2"
                          onChange={this.handleChange}
                          onClick={(event) => this.publishTypeStatus(true)}
                        />
                        <span className="checkmark choose-date-check"></span>
                      </label>
                    </div>
                  </div>
                </div>
                {displayPublishTime ? (
                  <div className="input-group choose-date mb-65">
                    <label>{t('choose_publish_date')}</label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder={t('choose_date')}
                      aria-describedby="basic-addon2"
                      name="publish_time"
                      onChange={this.handleChange}
                    />
                    <span className="input-group-addon" id="basic-addon2">
                      <i className="fa fa-calendar-alt"></i>
                    </span>
                  </div>
                ) : null}
                <div className="form-group">
                  <label className="control-label">{t("description")}</label>

                  <textarea
                    className="form-control"
                    placeholder={t('description_here')}
                    name="description"
                    value={inputData.description}
                    onChange={this.handleChange}
                  ></textarea>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <p className="pt-85">
                      <b>{t("choose_your_image")}</b>{t("image_note")}
                    </p>
                    <div className="upload-file-info pt-86">
                      <input
                        type="file"
                        accept="image/*"
                        id="file"
                        name="image"
                        onChange={this.handleChangeImage}
                      />
                      <label htmlFor="file" className="btn-2 btn-2-inverse">
                       {t("upload_image")}
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div
                      className="user-profile1"
                      style={{
                        backgroundImage: `url(${
                          imagePreviewUrl != null
                            ? imagePreviewUrl
                            : window.location.origin +
                              "/assets/img/bg-image.jpg"
                        })`,
                      }}
                    ></div>
                  </div>
                  <Progress max="100" color="success" value={this.state.loaded}>
                    {Math.round(this.state.loaded, 2)}%
                  </Progress>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <p className="pt-85">
                      <b>{t("choose_your_video")}</b>{t("video_note")}
                    </p>
                    <div className="upload-file-info pt-87">
                      <input
                        type="file"
                        id="files"
                        accept="video/mp4,video/x-m4v,video/*"
                        name="video"
                        onChange={this.handleChangeImage}
                      />
                      <label htmlFor="files" className="btn-2 btn-2-inverse">
                        {t("upload_video")}
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    {videoPreviewUrl != null ? (
                      <video
                        autoplay
                        controls
                        id="myVideo"
                        className="user-profile1"
                      >
                        <source src={videoPreviewUrl} type="video/mp4" />
                      </video>
                    ) : (
                      <div
                        className="user-profile1"
                        style={{
                          backgroundImage: `url(${
                            window.location.origin + "/assets/img/bg-image.jpg"
                          })`,
                        }}
                      ></div>
                    )}
                  </div>
                </div>
                <div className="Spacer-8"></div>
                <div className="row">
                  <div className="col-md-12 text-center">
                    <button
                      className="btn width-260"
                      type="submit"
                      onClick={this.saveVideo}
                      disabled={buttonDisable}
                    >
                      {loadingContent != null ? loadingContent : t("upload_now")}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default withToastManager(translate(UploadVideoIndex));
