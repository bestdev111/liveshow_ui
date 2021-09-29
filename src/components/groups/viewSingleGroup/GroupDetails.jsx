import React, { Component } from "react";

class GroupDetails extends Component {
  state = {};
  render() {
    const { groupDetails } = this.props;
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div className="live-video-box border-zero live-video-box-small">
            <div
              className="public-img large-img"
              style={{
                backgroundImage: `url(${groupDetails.live_group_picture})`,
              }}
            ></div>
            <div className="user-profile spacing">
              <div className="row">
                <div className="col-md-6">
                  <h4 className="h4-s title overflow">
                    {groupDetails.live_group_name}
                  </h4>
                  <h5 className="h5-s desc text-grey-clr">
                    {groupDetails.live_group_description}
                  </h5>
                </div>
                <div className="col-md-6 ">
                  <div className="text-right resp-center">
                    <h5 className="h5-s user-name text-grey-clr mt-5 overflow">
                      <i className="fa fa-calendar-alt icon"></i>
                      {groupDetails.date}
                    </h5>
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

export default GroupDetails;
