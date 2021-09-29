import React, { Component } from "react";
import Sidebar from "../../layouts/sidebar/Sidebar";
import MySubscriptionPlanCard from "./MySubscriptionPlanCard";
import api from "../../../Environment";
import ToastContent from "../../helper/ToastContent";
import { withToastManager } from "react-toast-notifications";
import { translate, t } from "react-multi-lang";

class MySubscriptionPlan extends Component {
  state = {
    mySubscriptionData: null,
    loadingSubscription: true,
    skipCount: 0,
    loadMoreButtonDisable: false,
    loadingContent: null,
  };
  componentDidMount() {
    const inputData = {
      skip: this.state.skipCount,
    };
    this.getMySubscriptionDetails(inputData);
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

    this.getMySubscriptionDetails(inputData);
  };

  getMySubscriptionDetails = (inputData) => {
    let items;
    api.postMethod("subscriptions_history", inputData).then((response) => {
      if (response.data.success) {
        if (this.state.mySubscriptionData != null) {
          items = [...this.state.mySubscriptionData, ...response.data.data];
        } else {
          items = [...response.data.data];
        }
        this.setState({
          mySubscriptionData: items,
          loadingSubscription: false,
          skipCount: response.data.data.length + this.state.skipCount,
          loadMoreButtonDisable: false,
          loadingContent: null,
        });
      } else {
      }
    });
  };

  subscriptionStatus = (event, subscription) => {
    event.preventDefault();
    api
      .postMethod("subscriptions_autorenewal_status", {
        user_subscription_id: subscription.user_subscription_id,
      })
      .then((response) => {
        if (response.data.success) {
          let array = [...this.state.mySubscriptionData]; // make a separate copy of the array
          let index = array.indexOf(subscription);
          if (index !== -1) {
            console.log("true 1");
            if (array[index].show_autorenewal_enable_btn == 1) {
              console.log("true 2");
              array[index].show_autorenewal_enable_btn = 0;
              array[index].show_autorenewal_pause_btn = 1;
            } else if (array[index].show_autorenewal_pause_btn == 1) {
              console.log("true 3");
              array[index].show_autorenewal_enable_btn = 1;
              array[index].show_autorenewal_pause_btn = 0;
            }
            this.setState({ mySubscriptionData: array });
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

  render() {
    const {
      loadingContent,
      mySubscriptionData,
      loadMoreButtonDisable,
      loadingSubscription,
    } = this.state;
    return (
      <div className="main">
        <Sidebar />
        <div class="sec-padding myplans left-spacing1">
          <div class="Spacer-5"></div>
          <div class="public-video-header">{t("my_subscriptions")}</div>
          <div class="Spacer-5"></div>
          <div class="row small-padding">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              {loadingSubscription ? (
                t('loading')
              ) : mySubscriptionData.length > 0 ? (
                mySubscriptionData.map((subscription) => (
                  <MySubscriptionPlanCard
                    subscription={subscription}
                    subscriptionStatus={this.subscriptionStatus}
                  />
                ))
              ) : (
                <div className="no-data-found-img">
                  <div className="Spacer-10"></div>
                  <img src="../assets/img/no-data-found.png"></img>
                </div>
              )}

              <div class="Spacer-10"></div>
              <div class="text-center">
                <button
                  class="show-more-btn"
                  disabled={loadMoreButtonDisable}
                  onClick={this.loadMore}
                >
                  {loadingContent != null ? loadingContent : t('show_more')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withToastManager(translate(MySubscriptionPlan));
