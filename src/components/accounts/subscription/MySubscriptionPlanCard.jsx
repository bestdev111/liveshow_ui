import React, { Component } from "react";
import { translate, t } from "react-multi-lang";

class MySubscriptionPlanCard extends Component {
  state = {};
  render() {
    const { subscription, subscriptionStatus } = this.props;
    return (
      <div class="row space-myplans">
        <div class="col-xs-12 col-sm-5 col-md-5 col-lg-5 relative mt-small resp-width-full">
          <div
            class="subscription-bg"
            style={{ backgroundImage: "url(img/pro-bg1.jpg)" }}
          >
            <div
              class="height-200 subscription-overlay"
              ng-reflect-klass="height-200"
              ng-reflect-ng-class="[object Object]"
            >
              <div class="text-center">
                <h3 class="sub-head mt-0">{subscription.title}</h3>
                <h2 class="sub-head text-bold">
                  {subscription.amount_formatted}/
                  <span class="small-text">{subscription.plan_text}</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-7 col-md-7 col-lg-7 pl-0 resp-width-full">
          <div class="myplans-content">
            <div class="myplan-details">
              <div class="header-content">
                <h4 class="sub-desc-1">
                  <span class="myplan-head">{t("expires_on")}: </span>
                  {subscription.expiry_date}
                </h4>
                <h4 class="sub-desc">
                  <span class="myplan-head">{t("description")}: </span>
                  {subscription.description}
                </h4>
                {subscription.cancel_reason != "" ? (
                  <h4 class="sub-desc">
                    <span class="myplan-head">{t("cancel_reason")}: </span>
                    {subscription.cancel_reason}
                  </h4>
                ) : null}
              </div>
              <h4 className="sub-desc-1">
                {subscription.show_autorenewal_pause_btn == 1 ? (
                  <button
                    className="margin-md btn-subscribe-cancel"
                    onClick={(event) => subscriptionStatus(event, subscription)}
                  >
                    {t("cancel_subscription")}
                  </button>
                ) : null}
                {subscription.show_autorenewal_enable_btn == 1 ? (
                  <button
                    className="margin-md btn-subscribe-cancel"
                    onClick={(event) => subscriptionStatus(event, subscription)}
                  >
                    {t("enable_auto_renewal_subscription")}
                  </button>
                ) : null}
              </h4>
              <div class="table-responsive">
                <table class="table table-bordered">
                  <tbody>
                    <tr>
                      <td>{t("payment_id")}</td>
                      <td>{subscription.payment_id}</td>
                    </tr>
                    <tr>
                      <td>{t("payment_mode")}</td>
                      <td className="text-uppercase">
                        {subscription.payment_mode}
                      </td>
                    </tr>
                    <tr>
                      <td>{t("is_coupon_applied")}</td>
                      <td>
                        {subscription.is_coupon_applied == 1 ? "Yes" : "No"}
                      </td>
                    </tr>
                    <tr>
                      <td>{t("total_paid_amount")}</td>
                      <td>{subscription.amount_formatted}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default translate(MySubscriptionPlanCard);
