import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../../../Environment";
import { withToastManager } from "react-toast-notifications";
import _ from "lodash";
import ToastContent from "../../../helper/ToastContent";
import Sidebar from "../../../layouts/sidebar/Sidebar";
import { translate, t } from "react-multi-lang";

class LiveTvListIndex extends Component {
  state = {
    liveTvData: null,
    loadingLiveTv: true,
    skipCount: 0,
    loadMoreButtonDisable: false,
    loadingContent: null,
    deletedVideoId: [],
    PPVInputData: {},
    PPVLoadingContent: null,
    PPVButtonDisable: false,
    isLoadingSearch: false,
    results: [],
  };
  componentDidMount() {
    const inputData = {
      skip: this.state.skipCount,
    };
    this.getLiveTvDetails(inputData);
  }

  loadMore = (event) => {
    event.preventDefault();
    this.setState({
      loadMoreButtonDisable: true,
      loadingContent: t("loading"),
    });
    const inputData = {
      skip: this.state.skipCount,
    };

    this.getLiveTvDetails(inputData);
  };

  getLiveTvDetails = (inputData) => {
    let items;
    api.postMethod("livetv_owner_list", inputData).then((response) => {
      if (response.data.success) {
        if (this.state.liveTvData != null) {
          items = [...this.state.liveTvData, ...response.data.data];
        } else {
          items = [...response.data.data];
        }
        this.setState({
          liveTvData: items,
          loadingLiveTv: false,
          skipCount: response.data.data.length + this.state.skipCount,
          loadMoreButtonDisable: false,
          loadingContent: null,
        });
      } else {
      }
    });
  };

  deleteLiveTv = (event, video) => {
    event.preventDefault();
    api
      .postMethod("livetv_owner_delete", {
        custom_live_video_id: video.custom_live_video_id,
      })
      .then((response) => {
        if (response.data.success) {
          let array = [...this.state.liveTvData]; // make a separate copy of the array
          let index = array.indexOf(video);
          if (index !== -1) {
            array.splice(index, 1);
            this.setState({ liveTvData: array });
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

  updateStatus = (event, video) => {
    event.preventDefault();
    api
      .postMethod("livetv_owner_status", {
        custom_live_video_id: video.custom_live_video_id,
      })
      .then((response) => {
        if (response.data.success) {
          let array = [...this.state.liveTvData]; // make a separate copy of the array
          let index = array.indexOf(video);
          if (index !== -1) {
            array[index].status = response.data.data.status;
            this.setState({ liveTvData: array });
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

  handleSearchChange = ({ currentTarget: input }) => {
    this.setState({ isLoadingSearch: true });

    setTimeout(() => {
      if (input.value < 1)
        return this.setState({
          isLoadingSearch: false,
          results: [],
        });

      const re = new RegExp(_.escapeRegExp(input.value), "i");
      const isMatch = (result) => re.test(result.title);

      this.setState({
        isLoadingSearch: false,
        results: _.filter(this.state.liveTvData, isMatch),
      });
    }, 300);
  };

  render() {
    const { loadingLiveTv, liveTvData } = this.state;
    let renderData;
    if (this.state.results.length > 0) {
      renderData = this.state.results;
    } else {
      renderData = liveTvData;
    }
    return (
      <div className="main">
        <Sidebar />
        <div className="sec-padding vodlist left-spacing1">
          <div className="Spacer-5"></div>
          <div className="public-video-header">{t("live_tv_manager")}</div>
          <div className="Spacer-10"></div>
          <div className="row small-padding">
            <div className="col-sm-9"></div>
            <div className="col-sm-3 text-right">
              <Link to={"/live-tv/create"}>
                <button className="btn2">{t("create_livetv")}</button>
              </Link>
            </div>
          </div>
          <div className="Spacer-10"></div>
          <div className="row small-padding">
            <div className="col-md-12 video-list">
              <div className="table-default left-adjust table-responsive newtable">
                <div className="Spacer-5"></div>
                <div className="row">
                  <div className="col-md-12">
                    <div id="wrap">
                      <form action="" autocomplete="on">
                        <input
                          name="search"
                          type="text"
                          onChange={this.handleSearchChange}
                          placeholder={t('search')}
                        />
                        <i className="fas fa-search"></i>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="Spacer-8"></div>
                <table className="table m-0">
                  <thead>
                    <tr>
                      <th scope="col">{t("sl_no")}</th>
                      <th scope="col">{t("thumbnail")}</th>
                      <th scope="col">{t("title")}</th>
                      <th scope="col">{t("created_date")}</th>
                      <th scope="col">{t("status")}</th>
                      <th scope="col">{t("action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadingLiveTv
                      ? t("loading")
                      : renderData.length > 0
                      ? renderData.map((video, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <a href="#" className="user-profile">
                                <img src={video.image} alt="" />
                              </a>
                            </td>
                            <td>
                              <h5 className="listing-table-title">
                                {video.title}
                              </h5>
                            </td>
                            <td>
                              <span className="listing-table-date">
                                {video.created_date}
                              </span>
                            </td>

                            <td>
                              <span className="badge badge-warning">
                                {video.status == 1
                                  ? t('published')
                                  : t('unpublished')}
                              </span>
                            </td>
                            <td>
                              <div className="btn-group action-btn">
                                <label
                                  type="button"
                                  className="dropdown-toggle"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  <i className="fa fa-ellipsis-h"></i>
                                </label>
                                <ul className="dropdown-menu">
                                  <li>
                                    <Link
                                      to={{
                                        pathname: `/live-tv/edit/${video.title}`,
                                        state: video,
                                      }}
                                    >
                                      <i className="fa fa-edit icon"></i>{t("edit_video")}
                                    </Link>
                                  </li>
                                  <li>
                                    <a
                                      href="#"
                                      onClick={(event) =>
                                        this.deleteLiveTv(event, video)
                                      }
                                    >
                                      <i className="fa fa-trash icon"></i>{t("delete_video")}
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="#"
                                      onClick={(event) =>
                                        this.updateStatus(event, video)
                                      }
                                    >
                                      <i className="fa fa-window-close icon"></i>{" "}
                                      {video.status == 1
                                        ? t("unpublish")
                                        : t("publish")}
                                    </a>
                                  </li>
                                  <li>
                                    <Link
                                      to={{
                                        pathname: `/live-tv/single/${video.title}`,
                                        state: video,
                                      }}
                                    >
                                      <i className="fa fa-eye icon"></i>
                                      {t("view")}
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                        ))
                      : t("no_data_found")}
                  </tbody>
                </table>
                <div className="row">
                  <div className="col-md-12 text-center">
                    <button
                      className="show-more-btn"
                      type="button"
                      onClick={this.loadMore}
                      disabled={this.state.loadMoreButtonDisable}
                    >
                      {this.state.loadingContent != null
                        ? this.state.loadingContent
                        : t("load_more")}
                    </button>
                  </div>
                </div>
                <div className="Spacer-5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withToastManager(translate(LiveTvListIndex));
