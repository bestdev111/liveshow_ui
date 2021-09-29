import React, { Component } from "react";
import { translate, t } from "react-multi-lang";

class ProfileUpdateSec extends Component {
  state = {};
  render() {
    const {
      profileData,
      loadingContent,
      buttonDisable,
      saveProfile,
      handleChangeProData,
      imagePreviewUrl,
      handleChangeImage,
    } = this.props;
    return (
      <div id="update" className="container-fluid tab-pane fade zero-padding">
        <div className="container top-bottom-spacing">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 center-align">
              <div
                style={{
                  backgroundImage: `url(${
                    imagePreviewUrl != null
                      ? imagePreviewUrl
                      : profileData.picture
                  })`,
                }}
                className="user-profile1"
              ></div>
              <form>
                <div>
                  <label className="tab-label center-align">
                    {t("profile_photo")}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    id="file-1"
                    className="inputfile inputfile-2 none"
                    data-multiple-caption="{count} files selected"
                    multiple
                    name="picture"
                    onChange={handleChangeImage}
                  />
                  <label htmlFor="file-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                    >
                      <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
                    </svg>
                    <span>{t("choose_file")}&hellip;</span>
                  </label>
                </div>
                <div>
                  <label className="tab-label">{t("change_cover_image")}</label>
                  <input
                    type="file"
                    accept="image/*"
                    name="cover"
                    onChange={handleChangeImage}
                    id="file-2"
                    className="inputfile inputfile-2 none"
                    data-multiple-caption="{count} files selected"
                    multiple
                  />
                  <label htmlFor="file-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                    >
                      <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
                    </svg>
                    <span>{t("choose_file")}&hellip;</span>
                  </label>
                </div>
              </form>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-offset-1 col-md-6 col-lg-offset-1 col-lg-6 spacing2">
              <form className="content" onSubmit={saveProfile}>
                <span className="input input--hoshi">
                  <input
                    className="input__field input__field--hoshi"
                    type="text"
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleChangeProData}
                  />
                  <label
                    className="input__label input__label--hoshi input__label--hoshi-color-1"
                    htmlFor="name"
                    data-content="Name"
                  >
                    <span className="input__label-content input__label-content--hoshi">
                      {t("name")}
                    </span>
                  </label>
                </span>
                <span className="input input--hoshi">
                  <input
                    className="input__field input__field--hoshi"
                    type="text"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChangeProData}
                  />
                  <label
                    className="input__label input__label--hoshi input__label--hoshi-color-1"
                    htmlFor="email"
                    data-content="Email"
                  >
                    <span className="input__label-content input__label-content--hoshi">
                      {t("email")}
                    </span>
                  </label>
                </span>
                <span className="input input--hoshi">
                  <textarea
                    className="input__field input__field--hoshi height-input-small"
                    type="text"
                    id="about"
                    name="description"
                    value={profileData.description}
                    onChange={handleChangeProData}
                  ></textarea>
                  <label
                    className="input__label input__label--hoshi input__label--hoshi-color-1"
                    htmlFor="about"
                    data-content="About"
                  >
                    <span className="input__label-content input__label-content--hoshi">
                      {t("about")}
                    </span>
                  </label>
                </span>
                <div className="Spacer-5"></div>
                <div className="center-align">
                  <button
                    className="btn width-200"
                    type="button"
                    onClick={saveProfile}
                    disabled={buttonDisable}
                  >
                    {loadingContent != null ? loadingContent : t('c_save')}
                  </button>
                  <div className="Spacer-3 visible-xs"></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default translate(ProfileUpdateSec);