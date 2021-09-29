import React, { Component } from "react";
import { translate, t } from "react-multi-lang";

class BroadcastChat extends Component {
  state = {};
  render() {
    const {
      loadMore,
      loadingContent,
      loadMoreButtonDisable,
      chatData,
      loadingChatData,
      handleChatSubmit,
      chatInputChange,
    } = this.props;
    return (
      <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 top-margin">
        <div className="panel panel-default ">
          <div className="panel-heading white-text">
            <i className="fa fa-commenting icon"></i>{t("chat")}
          </div>
          <div className="panel-body">
            {loadingChatData
              ? ""
              : chatData.length > 0
              ? chatData.map((chatDetails) => (
                  <div>
                    <div className="media">
                      <div className="media-left width-60">
                        <img
                          src={chatDetails.user_picture}
                          className="chat-user-img"
                        />
                      </div>
                      <div className="media-body">
                        <h4 className="media-heading">
                          {chatDetails.user_name}
                        </h4>
                        {/* <p className="text-muted">
                                                  {chatDetails.updated}
                                              </p> */}
                        <p>{chatDetails.message}</p>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))
              : "No Data Found"}
          </div>
          <div className="panel-footer">
            {loadingChatData ? (
              <div>
                <div className="input-group">
                  <input
                    type="text"
                    name="message"
                    className="form-control broad-form"
                    placeholder={t('message_here')}
                    disabled
                  />
                  <span className="input-group-addon broad-icon">
                    <i className="fa fa-paper-plane"></i>
                  </span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleChatSubmit}>
                <div className="input-group">
                  <input
                    type="text"
                    name="message"
                    className="form-control broad-form"
                    placeholder={t('message_here')}
                    value={this.props.chatInputMessage}
                    onChange={chatInputChange}
                  />
                  <span
                    className="input-group-addon broad-icon"
                    onClick={handleChatSubmit}
                  >
                    <i className="fa fa-paper-plane"></i>
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default translate(BroadcastChat);
