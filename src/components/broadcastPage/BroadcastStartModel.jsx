import React, { Component } from "react";
import { translate, t } from "react-multi-lang";

class BroadcastStartModel extends Component {
    state = {};
    render() {
        const {
            modelChange,
            startBroadcastInputData,
            modelLoadingContent,
            modelButtonDisabled,
            loadingGroup,
            groupData,
            startBroadcastAPI,
        } = this.props;
        return (
            <div
                className="modal fade modal-index login-modal"
                id="start_broadcast"
                role="dialog"
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header top-border-radius">
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                            >
                                &times;
                            </button>
                            <h4 className="modal-title">{t("go_lyve")}</h4>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <form onSubmit={startBroadcastAPI}>
                                        <div className="form-group">
                                            <label>Title</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                placeholder={t('broadcast_title')}
                                                name="title"
                                                required
                                                value={
                                                    startBroadcastInputData.title
                                                }
                                                onChange={modelChange}
                                            />
                                        </div>
                                        <div className="form-group ">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <label>
                                                        {t("close_streaming_mode")}:
                                                    </label>
                                                </div>
                                                <div className="col-md-2">
                                                    <label className="custom-radio-btn">
                                                        {t('public')}
                                                        <input
                                                            type="radio"
                                                            name="type"
                                                            value="public"
                                                            onChange={
                                                                modelChange
                                                            }
                                                        />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </div>
                                                <div className="col-md-2">
                                                    <label className="custom-radio-btn">
                                                        {t('private')}
                                                        <input
                                                            type="radio"
                                                            name="type"
                                                            value="private"
                                                            onChange={
                                                                modelChange
                                                            }
                                                        />
                                                        <span className="checkmark choose-date-check"></span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group ">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <label>
                                                        {t("payment_status")}:
                                                    </label>
                                                </div>

                                                <div className="col-md-2">
                                                    <label className="custom-radio-btn">
                                                        {t("free")}
                                                        <input
                                                            type="radio"
                                                            name="payment_status"
                                                            value={0}
                                                            onChange={
                                                                modelChange
                                                            }
                                                        />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </div>
                                                <div className="col-md-2">
                                                    <label className="custom-radio-btn">
                                                         {t("paid")}
                                                        <input
                                                            type="radio"
                                                            name="payment_status"
                                                            value={1}
                                                            onChange={
                                                                modelChange
                                                            }
                                                        />
                                                        <span className="checkmark choose-date-check"></span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="form-group"
                                            id="broadcast-amount"
                                            hidden
                                        >
                                            <label>{t("amount")}</label>
                                            <input
                                                type="number"
                                                min="0"
                                                step="any"
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                placeholder={t('enter_the_amount')}
                                                name="amount"
                                                value={
                                                    startBroadcastInputData.amount
                                                }
                                                onChange={modelChange}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label for="groups">
                                                Choose Group:{" "}
                                                <span className="text-muted">
                                                    ({t("optional")})
                                                </span>
                                            </label>
                                            <select
                                                id="groups"
                                                name="live_group_id"
                                                className="form-control"
                                                onChange={modelChange}
                                            >
                                                <option value="">{t("select")}</option>
                                                {loadingGroup
                                                    ? t('loading')
                                                    : groupData.length > 0
                                                    ? groupData.map((group) => (
                                                          <option
                                                              value={
                                                                  group.live_group_id
                                                              }
                                                          >
                                                              {
                                                                  group.live_group_name
                                                              }
                                                          </option>
                                                      ))
                                                    : t("no_data_found")}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">
                                                {t("description")}
                                            </label>
                                            <textarea
                                                className="form-control"
                                                placeholder={t('description_here')}
                                                name="description"
                                                required
                                                value={
                                                    startBroadcastInputData.description
                                                }
                                                onChange={modelChange}
                                            ></textarea>
                                        </div>
                                        <div className="modal-btn">
                                            <button
                                                type="submit"
                                                className="btn"
                                                disabled={modelButtonDisabled}
                                                onClick={startBroadcastAPI}
                                            >
                                                {modelLoadingContent != null
                                                    ? modelLoadingContent
                                                    : t('start_broadcasting')}
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                <div className="Spacer-10"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default translate(BroadcastStartModel);
