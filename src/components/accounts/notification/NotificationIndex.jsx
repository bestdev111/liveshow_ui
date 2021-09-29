import React, { Component } from "react";
import NotificationCard from "./NotificationCard";
import Sidebar from "../../layouts/sidebar/Sidebar";
import api from "../../../Environment";
import { translate, t } from "react-multi-lang";

class NotificationIndex extends Component {
  state = {
    notificationData: null,
    loadingNotification: true,
    skipCount: 0,
    loadMoreButtonDisable: false,
    loadingContent: null,
  };

  componentDidMount() {
    const inputData = {
      skip: this.state.skipCount,
    };
    this.getNotificationDetails(inputData);
  }

  loadMore = (event) => {
    event.preventDefault();
    this.setState({
      loadMoreButtonDisable: true,
      loadingContent: t('loading'),
    });
    const inputData = {
      skip: this.state.skipCount,
    };

    this.getNotificationDetails(inputData);
  };

  getNotificationDetails = (inputData) => {
    let items;
    api.postMethod("bell_notifications", inputData).then((response) => {
      if (response.data.success) {
        if (this.state.notificationData != null) {
          items = [...this.state.notificationData, ...response.data.data];
        } else {
          items = [...response.data.data];
        }
        this.setState({
          notificationData: items,
          loadingNotification: false,
          skipCount: response.data.data.length + this.state.skipCount,
          loadMoreButtonDisable: false,
          loadingContent: null,
        });
      } else {
      }
    });
  };
  render() {
    const {
      notificationData,
      loadingNotification,
      loadMoreButtonDisable,
      loadingContent,
    } = this.state;
    return (
      <div className="main">
        <Sidebar />
        <div className="sec-padding notification left-spacing1">
          <div className="Spacer-5"></div>
          <div className="public-video-header">{t("notification")}</div>
          <div className="row small-padding">
            <div className="col-md-12">
              <div className="Spacer-10"></div>
              <div className="row">
                <div className="col-md-12 text-right">
                  {/* <button className="btn2" type="submit">
                    {t("clear_all")}
                  </button> */}
                </div>
              </div>
              <div className="Spacer-10"></div>
              {loadingNotification ? (
                t('loading')
              ) : notificationData.length > 0 ? (
                <>
                  <div className="row">
                    {notificationData.map((notification) => (
                      <NotificationCard notification={notification} />
                    ))}
                  </div>
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <button
                        className="show-more-btn"
                        type="submit"
                        disabled={loadMoreButtonDisable}
                        onClick={this.loadMore}
                      >
                        {loadingContent != null ? loadingContent : t('show_more')}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="no-data-found-img">
                  <div className="Spacer-10"></div>
                  <img src="../assets/img/no-data-found.png"></img>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default translate(NotificationIndex);