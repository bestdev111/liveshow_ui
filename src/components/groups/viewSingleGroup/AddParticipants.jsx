import React, { Component } from "react";
import { translate, t } from "react-multi-lang";

class AddParticipants extends Component {
  state = {};
  render() {
    const {
      searchParticipantInputData,
      searchParticipantAPIResponse,
      searchParticipantLoading,
      searchParitcipantChange,
      addParticipantInputData,
      addParticipant,
      addParticipantLoadingContent,
      addParticipantButtonDisable,
      getSingleGroupDetails,
    } = this.props;
    return (
      <div className="modal fade view-group" id="add-participate" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
          <div className="modal-header"> 
            <button
            className="close"
            data-dismiss="modal"
            id="language_close"
            type="button"
            >
              ×
            </button>
            <h4 className="title">{t("add_participant")}</h4>
          </div>
            <div className="modal-body sm-padding">
              <div className="form-group">
                <input
                  className="form-control"
                  placeholder={t('search_users')}
                  name="key"
                  value={searchParticipantInputData.key}
                  onChange={searchParitcipantChange}
                />
              </div>
              {searchParticipantLoading
                ? ""
                : searchParticipantAPIResponse.length > 0
                ? searchParticipantAPIResponse.map((participant) => (
                    <div className="notify-box">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="notify-img">
                            <a href="#" className="user-profile">
                              <img src={participant.user_picture} alt="" />
                            </a>
                          </div>
                          <div className="notify-content">
                            <h4>{participant.user_name}</h4>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <a href="#">
                            <div className="notify-close-icon pt-89 text-right">
                              <a
                                href="#"
                                className="btn width-100"
                                onClick={(event) =>
                                  addParticipant(event, participant)
                                }
                                disabled={
                                  addParticipantInputData.member_id ==
                                    participant.user_id &&
                                  addParticipantButtonDisable
                                    ? true
                                    : false
                                }
                              >
                                {addParticipantInputData.member_id ==
                                  participant.user_id &&
                                addParticipantLoadingContent != null
                                  ? addParticipantLoadingContent
                                  : t('add')}
                              </a>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                : "{t('no_user_found')}"}

              <div className="fixed-submit-btn">
                <button
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={getSingleGroupDetails}
                >
                  <i className="fa fa-check"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default translate(AddParticipants);