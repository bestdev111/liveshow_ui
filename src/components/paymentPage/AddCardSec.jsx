import React, { Component } from "react";
import {
  injectStripe,
  CardElement,
  Elements,
  StripeProvider,
} from "react-stripe-elements";
import api from "../../Environment";
import ToastContent from "../helper/ToastContent";
import { withToastManager } from "react-toast-notifications";
import { translate, t } from "react-multi-lang";

class AddCardSec extends Component {
  state = {
    addCardLoadingContent: null,
    addCardButtonDisable: false,
  };

  addCard = (ev) => {
    ev.preventDefault();
    this.setState({
      addCardLoadingContent: t("please_wait_request_processing"),
      addCardButtonDisable: true,
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
                  response.data.message +
                    t("click_here_to_pay_now"),
                  "success"
                );
                this.setState({
                  addCardLoadingContent: null,
                  addCardButtonDisable: false,
                });
                this.props.cardAddedStatusChange();
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
                addCardLoadingContent: null,
                addCardButtonDisable: false,
              });
              ToastContent(this.props.toastManager, error, "error");
            });
        })
        .catch((error) => {
          this.setState({
            addCardLoadingContent: null,
            addCardButtonDisable: false,
          });
          ToastContent(
            this.props.toastManager,
            t("please_check_your_card_details"),
            "error"
          );
        });
    } else {
      this.setState({
        addCardLoadingContent: null,
        addCardButtonDisable: false,
      });
      ToastContent(
        this.props.toastManager,
        t("stripe_not_configured"),
        "error"
      );
    }
  };
  render() {
    const { addCardLoadingContent, addCardButtonDisable } = this.state;
    return (
      <div class="modal-body sm-padding">
        <h4 class="title">{t("add_card")}</h4>

        <div class="form-group">
          <CardElement />
        </div>

        <div class="form-group">
          <button
            className="btn btn-group"
            type="submit"
            onClick={this.addCard}
            disabled={addCardButtonDisable}
          >
            {addCardLoadingContent != null ? addCardLoadingContent : t("submit")}
          </button>
        </div>
      </div>
    );
  }
}

export default injectStripe(withToastManager(translate(AddCardSec)));
