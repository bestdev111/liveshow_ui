import React, { Component } from "react";
import { translate, t } from "react-multi-lang";

class ProfileDeleteSec extends Component {
  state = {};
  render() {
    const {
      handleChangeDeleteData,
      DeleteAccData,
      handleDelete,
      loadingContent,
      buttonDisable,
      resetForm,
    } = this.props;
    return (
      <div id="delete" className=" tab-pane fade zero-padding">
        <div className="container top-bottom-spacing">
          <div className="col-xs-12 col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6 spacing2">
            <h3 className="tab-head">{t("hope_see_you_soon")}</h3>
            <h5 className="tab-head">
              {t("delete_video_note")}
            </h5>
            <form className="content">
              <span className="input input--hoshi">
                <input
                  className="input__field input__field--hoshi"
                  type="password"
                  id="pass"
                  name="password"
                  value={DeleteAccData.password}
                  onChange={handleChangeDeleteData}
                />
                <label
                  className="input__label input__label--hoshi input__label--hoshi-color-1"
                  htmlFor="pass"
                  data-content="Password"
                >
                  <span className="input__label-content input__label-content--hoshi">
                    {t("password")}
                  </span>
                </label>
              </span>
              <div className="Spacer-8"></div>
              <div className="center-align">
                <button
                  className="btn width-200"
                  type="button"
                  onClick={handleDelete}
                  disabled={buttonDisable}
                >
                  {loadingContent != null ? loadingContent : t('c_save')}
                </button>
                <div className="Spacer-3 visible-xs"></div>
                <button className="btn1 width-200" type="button" onClick={resetForm}>
                  {t("c_cancel")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default translate(ProfileDeleteSec);
