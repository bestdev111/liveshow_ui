import React, { Component } from "react";
import { Link } from "react-router-dom";
import { translate, t } from "react-multi-lang";

class Search extends Component {
  state = {};
  render() {
    const {
      searchInputData,
      searchData,
      loadingSearch,
      handleSearchChange,
      searchLoadingContent,
      clearSearchData,
    } = this.props;
    return (
      <>
        <span className="header-search input--makiko">
          <div className="input-group">
            <span className="input-group-addon" id="basic-addon1">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder={t('Search')}
              aria-describedby="basic-addon1"
              name="key"
              value={searchInputData.key}
              onChange={handleSearchChange}
            />
          </div>
        </span>

        {loadingSearch ? (
            searchLoadingContent != null ? (
              <div className="search-content-box">
                <div className="notify-box">
                  <div className="row">
                    <div className="col-md-10">
                      <div className="notify-content">
                        <h4>{t("loading")}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : ( "" )
        ) : searchData.length > 0 ? 
        (
          <div className="search-content-box">
            {searchData.map((result) => (
              <div className="notify-box">
                <div className="row">
                  <Link
                    to={`profile/${result.user_unique_id}`}
                    onClick={clearSearchData}
                  >
                    <div className="col-md-12 lg-padding-new">
                      <div className="notify-img">
                        <a href="#" className="user-profile">
                          <img src={result.user_picture} alt="" />
                        </a>
                      </div>
                      <div className="notify-content">
                        <h4>{result.user_name}</h4>
                      </div>
                    </div>
                    {/* <div className="col-md-2 text-right">
                          <a href="#">
                            <button type="submit">Follow</button>
                            <div className="notify-close-icon">
                              <a href="#">
                                <i className="fas fa-times"></i>
                              </a>
                            </div>
                          </a>
                        </div> */}
                  </Link>
                </div>
              </div>
            ))}

            {/* <div className="row">
              <div className="col-md-12">
                <div className="search-footer">
                  <a href="#" className="view-all-btn">
                    {t("view_all")}
                  </a>
                </div>
              </div>
            </div> */}
          </div>
        ) : (
          <div className="search-content-box">
            <div className="notify-box">
              <div className="row">
                <div className="col-md-10">
                  <div className="notify-content">
                    <h4>{t("no_data_found")}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default translate(Search);