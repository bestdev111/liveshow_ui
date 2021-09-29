import React, { Component } from "react";
import { Link } from "react-router-dom";

class NotificationCard extends Component {
  state = {};
  render() {
    const { notification } = this.props;
    return (
      <div className="col-md-12">
        <div className="notify-box">
          <div className="row">
            <div className="col-md-6">
              <div className="notify-img">
                <Link
                  to={{
                    pathname:
                      notification.type == "LIVE_STREAM_STARTED"
                        ? "/broadcast"
                        : "",
                    state: { live_video_id: notification.link_id },
                  }}
                  className="user-profile"
                >
                  <img src={notification.user_picture} alt="user" />
                </Link>
              </div>
              <div className="notify-content">
                <h4>{notification.notification}</h4>
                <p> {notification.user_name}</p>
              </div>
            </div>
            <div className="col-md-6 text-right">
              <a href="#">
                <div className="notify-close-icon">
                  {/* <i className="fas fa-times"></i> */}
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotificationCard;
