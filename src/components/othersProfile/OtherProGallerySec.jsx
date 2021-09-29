import React, { Component } from "react";
import { translate, t } from "react-multi-lang";

class OtherProGallerySec extends Component {
  state = {};
  render() {
    const {
      galleryData,
      loadingGallery,
      loadMoreButtonDisable,
      loadingContent,
      loadMore,
    } = this.props;
    return (
      <div id="gallery" className="tab-pane fade in zero-padding">
        {loadingGallery ? (
          t("loading")
        ) : galleryData.length > 0 ? (
          <div className="gallery">
            <div className="container top-bottom-spacing">
              <div className="Spacer-10"></div>
              <div className="row small-padding">
                {galleryData.map((image) => (
                  <div className="col-md-4">
                    <div className="gallery-box">
                      <img className="gallery-img" src={image.image} />
                      <div className="caption">
                        <div className="caption-content"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="Spacer-15"></div>
              <div className="text-center">
                <button
                  className="show-more-btn"
                  disabled={loadMoreButtonDisable}
                  onClick={(event) => loadMore(event, "gallery")}
                >
                  {loadingContent != null ? loadingContent : t("show_more")}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="container top-bottom-spacing">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="no-data-found-img">
                    <img src="../assets/img/no-data-found.png"></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default translate(OtherProGallerySec);
