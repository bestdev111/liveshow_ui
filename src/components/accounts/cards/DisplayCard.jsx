import React, { Component } from "react";
import Sidebar from "../../layouts/sidebar/Sidebar";
import { Link } from "react-router-dom";
import Helper from "../../helper/Helper";
import ToastContent from "../../helper/ToastContent";
import { withToastManager } from "react-toast-notifications";
import api from "../../../Environment";
import { translate, t } from "react-multi-lang";


class DisplayCard extends Helper {
  state = {
    cardData: null,
    loadingCard: true,
  };
  componentDidMount() {
    this.listCardApi();
  }
  setDefaultCard = (event, card) => {
    event.preventDefault();
    api
      .postMethod("cards_default", {
        card_id: card.card_id,
      })
      .then((response) => {
        if (response.data.success) {
          ToastContent(
            this.props.toastManager,
            response.data.message,
            "success"
          );
          this.setState({ loadingCard: true, cardData: null });
          this.listCardApi();
        } else {
          ToastContent(this.props.toastManager, response.data.error, "error");
        }
      });
  };

  deleteCard = (event, card) => {
    event.preventDefault();
    api
      .postMethod("cards_delete", {
        card_id: card.card_id,
      })
      .then((response) => {
        if (response.data.success) {
          ToastContent(
            this.props.toastManager,
            response.data.message,
            "success"
          );
          this.setState({ loadingCard: true, cardData: null });
          this.listCardApi();
        } else {
          ToastContent(this.props.toastManager, response.data.error, "error");
        }
      });
  };
  render() {
    const { cardData, loadingCard } = this.state;
    return (
      <div class="main">
        <Sidebar />

        <div class="sec-padding add-card card-details left-spacing1">
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-10">
              <h3 class="heading-element text-center">{t("card_details")}</h3>
              <div class="Spacer-10"></div>
              <div class="row m-0">
                <div
                  class="addcard-bgimg col-md-5 col-lg-5 p-0"
                  style={{ backgroundImage: "url(/assets/img/pro-bg1.jpg);" }}
                >
                  <div class="addcard-bg-overlay">
                    <div class="text-center">
                      <img
                        class="payment-card-img"
                        src="/assets/img/payment.png"
                      />
                    </div>
                  </div>
                </div>
                <div class="addcard-form col-md-7 col-lg-7">
                  <div class="added-card">
                    <div>
                      {loadingCard
                        ? t('loading')
                        : cardData.cards.length > 0
                        ? cardData.cards.map((card) => (
                            <React.Fragment>
                              <div class="display-inline">
                                <div class="payment-left">
                                  <img src="/assets/img/credit-card.png" />
                                </div>
                                <div class="payment-right">
                                  <h5>XXXX XXXX XXXX {card.last_four}</h5>
                                  <a class="green-clr">
                                    {card.is_default == 1 ? t('default_card') : 
                                    
                                    <Link className="text-info"
                                    onClick={(event) =>
                                      this.setDefaultCard(event, card)
                                    }
                                    to={""}
                                  >
                                    Set as Default
                                  </Link>
                                    }
                                  </a>
                                </div>
                                <Link
                                  onClick={(event) =>
                                    this.deleteCard(event, card)
                                  }
                                  to={""}
                                >
                                  <i className="fa fa-trash pull-right"></i>
                                </Link>
                              </div>
                              <p class="line1 mb-17"></p>
                            </React.Fragment>
                          ))
                        : ""}
                    </div>
                    <div class="display-inline">
                      <div class="payment-left">
                        <img src="/assets/img/credit-card-plus.png" />
                      </div>
                      <div class="payment-right">
                        <Link class="addcard" to={"/add-card"}>
                          {t("add_card")}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withToastManager(translate(DisplayCard));