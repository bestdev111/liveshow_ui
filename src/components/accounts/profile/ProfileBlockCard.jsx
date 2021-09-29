import React, { Component } from "react";
import { translate, t } from "react-multi-lang";

class ProfileBlockCard extends Component {
  state = {};
  render() {
    const {
      user,
      unBlockUser,
      unBlockButtonDisable,
      unBlockInput,
      loadingContentUnblock,
    } = this.props;
    return (
      <div className="col-xs-12 col-sm-4 col-md-3 col-lg-3 top-margin bottom-space">
        <div className="card-user-profile text-center box-shadow">
          <div className="profile-user-img">
            <img
              className="img-circle img-responsive following-img"
              src={user.picture}
            />
          </div>
          <h4 className="h4-s user-name text-bold overflow">{user.name}</h4>
          <button
            className="btn btn-default btn-block btn-lg"
            type="button"
            onClick={(event) => unBlockUser(event, user)}
            disabled={
              unBlockInput.user_id == user.block_user_id && unBlockButtonDisable
                ? true
                : false
            }
          >
            {unBlockInput.user_id == user.block_user_id &&
            loadingContentUnblock != null
              ? loadingContentUnblock
              : t('unblock')}
          </button>
        </div>
      </div>
    );
  }
}

export default translate(ProfileBlockCard);
