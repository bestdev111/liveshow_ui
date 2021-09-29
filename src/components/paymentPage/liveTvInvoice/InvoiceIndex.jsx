import React, { Component } from "react";
import Sidebar from "../../layouts/sidebar/Sidebar";
import PaypalExpressBtn from "react-paypal-express-checkout";
import ToastContent from "../../helper/ToastContent";
import { withToastManager } from "react-toast-notifications";
import api from "../../../Environment";
import { translate, t } from "react-multi-lang";

import {
  injectStripe,
  CardElement,
  Elements,
  StripeProvider,
} from "react-stripe-elements";
import AddCardSec from "../AddCardSec";
import config from "react-global-configuration";

const $ = window.$;

class InvoiceIndex extends Component {
  state = {
    loadingInvoice: true,
    couponInputData: {
      live_video_id: null,
    },
    loadingCoupon: true,
    couponButtonDisable: false,
    couponButtonLoadingContent: null,
    couponData: null,
    paynowButtonDisable: false,
    paynowButtonLoadingContent: null,
    paymentMode: null,
    cardData: null,
    loadingCard: true,
    addCardLoadingContent: null,
    addCardButtonDisable: false,
    showAddCardButton: false,
    showPayPal: false,
  };
  componentDidMount() {
    if (this.props.location.state == null) {
      ToastContent(
        this.props.toastManager,
        t("payment_details_not_found"),
        "error"
      );
      this.props.history.push("/");
    }
    this.setState({ loadingInvoice: false });
    const couponInputData = { ...this.state.couponInputData };
    couponInputData["live_video_id"] = this.props.location.state.live_video_id;
    this.setState({ couponInputData });
  }

  removeCouponCode = (event) => {
    event.preventDefault();
    const couponInputData = { ...this.state.couponInputData };
    couponInputData["coupon_code"] = "";
    this.setState({ couponInputData });
    this.setState({
      couponData: null,
      loadingCoupon: true,
    });
    ToastContent(this.props.toastManager, t("coupon_code_removed"), "error");
  };

  handleCouponChange = ({ currentTarget: input }) => {
    const couponInputData = { ...this.state.couponInputData };
    couponInputData[input.name] = input.value;
    this.setState({ couponInputData });
  };

  checkCouponCode = (event) => {
    event.preventDefault();

    this.setState({
      couponButtonDisable: true,
      couponButtonLoadingContent: t("loading"),
    });
    setTimeout(() => {
      this.couponCodeApi();
    }, 1000);
  };

  couponCodeApi = () => {
    api
      .postMethod("live_videos_check_coupon_code", this.state.couponInputData)
      .then((response) => {
        if (response.data.success) {
          this.setState({
            couponData: response.data.data,
            loadingCoupon: false,
          });
          ToastContent(
            this.props.toastManager,
            t("applied_successfully"),
            "success"
          );
        } else {
          ToastContent(this.props.toastManager, response.data.error, "error");
        }
        this.setState({
          couponButtonDisable: false,
          couponButtonLoadingContent: null,
        });
      })
      .catch((err) => {
        // then print response status
        console.log("Error", err);
      });
  };

  choosePaymentOption = ({ currentTarget: input }) => {
    this.setState({ paymentMode: input.value });
    if (input.value == "card") {
      if (this.state.cardData == null || this.state.cardData == [])
        this.listCardApi();
      ToastContent(
        this.props.toastManager,
        t("getting_card_details"),
        "success"
      );
      this.setState({ showPayPal: false });
    }
    if (input.value == "paypal") {
      this.setState({ showPayPal: true });
    }
  };

  listCardApi() {
    api.postMethod("cards_list").then((response) => {
      if (response.data.success) {
        this.setState({
          cardData: response.data.data,
          loadingCard: false,
        });
        if (response.data.data.cards.length > 0) {
          ToastContent(
            this.props.toastManager,
            t("got_card_detail_click_paynow"),
            "success"
          );
        } else {
          this.setState({ showAddCardButton: true });
          ToastContent(
            this.props.toastManager,
            t("please_add_card"),
            "error"
          );
          $("#add-card").modal("show");
        }
      } else {
        ToastContent(this.props.toastManager, response.data.error, "error");
      }
    });
  }

