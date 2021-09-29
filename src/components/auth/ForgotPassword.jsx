import React, { Component } from "react";
import { translate, t } from "react-multi-lang";

class ForgotPassword extends Component {
    state = {};
    render() {
        const {
            inputData,
            handleChange,
            handleLogin,
            loadingContent,
            buttonDisable,
            handleForgotPassword,
        } = this.props;
        return (
            <div
                className="modal fade modal-index"
                id="forgot-password-stremer"
                role="dialog"
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                            >
                                &times;
                            </button>
                            <h4 className="modal-title">{t("forgot_password")}</h4>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="header-content">
                                        <h5>{t("hey_there")},</h5>
                                        <p>
                                          {t("reset_your_password_note")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="Spacer-10"></div>
                            <div className="row">
                                <div className="col-md-12">
                                    <form onSubmit={handleForgotPassword}>
                                        <div className="form-group">
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                placeholder={t('email')}
                                                name="email"
                                                value={inputData.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="modal-btn text-center">
                                            <button
                                                type="submit"
                                                className="btn-forgot"
                                                disabled={buttonDisable}
                                            >
                                                {loadingContent != null
                                                    ? loadingContent
                                                    : t('send')}
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

export default translate(ForgotPassword);