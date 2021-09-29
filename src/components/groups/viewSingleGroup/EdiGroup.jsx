import React, { Component } from "react";
import { translate, t } from "react-multi-lang";

class EditGroup extends Component {
  state = {};
  render() {
    const {
      inputData,
      handleChange,
      saveGroup,
      loadingContent,
      buttonDisable,
      handleChangeImage,
    } = this.props;
    return (
      <div class="modal fade view-group" id="edit-group" role="dialog">
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
              <h4 class="title">{t("edit_group")}</h4>
            </div>
            <div class="modal-body sm-padding">
              <div class="form-group">
                <label class="control-label">{t("title")}</label>
                <input
                  class="form-control"
                  placeholder={t('enter_your_full_name')}
                  name="name"
                  value={inputData.name}
                  onChange={handleChange}
                />
              </div>
              <div class="form-group">
                <label class="control-label">{t("description")}</label>
                <textarea
                  class="form-control"
                  placeholder={t('enter_your_full_name')}
                  name="description"
                  value={inputData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div class="form-group">
                {/* <div class="col-md-6 text-right p-0">
                  <div class="upload-file-info">
                    <input type="file" id="file" />
                    <label for="file" class="btn-2">
                      {t("upload_image")}
                    </label>
                  </div>
                </div> */}
                <label class="control-label">{t("add_group_image")}</label>
                <input
                  class="form-control"
                  placeholder={t('enter_your_full_name')}
                  type="file"
                  name="picture"
                  accept="image/*"
                  onChange={handleChangeImage}
                />
              </div>
              <div class="form-group">
                <button
                  className="btn btn-group"
                  type="submit"
                  onClick={saveGroup}
                  disabled={buttonDisable}
                >
                  {loadingContent != null ? loadingContent : t('submit')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default translate(EditGroup);