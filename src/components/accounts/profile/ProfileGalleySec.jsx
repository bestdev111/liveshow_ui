import React, { Component } from "react";
import { translate, t } from "react-multi-lang";

class ProfileGalleySec extends Component {
  state = {};
  render() {
    const {
      galleryData,
      loadingGallery,
      loadMoreButtonDisable,
      loadMoreLoadingContent,
      loadMore,
      deleteGalleryImage,
    } = this.props;
    return (
      <div id="gallery" className="tab-pane gallery fade in zero-padding">
        <div className="container top-bottom-spacing">
          <div className="row small-padding">
            <div className="col-md-12">
              <div className="text-right">
                <button
                  className="btn2 width-200"
                  data-target="#image_upload"
                  data-toggle="modal"
                >
                  {t("upload_image")}
                </button>
              </div>
            </div>
          </div>
          <div className="Spacer-10"></div>
          <div className="row small-padding">
            {loadingGallery ? (
              t('loading')
            ) : galleryData.length > 0 ? (
              galleryData.map((image) => (
                <div className="col-md-4">
                  <div className="gallery-box">
                    <div className="gallery-header"></div>
                    <img className="gallery-img" src={image.image} />
                    <div className="caption">
                      <div className="caption-content">
                        <i
                          className="fas fa-trash-alt"
                          onClick={(event) => deleteGalleryImage(event, image)}
                          style={{ fontSize: "20px", color: "white" }}
                        ></i>
                      </div>
                    </div>
                    <div className="gallery-footer"></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-data-found-img">
                <div className="Spacer-10"></div>
                <img src="../assets/img/no-data-found.png"></img>
              </div>
            )}
          </div>
          <div className="Spacer-15"></div>
          <div className="text-center">
            <button
              className="show-more-btn"
              disabled={loadMoreButtonDisable}
              onClick={(event) => loadMore(event, "gallery")}
            >
              {loadMoreLoadingContent != null
                ? loadMoreLoadingContent
                : t('show_more')}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default translate(ProfileGalleySec);