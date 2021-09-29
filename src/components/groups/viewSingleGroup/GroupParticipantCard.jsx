import React, { Component } from "react";

class GroupParticipantCard extends Component {
  state = {};
  render() {
    const {
      member,
      removeMemberButtonDisable,
      removeMemberLoadingContent,
      removeMemberInputData,
      removeMember,
    } = this.props;
    return (
      <div className="col-md-6">
        <div className="notify-box">
          <div className="row">
            <div className="col-md-9">
              <div className="notify-img">
                <a href="#" className="user-profile">
                  <img src={member.member_picture} alt="" />
                </a>
              </div>
              <div className="notify-content">
                <h4>{member.member_name}</h4>
                <p> {member.member_description}</p>
              </div>
            </div>
            {member.is_remove_member == 1 ? (
              <div className="col-md-2 text-right">
                <a
                  href="#"
                  onClick={(event) => removeMember(event, member)}
                  disabled={
                    removeMemberInputData.member_id == member.member_id &&
                    removeMemberButtonDisable
                      ? true
                      : false
                  }
                >
                  {removeMemberInputData.member_id == member.member_id &&
                  removeMemberLoadingContent != null ? (
                    removeMemberLoadingContent
                  ) : (
                    <div className="notify-close-icon">
                      <a href="#"><i className="fas fa-times"></i></a>
                    </div>
                  )}
                </a>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default GroupParticipantCard;
