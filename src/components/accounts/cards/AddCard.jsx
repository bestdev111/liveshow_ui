import React, { Component } from "react";
import {
  injectStripe,
  CardElement,
  Elements,
  StripeProvider,
} from "react-stripe-elements";
import { withToastManager } from "react-toast-notifications";
import Sidebar from "../../layouts/sidebar/Sidebar";
import api from "../../../Environment";
import ToastContent from "../../helper/ToastContent";
import { Link } from "react-router-dom";
import { translate, t } from "react-multi-lang";

class AddCard extends Component {
  state = {
    loadingContent: null,
    buttonDisable: false,
  };
  addCard = (ev) => {
    ev.preventDefault();
    this.setState({
      loadingContent: t("please_wait_request_processing"),
      buttonDisable: true,
    });
    if (this.props.stripe) {
      this.props.stripe
        .createToken({ type: "card", name: localStorage.getItem("username") })
        .then((payload) => {
          const inputData = {
            card_token: payload.token.id,
          };
          api
            .postMethod("cards_add", inputData)
            .then((response) => {
              if (response.data.success) {
                ToastContent(
                  this.props.toastManager,
                  response.data.message,
                  "success"
                );
                this.setState({
                  loadingContent: null,
                  buttonDisable: false,
                });

                window.location = "/cards";
              } else {
                ToastContent(
                  this.props.toastManager,
                  response.data.error,
                  "error"
                );
              }
            })
            .catch((error) => {
              this.setState({
                loadingContent: null,
                buttonDisable: false,
              });
              ToastContent(this.props.toastManager, error, "error");
            });
        })
        .catch((error) => {
          this.setState({
            loadingContent: null,
            buttonDisable: false,
          });
          ToastContent(
            this.props.toastManager,
            t("please_check_your_card_details"),
            "error"
          );
        });
    } else {
      this.setState({
        loadingContent: null,
        buttonDisable: false,
      });
      ToastContent(
        this.props.toastManager,
        t("stripe_not_configured"),
        "error"
      );
    }
  };
  render() {
    return (
      <div class="main">
        <Sidebar />

        <div class="sec-padding add-card left-spacing1">
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-10">
              <h3 class="heading-element text-center">{t("add_card")}</h3>
              <div class="Spacer-10"></div>
              <div class="row m-0">
                <div
                  class="addcard-bgimg col-md-5 col-lg-5 p-0"
                  style={{
                    backgroundImage: "url(/assets/img/pro-bg1.jpg);",
                  }}
                >
                  <div class="addcard-bg-overlay">
                    <div class="text-center">
                      <img
                        class="payment-card-img"
                        src="/assets/img/payment.png"
                      />
                      <div class="text-right mt-15 mr-15">
                        <Link class="white-link text-capitalize" to={"cards"}>
                          {t("card_details")}
                          <i class="fa fa-angle-double-right ml-5"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="addcard-form col-md-7 col-lg-7">
                  <form class="payment-form" onSubmit={this.addCard}>
                    {/* <div class="form-group">
                          <label>{t("card_number")}</label>
                          <input
                            class="form-control"
                            id="number"
                            maxlength="16"
                            name="number"
                            pattern="[0-9]{16,}"
                            placeholder="XXXX XXXX XXXX XXXX"
                            required=""
                            title={t('please_enter_16_digit')}
                            type="text"
                          />
                        </div>
                        <div class="form-group">
                          <label>Expiry Date</label>
                          <div class="row">
                            <div class="col-xs-6">
                              <input
                                class="form-control"
                                maxlength="2"
                                name="exp_month"
                                placeholder="MM"
                                title={t('please_enter_2_digit')}
                                type="text"
                              />
                            </div>
                            <div class="col-xs-6">
                              <input
                                class="form-control"
                                maxlength="2"
                                name="exp_year"
                                placeholder="YY"
                                title={t('please_enter_2_digit')}
                                type="text"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="form-group">
                          <label>{t("cvv")}</label>
                          <input
                            class="form-control"
                            id="cvv"
                            maxlength="4"
                            name="cvc"
                            placeholder={t('cvv')}
                            required=""
                            title={t('please_enter_3_4_digit')}
                            type="text"
                          />
                        </div>
                        */}
                    <CardElement />
                    <div class="text-right top-spacing1">
                      <button
                        class="btn2  width-200"
                        id="add_card_button"
                        type="submit"
                        disabled={this.state.buttonDisable}
                        onClick={this.addCard}
                      >
                        {this.state.loadingContent != null
                          ? this.state.loadingContent
                          : t("add_card")}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectStripe(withToastManager(translate(AddCard)));
