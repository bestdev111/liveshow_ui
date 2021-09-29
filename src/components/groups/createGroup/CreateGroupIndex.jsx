import React, { Component } from "react";
import Sidebar from "../../layouts/sidebar/Sidebar";
import ToastContent from "../../helper/ToastContent";
import { withToastManager } from "react-toast-notifications";
import Helper from "../../helper/Helper";
import api from "../../../Environment";
import { translate, t } from "react-multi-lang";


class CreateGroupIndex extends Helper {
  state = {
    inputData: {},
    loadingContent: null,
    buttonDisable: false,
    imagePreviewUrl: null,
  };
  saveGroup = (event) => {
    event.preventDefault();
    this.setState({
      loadingContent: t('loading'),
      buttonDisable: true,
    });

    api
      .postMethod("live_groups_save", this.state.inputData)
      .then((response) => {
        if (response.data.success) {
          ToastContent(
            this.props.toastManager,
            response.data.message,
            "success"
          );
          this.props.history.push("/group/view-all");
          this.setState({ loadingContent: null, buttonDisable: false });
        } else {
          ToastContent(this.props.toastManager, response.data.error, "error");
          this.setState({ loadingContent: null, buttonDisable: false });
        }
      });
  };

  render() {
    const {
      buttonDisable,
      loadingContent,
      inputData,
      imagePreviewUrl,
    } = this.state;
    return (
      <div className="main">
        <Sidebar />
        <div className="sec-padding create-group left-spacing1">
          <div className="row">
            <h3 className="public-video-header">{t("create_groups")}</h3>
            <div className="Spacer-10"></div>
            <div className="row small-padding">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <form className="create-group-file" onSubmit={this.saveGroup}>
                  <label
                    className="group-bg-img"
                    style={{
                      cursor: "pointer",
                      backgroundImage: `url(${
                        imagePreviewUrl != null
                          ? imagePreviewUrl
                          : window.location.origin + "/assets/img/pro-bg.jpg"
                      })`,
                    }}
                  >
                    <div className="group-bg-img-overlay">
                      <img
                        className="camera-edit-img"
                        src={window.location.origin + "/assets/img/camera.png"}
                      />
                    </div>
                    <input
                      type="file"
                      size="60"
                      name="picture"
                      accept="image/*"
                      onChange={this.handleChangeImage}
                    />
                  </label>
                  <div className="">
                    {/* <h2 className="group-heading">{t("create_groups")}</h2>*/}
                    <form className="content">
                      <span className="input input--hoshi">
                        <input
                          className="input__field input__field--hoshi"
                          type="text"
                          name="name"
                          value={inputData.name}
                          onChange={this.handleChange}
                        />
                        <label className="input__label input__label--hoshi input__label--hoshi-color-1">
                          <span className="input__label-content input__label-content--hoshi">
                            {t("group_name")}
                          </span>
                        </label>
                      </span>
                      <span className="input input--hoshi">
                        <textarea
                          className="input__field input__field--hoshi"
                          type="text"
                          name="description"
                          value={inputData.description}
                          onChange={this.handleChange}
                        ></textarea>
                        <label className="input__label input__label--hoshi input__label--hoshi-color-1">
                          <span className="input__label-content input__label-content--hoshi">
                            {t("group_description")}
                          </span>
                        </label>
                      </span>
                    </form>
                    <div className="Spacer-10"></div>
                    <div className="text-center resp-center">
                      <button
                        className="btn width-200"
                        disabled={buttonDisable}
                      >
                        {loadingContent != null ? loadingContent : t('create')}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withToastManager(translate(CreateGroupIndex));