  cardAddedStatusChange = () => {
    this.setState({ showAddCardButton: false });
  };

  payNow = (event) => {
    event.preventDefault();
    this.setState({
      paynowButtonDisable: true,
      paynowButtonLoadingContent: t("payment_proccessing"),
    });
    api
      .postMethod("live_videos_payment_by_card", this.state.couponInputData)
      .then((response) => {
        if (response.data.success) {
          ToastContent(
            this.props.toastManager,
            t("payment_successfull"),
            "success"
          );
          this.props.history.push("/broadcast", this.props.location.state);
        } else {
          ToastContent(this.props.toastManager, response.data.error, "error");
        }
        this.setState({
          paynowButtonDisable: false,
          paynowButtonLoadingContent: null,
        });
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  paypalOnSuccess = (payment) => {
    this.setState({
      paynowButtonDisable: true,
      paynowButtonLoadingContent: t("payment_proccessing"),
    });
    const couponInputData = { ...this.state.couponInputData };
    couponInputData["payment_id"] = payment.paymentID;
    this.setState({ couponInputData });
    setTimeout(() => {
      this.paypalPaymentAPI();
    }, 1000);
  };

  paypalPaymentAPI = () => {
    api
      .postMethod("live_videos_payment_by_paypal", this.state.couponInputData)
      .then((response) => {
        if (response.data.success) {
          ToastContent(
            this.props.toastManager,
            t("payment_successfull"),
            "success"
          );
          this.props.history.push("/broadcast", this.props.location.state);
        } else {
          ToastContent(this.props.toastManager, response.data.error, "error");
        }
        this.setState({
          paynowButtonDisable: false,
          paynowButtonLoadingContent: null,
        });
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  paypalOnError = (err) => {
    ToastContent(this.props.toastManager, err, "error");
  };

  paypalOnCancel = (data) => {
    ToastContent(
      this.props.toastManager,
      t("payment_cancelled_please_try"),
      "error"
    );
  };

  render() {
    if (this.state.loadingInvoice) {
      return t("loading");
    } else {
      const video = this.props.location.state;
      const {
        couponInputData,
        loadingCoupon,
        couponButtonDisable,
        couponButtonLoadingContent,
        couponData,
        paynowButtonDisable,
        paynowButtonLoadingContent,
        showAddCardButton,
        showPayPal,
      } = this.state;
      let env = config.get("configData.PAYPAL_MODE"); // you can set here to 'production' for production
      let currency = "USD"; // or you can set this value from your props or state
      let total; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
      if (!loadingCoupon) {
        total = couponData.user_pay_amount;
      } else {
        total = video.amount;
      }
      const client = {
        sandbox:config.get("configData.PAYPAL_ID"),
        production:config.get("configData.PAYPAL_ID"),
      };
      return (
        <div className="main">
          <Sidebar />
          <div className="sec-padding invoice left-spacing1">
            <div className="Spacer-5"></div>
            <div className="public-video-header">{t("invoice")}</div>
            <div className="Spacer-5"></div>
            <div className="row small-padding">
              <div className="invoice-bg">
                <div className="col-md-5">
                  <div className="invoice-image">
                    <img
                      src={window.location.origin + "/assets/img/invoice.svg"}
                    />
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="invoice-box">
                    <div className="invoice-details">
                      <div className="invoice-media">
                        <div className="invoice-left">
                          <img
                            className="invoice-video-img"
                            src={video.snapshot}
                          />
                        </div>
                        <div className="invoice-body">
                          <h4 className="invoice-heading">{video.title}</h4>
                          <p className="invoice-text">
                            {t("streaming_by")}: {video.user_name}
                          </p>
                        </div>
                        <br />
                        <p className="invoice-text">
                          <b>{t("type_of_subscription")}</b>&nbsp;-&nbsp;{t("recurring_payment")}
                        </p>
                        {video.amount != 0 ? (
                          <>
                            <label>{t("coupon")}</label>
                            <div className="input-group padding-bottom-md">
                              <input
                                type="text"
                                className="form-control"
                                placeholder={t('coupon_code')}
                                name="coupon_code"
                                value={couponInputData.coupon_code}
                                onChange={this.handleCouponChange}
                              />

                              <span className="input-group-addon">
                                {couponData == null ? (
                                  <a
                                    href="#"
                                    onClick={this.checkCouponCode}
                                    disabled={couponButtonDisable}
                                  >
                                    {couponButtonLoadingContent != null
                                      ? couponButtonLoadingContent
                                      : t("apply")}
                                  </a>
                                ) : null}
                                {couponData != null ? (
                                  <a
                                    href="#"
                                    onClick={this.removeCouponCode}
                                    disabled={couponButtonDisable}
                                  >
                                    {couponButtonLoadingContent != null
                                      ? couponButtonLoadingContent
                                      : t("remove")}
                                  </a>
                                ) : null}
                              </span>
                            </div>
                          </>
                        ) : null}
                        <label>{t("price_details")}</label>
                        <div className="table-responsive">
                          <table className="table table-bordered text-right">
                            <tbody>
                              <tr>
                                <td>{t("amount")}</td>
                                <td>{video.amount_formatted}</td>
                              </tr>
                              {loadingCoupon ? null : (
                                <tr>
                                  <td>{t("coupon_code_amount")}</td>
                                  <td>{couponData.coupon_amount_formatted}</td>
                                </tr>
                              )}
                              <tr>
                                <td>{t("total_payable_amount")}</td>
                                <td>
                                  {loadingCoupon
                                    ? video.amount_formatted
                                    : couponData.user_pay_amount_formatted}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="form-group size-16 mb-zero">
                          <div className="row">
                            <div className="col-md-12">
                              <label>{t("payment_by")}:</label>
                            </div>
                            <div className="col-md-4">
                              <label className="custom-radio-btn">
                                Card
                                <input
                                  type="radio"
                                  name="payment_mode"
                                  value="card"
                                  defaultChecked={
                                    true
                                  }
                                  onChange={this.choosePaymentOption}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </div>
                            <div className="col-md-4">
                              <label className="custom-radio-btn">
                                {t("paypal")}
                                <input
                                  type="radio"
                                  name="payment_mode"
                                  value="paypal"
                                  onChange={this.choosePaymentOption}
                                />
                                <span className="checkmark choose-date-check"></span>
                              </label>
                            </div>
                            <div className="col-md-4"></div>
                          </div>
                        </div>

                        {showAddCardButton ? (
                          <div className="form-group size-16 mb-zero">
                            <div className="row">
                              <div className="col-md-12">
                                <StripeProvider
                                  apiKey={config.get(
                                    "configData.stripe_publishable_key"
                                  )}
                                >
                                  <Elements>
                                    <AddCardSec
                                      cardAddedStatusChange={
                                        this.cardAddedStatusChange
                                      }
                                    />
                                  </Elements>
                                </StripeProvider>
                              </div>
                              <div className="col-md-4"></div>
                            </div>
                          </div>
                        ) : null}

                        {showPayPal && total != 0 ? (
                          <PaypalExpressBtn
                            env={env}
                            client={client}
                            currency={currency}
                            total={total}
                            onError={this.paypalOnError}
                            onSuccess={this.paypalOnSuccess}
                            onCancel={this.paypalOnCancel}
                          />
                        ) : null}
                        <div className="text-right">
                          <button
                            className="pay-btn width-120 captalize"
                            type="button"
                            onClick={this.payNow}
                            disabled={paynowButtonDisable}
                          >
                            {paynowButtonLoadingContent != null
                              ? paynowButtonLoadingContent
                              : t("pay_now")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="Spacer-8"></div>
        </div>
      );
    }
  }
}

export default withToastManager(translate(InvoiceIndex));
