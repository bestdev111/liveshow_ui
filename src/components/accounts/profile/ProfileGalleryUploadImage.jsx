import React, { Component } from "react";
import { translate, t } from "react-multi-lang";

class ProfileGalleryUploadImage extends Component {
  render() {
    const {
      galleryInputChange,
      gallerySave,
      galleryInputData,
      galleryLoadingContent,
      galleryButtonDisable,
      addGalleryImage,
    } = this.props;
    return (
      <div class="modal fade view-group" id="image_upload" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div className="modal-header">
              <button
                class="close"
                data-dismiss="modal"
                id="language_close"
                type="button"
              >
                ×
              </button>
              <h4 class="title">{t("add_image")}</h4>
            </div>
            <div class="modal-body sm-padding">
              <div class="form-group">
                <label class="control-label">{t("title")}</label>
                <input
                  class="form-control"
                  placeholder={t('enter_your_full_name')}
                  name="gallery_description"
                  value={galleryInputData.gallery_description}
                  onChange={galleryInputChange}
                />
              </div>

              <div class="form-group">
                <label class="control-label">{t("add_image")}</label>
                <div className="upload-btn-wrapper">
                  <button class="upload-btn">{t("upload_file")}</button>
                  <input multiple
                    class="form-control-1"
                    placeholder={t('enter_your_full_name')}
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={addGalleryImage}
                  />
                </div>
              </div>
              <div class="form-group">
                <button
                  className="btn btn-group"
                  type="submit"
                  onClick={gallerySave}
                  disabled={galleryButtonDisable}
                >
                  {galleryLoadingContent != null
                    ? galleryLoadingContent
                    : t('submit')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default translate(ProfileGalleryUploadImage);