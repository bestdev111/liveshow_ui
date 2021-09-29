import React, { Component } from "react";
import Sidebar from "../layouts/sidebar/Sidebar";
import "./Refferral.css";
import { Link } from "react-router-dom";
import { translate, t } from "react-multi-lang";


class Refferral extends Component {
    render() {
        return (
            <div className="main">
                <Sidebar />
                <div className="sec-padding refferral-sec left-spacing1">
                    <div className="row small-padding">
                        <div className="public-video-header">{t("refferral")}</div>
                        <div className="Spacer-9"></div>
                        <div className="col-md-7">
                            <div className="refer-box">
                                <span className="item-arrow"></span>
                                <h2>{t("spread_the_word_and_earn_rewards")}</h2>
                                <p>{t("sing_up_with_unique_refferal_link")}<span>$10</span></p>
                                <h4>{t("copy_invite_link")}</h4>
                                <form>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="https://streamnow.com/rc/5f5a69a3c77c4" />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="refer-right-box">
                                <div className="refer-right-header">
                                    <h4>{t("c_refferral")}</h4>
                                </div>
                                <div className="refer-right-body">
                                    <div className="card-body">
                                        <p>{t("total")} <span class="pull-right"><b>1</b></span></p>
                                        <hr />

                                        <p>{t("earnings")} <span class="pull-right"> <b>$ 10</b></span></p>
                                        <hr />
                                    </div>
                                    <div className="card-footer">
                                        <a href="#" class="btn btn-primary text-uppercase"><i class="fa fa-money"></i> {t("check_redeems")}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Spacer-9"></div>
                    <h4>{t("c_refferrals")}</h4>
                    <hr></hr>
                    <div className="refer-table">
                        <div className="row">
                            <div className="col-md-2">
                                <img src="assets/img/placeholder-profile.jpg" className="user-img" />
                            </div>
                            <div className="col-md-3">
                                <h4>Beno Darry</h4>
                            </div>
                            <div className="col-md-3">
                                <h4>5f5a69a3c77c4</h4>
                            </div>
                            <div className="col-md-2">
                                <h4>20 Sep 2020</h4>
                            </div>
                            <div className="col-md-2">
                                <div className="align-right">
                                    <a href="#" class="btn btn-info">
                                        {t("more")} <i class="fa fa-angle-right"></i><i class="fa fa-angle-right"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default translate(Refferral);
