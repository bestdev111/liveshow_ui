import React, { Component } from "react";
import Sidebar from "../../layouts/sidebar/Sidebar";
import RedeemPayments from "./RedeemPayments";
import api from "../../../Environment";
import ToastContent from "../../helper/ToastContent";
import { withToastManager } from "react-toast-notifications";
import { translate, t } from "react-multi-lang";

class RedeemIndex extends Component {
  state = {
    skipCount: 0,
    loadMoreButtonDisable: false,
    loadingContent: null,
    redeemPaymentData: null,
    loadingRedeem: true,
    redeemData: null,
    redeemInputData: {
      amount: 10,
    },
    cancelButtonDisable: false,
    cancelLoadingContent: null,
    cancelInputData: {},
  };

  componentDidMount() {
    const inputData = {
      skip: this.state.skipCount,
    };
    this.getRedeemDetails(inputData);
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
    this.getRedeemDetails(inputData);
  };

  getRedeemDetails = (inputData) => {
    let items;
    api.postMethod("redeems", inputData).then((response) => {
      if (response.data.success) {
        if (this.state.redeemPaymentData != null) {
          items = [
            ...this.state.redeemPaymentData,
            ...response.data.data.payments,
          ];
        } else {
          items = [...response.data.data.payments];
        }
        this.setState({
          redeemData: response.data.data,
          redeemPaymentData: items,
          loadingRedeem: false,
          skipCount: response.data.data.payments.length + this.state.skipCount,
          loadMoreButtonDisable: false,
          loadingContent: null,
        });
      } else {
      }
    });
  };

  handleChange = ({ currentTarget: input }) => {
    const redeemInputData = { ...this.state.redeemInputData };
    redeemInputData[input.name] = input.value;
    this.setState({ redeemInputData });
  };

  sendRedeemRequest = (event) => {
    event.preventDefault();
    api
      .postMethod("redeems_requests_send", this.state.redeemInputData)
      .then((response) => {
        if (response.data.success) {
          ToastContent(
            this.props.toastManager,
            response.data.message,
            "success"
          );
          this.setState({ redeemPaymentData: null, loadingRedeem: true });
          const inputData = {
            skip: 0,
          };
          setTimeout(() => {
            this.getRedeemDetails(inputData);
          }, 1000);
        } else {
          ToastContent(this.props.toastManager, response.data.error, "error");
        }
      });
  };

  cancelRedeem = (event, payment) => {
    event.preventDefault();
    const cancelInputData = { ...this.state.cancelInputData };
    cancelInputData["redeem_request_id"] = payment.redeem_request_id;
    this.setState({ cancelInputData });
    this.setState({
      cancelButtonDisable: true,
      cancelLoadingContent: t('cancelling'),
    });
    setTimeout(() => {
      api
        .postMethod("redeems_requests_cancel", this.state.cancelInputData)
        .then((response) => {
          if (response.data.success) {
            ToastContent(
              this.props.toastManager,
              response.data.message,
              "success"
            );
            this.setState({
              redeemPaymentData: null,
              loadingRedeem: true,
              cancelButtonDisable: false,
              cancelLoadingContent: null,
            });
            const inputData = {
              skip: 0,
            };
            this.getRedeemDetails(inputData);
          } else {
            ToastContent(this.props.toastManager, response.data.error, "error");
            this.setState({
              cancelButtonDisable: false,
              cancelLoadingContent: null,
            });
          }
        });
    }, 1000);
  };

  render() {
    const {
      loadMoreButtonDisable,
      loadingContent,
      loadingRedeem,
      redeemData,
      redeemPaymentData,
      redeemInputData,
      cancelInputData,
      cancelLoadingContent,
      cancelButtonDisable,
    } = this.state;
    return (
      <div className="main">
        <Sidebar />
        <div className="sec-padding redeems-promo left-spacing1">
          <div className="row">
            <h3 className="heading-element text-center">{t("redeems")}</h3>
            <div className="Spacer-10"></div>
            {loadingRedeem ? (
              t('loading')
            ) : (
              <div className="row">
                <div className="col-lg-5">
                  <div className="redeems-sec redeems">
                    <div
                      className="redeems-img"
                      style={{
                        backgroundImage: "url('/assets/img/gold-plate.png')",
                      }}
                    >
                      <h3 className="gold-clr">
                        {redeemData.redeem_details.remaining_formatted}
                      </h3>
                    </div>
                    <h3 className="mt-0">{t("redeems")}</h3>
                    <h4 className="redeem-text">
                      {t("redeem_your_balance")}
                    </h4>
                    <div className="mt-10 mb-15 text-center resp-left">
                      <a
                        className="btn2"
                        style={{ cursor: "pointer" }}
                        disabled={redeemData.remaining == 0 ? true : false}
                        onClick={this.sendRedeemRequest}
                      >
                        {t("send_redeems")}
                      </a>
                    </div>
                  </div>
                </div>
                {redeemPaymentData.length > 0 ? (
                  <div className="col-lg-7">
                    <div className="redeems-sec redeems">
                      <div className="timeline">
                        {redeemPaymentData.map((payments) => (
                          <RedeemPayments
                            payments={payments}
                            cancelRedeem={this.cancelRedeem}
                            cancelInputData={cancelInputData}
                            cancelLoadingContent={cancelLoadingContent}
                            cancelButtonDisable={cancelButtonDisable}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withToastManager(translate(RedeemIndex));
