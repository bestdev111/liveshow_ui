import React, { Component } from "react";
import { translate, t } from "react-multi-lang";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'moment/locale/he';
import api from "../../Environment";
import ToastContent from "../helper/ToastContent";
import { withToastManager } from "react-toast-notifications";

const $ = window.$;
class EventModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            imagePreviewUrl: null,
            startEventInputData: null,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
    }
    handleChange(date) {
        this.setState({ startDate: moment(date).toDate() })

        const startEventInputData = {
            ...this.state.startEventInputData,
        };
        startEventInputData['date'] = date;
        this.setState({ startEventInputData });
    }

    handleChangeImage(event) {
        const startEventInputData = {
            ...this.state.startEventInputData,
        };  
        let img =event.target.files[0];
        startEventInputData["url"] = img;
        console.log("url: ", event.target.files[0]);
        this.setState({
            imagePreviewUrl: URL.createObjectURL(img)
        });
        console.log("imagePreviewUrl: ", URL.createObjectURL(img));
        this.setState({ startEventInputData });
    };

    modelEventChange = ({ currentTarget: input }) => {
        const startEventInputData = {
            ...this.state.startEventInputData,
        };
        startEventInputData[input.name] = input.value;
        this.setState({ startEventInputData });
    };

    startScheduleAPI = (event) => {
        event.preventDefault();
        this.setState({
            modelLoadingContent: t('loading'),
            modelButtonDisabled: true,
            startEventButtonDisable: true,
            startEventButtonLoadingContent: t('loading'),
        });
        console.log("startEventInputData", this.state.startEventInputData);
        this.startScheduleAPICall(this.state.startEventInputData);
    };

    startScheduleAPICall = (startEventInputData) => {

        api
            .postMethod(
                "live_events_schedule_start",
                this.state.startEventInputData
            )
            .then((response) => {
                console.log("data", response['data']);
                if (response.data.success) {
                    ToastContent(this.props.toastManager, response.data.message, "success");
                } else {
                    if (response.data.error_code == 132) {
                        ToastContent(this.props.toastManager, response.data.error, "error");
                        // Send to subscription page.
                    } else if (response.data.error_code == 174) {
                        if (window.confirm(response.data.error)) {
                            this.eraseOldStreamingAPI();
                        } else {
                            this.setState({
                                modelLoadingContent: null,
                                modelButtonDisabled: false,
                            });
                            return false;
                        }
                    } else {
                        ToastContent(this.props.toastManager, response.data.error, "error");
                        this.setState({
                            modelLoadingContent: null,
                            modelButtonDisabled: false,
                        });
                        return false;
                    }
                }
                this.setState({
                    modelLoadingContent: null,
                    modelButtonDisabled: false,
                });
                $("#event_model").modal("hide");
            });
    };

    render() {
        const {
            modelLoadingContent,
            modelButtonDisabled,
            startEventInputData,
            profileImage = `/assets/img/placeholder-profile.jpg`,
        } = this.props;

        return (
            <div
                className="modal fade modal-index login-modal"
                id="event_model"
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
                            <h4 className="modal-title">{t("lets_event")}</h4>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <form onSubmit="startScheduleAPI" className="col" >
                                    <div className="d-flex">
                                        <div className="col padding-eventmodal1">
                                            <div
                                                style={{
                                                    backgroundImage: `url(${this.state.imagePreviewUrl != null ? this.state.imagePreviewUrl : profileImage})`,
                                                }}
                                                className="event-user-profile"
                                            ></div>
                                            <label className="tab-label center-align">
                                                {t("event_thumbnail")}
                                            </label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                id="file-1"
                                                className="inputfile inputfile-2 none"
                                                data-multiple-caption="{count} files selected"
                                                multiple
                                                name="url"
                                                onChange={this.handleChangeImage.bind(this)}
                                                value={startEventInputData.url}
                                            />
                                            <label htmlFor="file-1">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="17"
                                                    viewBox="0 0 20 17"
                                                >
                                                    <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
                                                </svg>
                                                <span>{t("choose_file")}&hellip;</span>
                                            </label>
                                            <div className="form-group">
                                                <label>Select Date </label>
                                                <DatePicker
                                                    name="date"
                                                    selected={this.state.startDate}
                                                    onChange={this.handleChange}
                                                    showTimeSelect
                                                    timeFormat="HH:mm"
                                                    timeIntervals={20}
                                                    timeCaption="time"
                                                    dateFormat="MMMM d, yyyy h:mm aa"
                                                    value={startEventInputData.date}
                                                />
                                            </div>
                                            <div className="Spacer-5 visible-xs"></div>
                                        </div>
                                        <div className="col padding-eventmodal2">
                                            <span className="input input--hoshi">
                                                <input
                                                    className="input__field input__field--hoshi"
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    onChange={this.modelEventChange}
                                                    value={
                                                        startEventInputData.name
                                                    }
                                                />
                                                <label
                                                    className="input__label input__label--hoshi input__label--hoshi-color-1"
                                                    htmlFor="name"
                                                    data-content="Name"
                                                >
                                                    <span className="input__label-content input__label-content--hoshi">
                                                        {t("event_name")}
                                                    </span>
                                                </label>
                                            </span>
                                            <span className="input input--hoshi">
                                                <input
                                                    className="input__field input__field--hoshi"
                                                    type="text"
                                                    id="email"
                                                    name="email"
                                                    onChange={this.modelEventChange}
                                                    value={
                                                        startEventInputData.email
                                                    }
                                                />
                                                <label
                                                    className="input__label input__label--hoshi input__label--hoshi-color-1"
                                                    htmlFor="email"
                                                    data-content="Email"
                                                >
                                                    <span className="input__label-content input__label-content--hoshi">
                                                        {t("email")}
                                                    </span>
                                                </label>
                                            </span>
                                            <span className="input input--hoshi">
                                                <label className="control-label">
                                                    {t("event_description")}
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    placeholder={t('description_here')}
                                                    name="description"
                                                    required
                                                    onChange={this.modelEventChange}
                                                ></textarea>
                                            </span>
                                            <div className="Spacer-16"></div>
                                            <div className="col center-align">
                                                <button
                                                    type="submit"
                                                    className="btn"
                                                    disabled={modelButtonDisabled}
                                                    onClick={this.startScheduleAPI}
                                                >
                                                    {modelLoadingContent != null
                                                        ? modelLoadingContent
                                                        : t('start_scheduling')}
                                                </button>
                                            </div>
                                            <div className="Spacer-5 visible-xs"></div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withToastManager(translate(EventModel));
