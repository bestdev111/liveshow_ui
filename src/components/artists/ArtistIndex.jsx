import React, { Component } from "react";
import { translate, t } from "react-multi-lang";
import api from "../../Environment";
import { Link } from "react-router-dom";
const $ = window.$;

class ArtistIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardChange: null,
            cardData: [],
        };
    }

    cardChange = (e) => {
        this.setState(prevState => ({ ...prevState, cardData: { ...prevState.cardData, name: e.target.value, url: e.target.value } }));
    };

    componentDidMount() {
        this.startScheduleAPICall();
    }
    startScheduleAPICall = () => {

        api
            .getMethod(
                "live_events_schedule_all"
            )
            .then((response) => {
                if (response.data?.success) {
                    this.setState({
                        cardData: response.data?.data
                    });
                } else {
                    if (response.data?.error_code == 132) {
                    } else {
                        this.setState({
                            modelLoadingContent: null,
                            modelButtonDisabled: false,
                        });
                        return false;
                    }
                }
            });
    };

    render() {
        const { cardData } = this.state;

        return (
            <div className="container">
                <div className="row">
                    {cardData.sort((a, b) => a.itemM > b.itemM ? 1 : -1).map((item, index) => (
                        <div key={`card-${index}`} className="col-xs-12 col-sm-6 col-md-4 col-lg-4 top-margin bottom-space">
                            <div className="live-video-box">
                                <img src={item.url} className="home-card-img" />
                                <div className="card-user-profile-home spacing">
                                    <h4 className="h4-s user-name text-bold overflow home-card-color">{item.name}</h4>
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                            <h4 className="h4-s user-name primary-clr home-card-color">
                                                <i className="fa fa-eye icon home-card-color"></i>
                                                {t("followers")}
                                            </h4>
                                        </div>
                                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
        );
    }
}
export default translate(ArtistIndex);