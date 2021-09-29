import React, { Component } from "react";
import GroupDetails from "./GroupDetails";
import GroupParticipantCard from "./GroupParticipantCard";
import AddParticipants from "./AddParticipants";
import EditGroup from "./EdiGroup";
import Sidebar from "../../layouts/sidebar/Sidebar";
import api from "../../../Environment";
import ToastContent from "../../helper/ToastContent";
import { withToastManager } from "react-toast-notifications";
import Helper from "../../helper/Helper";
import { translate, t } from "react-multi-lang";

const $ = window.$;

class ViewSingleGroupIndex extends Helper {
  state = {
    groupData: {},
    loadingGroup: true,
    loadingContentDelete: null,
    deleteButtonDisable: false,
    inputData: {},
    loadingContent: null,
    buttonDisable: false,
    searchParticipantAPIResponse: null,
    searchParticipantLoading: true,
    searchParticipantInputData: {
      live_group_id: this.props.match.params.id,
      take: 4,
    },
    addParticipantInputData: {
      live_group_id: this.props.match.params.id,
    },
    addParticipantLoadingContent: null,
    addParticipantButtonDisable: false,
    removeMemberLoadingContent: null,
    removeMemberButtonDisable: false,
    removeMemberInputData: {
      live_group_id: this.props.match.params.id,
    },
  };
  componentDidMount() {
    this.getSingleGroupDetails();
  }

  getSingleGroupDetails = () => {
    api
      .postMethod("live_groups_view", {
        live_group_id: this.props.match.params.id,
      })
      .then((response) => {
        if (response.data.success) {
          const inputData = { ...this.state.inputData };
          inputData["live_group_id"] =
            response.data.data.group_details.live_group_id;
          inputData["name"] = response.data.data.group_details.live_group_name;
          inputData["description"] =
            response.data.data.group_details.live_group_description;
          this.setState({ inputData });

          this.setState({
            groupData: response.data.data,
            loadingGroup: false,
          });
        } else {
        }
      });
  };

  saveGroup = (event) => {
    event.preventDefault();
    this.setState({
      loadingContent: t('loading'),
      buttonDisable: true,
    });

    api
      .postMethod("live_groups_save", this.state.inputData)
      .then((response) => {
        if (response.data.success) {
          ToastContent(
            this.props.toastManager,
            response.data.message,
            "success"
          );
          this.setState({ loadingContent: null, buttonDisable: false });
        } else {
          ToastContent(this.props.toastManager, response.data.error, "error");
          this.setState({ loadingContent: null, buttonDisable: false });
        }
        $("#edit-group").modal("hide");
      });
  };

  deleteGroup = () => {
    this.setState({
      deleteButtonDisable: true,
      loadingContentDelete: t('loading_please_wait'),
    });
    api
      .postMethod("live_groups_delete", {
        live_group_id: this.props.match.params.id,
      })
      .then((response) => {
        if (response.data.success) {
          ToastContent(
            this.props.toastManager,
            response.data.message,
            "success"
          );
          this.props.history.push("/group/view-all");
        } else {
          ToastContent(this.props.toastManager, response.data.error, "error");
        }
        this.setState({
          deleteButtonDisable: false,
          loadingContentDelete: null,
        });
      });
  };

  searchParitcipantChange = ({ currentTarget: input }) => {
    const searchParticipantInputData = {
      ...this.state.searchParticipantInputData,
    };
    searchParticipantInputData[input.name] = input.value;
    this.setState({ searchParticipantInputData });
    setTimeout(() => {
      this.searchParticipantApiCall();
    }, 1000);
  };

  searchParticipantApiCall = () => {
    api
      .postMethod(
        "live_groups_members_search",
        this.state.searchParticipantInputData
      )
      .then((response) => {
        if (response.data.success) {
          this.setState({
            searchParticipantAPIResponse: response.data.data,
            searchParticipantLoading: false,
          });
        } else {
        }
      });
  };

  addParticipant = (event, user) => {
    event.preventDefault();
    this.setState({
      addParticipantButtonDisable: true,
      addParticipantLoadingContent: t("adding"),
    });
    const addParticipantInputData = {
      ...this.state.addParticipantInputData,
    };
    addParticipantInputData["member_id"] = user.user_id;
    this.setState({ addParticipantInputData });

    setTimeout(() => {
      api
        .postMethod(
          "live_groups_members_add",
          this.state.addParticipantInputData
        )
        .then((response) => {
          if (response.data.success) {
            this.setState({
              addParticipantLoadingContent: null,
              addParticipantButtonDisable: false,
            });

            // Removing the user from the list.
            let array = [...this.state.searchParticipantAPIResponse]; // make a separate copy of the array
            let index = array.indexOf(user);
            if (index !== -1) {
              array.splice(index, 1);
              this.setState({ searchParticipantAPIResponse: array });
            }
            ToastContent(this.props.toastManager, response.data.message, "success");

          } else {
            ToastContent(this.props.toastManager, response.data.error, "error");
            this.setState({
              addParticipantLoadingContent: null,
              addParticipantButtonDisable: false,
            });
          }
        });
    }, 1000);
  };

  removeMember = (event, user) => {
    event.preventDefault();
    this.setState({
      removeMemberButtonDisable: true,
      removeMemberLoadingContent:  t("removing"),
    });
    const removeMemberInputData = {
      ...this.state.removeMemberInputData,
    };
    removeMemberInputData["member_id"] = user.member_id;
    this.setState({ removeMemberInputData });

    setTimeout(() => {
      api
        .postMethod(
          "live_groups_members_remove",
          this.state.removeMemberInputData
        )
        .then((response) => {
          if (response.data.success) {
            this.setState({
              removeMemberLoadingContent: null,
              removeMemberButtonDisable: false,
            });

            // Removing the user from the list.
            let array = [...this.state.groupData.members]; // make a separate copy of the array
            let index = array.indexOf(user);
            if (index !== -1) {
              array.splice(index, 1);
              const groupData = { ...this.state.groupData };
              groupData["members"] = array;
              this.setState({ groupData });
            }
            ToastContent(this.props.toastManager, response.data.message, "success");

          } else {
            ToastContent(this.props.toastManager, response.data.error, "error");
            this.setState({
              removeMemberLoadingContent: null,
              removeMemberButtonDisable: false,
            });
          }
        });
    }, 1000);
  };

  render() {
    const {
      groupData,
      loadingGroup,
      deleteButtonDisable,
      loadingContentDelete,
      loadingContent,
      buttonDisable,
      inputData,
      searchParticipantInputData,
      searchParticipantAPIResponse,
      searchParticipantLoading,
      addParticipantInputData,
      addParticipantLoadingContent,
      addParticipantButtonDisable,
      removeMemberButtonDisable,
      removeMemberLoadingContent,
      removeMemberInputData,
    } = this.state;
    return (
      <div className="main">
        <Sidebar />
        {loadingGroup ? (
          t('loading')
        ) : (
          <div className="sec-padding view-group left-spacing1">
            <div className="Spacer-10"></div>
            <div className="public-video-header">{t("view_group")}</div>
            <div className="Spacer-10"></div>

            <GroupDetails groupDetails={groupData.group_details} />

            <div className="Spacer-10"></div>
            <div className="row text-center small-padding">
              {groupData.actions.is_edit_group == 1 ? (
                <div className="col-md-4">
                  <a
                    href="#"
                    className="btn btn-group"
                    data-toggle="modal"
                    data-target="#edit-group"
                  >
                    <i className="fa fa-edit icon"></i> {t("edit_group")}
                  </a>
                </div>
              ) : (
                ""
              )}
              {groupData.actions.is_add_remove_group == 1 ? (
                <div className="col-md-4">
                  <a
                    href="#"
                    className="btn btn-group"
                    data-toggle="modal"
                    data-target="#add-participate"
                  >
                    <i className="fa fa-plus-square icon"></i> {t("add_participants")}
                  </a>
                </div>
              ) : (
                ""
              )}
              {groupData.actions.is_delete_group == 1 ? (
                <div className="col-md-4">
                  <a
                    href="#"
                    className="btn btn-group"
                    onClick={this.deleteGroup}
                    disabled={deleteButtonDisable}
                  >
                    <i className="fa fa-trash icon"></i>
                    {loadingContentDelete != null
                      ? loadingContentDelete
                      : t('delete_group')}
                  </a>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="Spacer-10"></div>
            <div className="row small-padding">
              {groupData.members.length > 0
                ? groupData.members.map((member) => (
                    <GroupParticipantCard
                      member={member}
                      removeMemberButtonDisable={removeMemberButtonDisable}
                      removeMemberLoadingContent={removeMemberLoadingContent}
                      removeMemberInputData={removeMemberInputData}
                      removeMember={this.removeMember}
                    />
                  ))
                : "Looks like there is no participant yet..."}
            </div>
            <AddParticipants
              searchParitcipantChange={this.searchParitcipantChange}
              searchParticipantInputData={searchParticipantInputData}
              searchParticipantLoading={searchParticipantLoading}
              searchParticipantAPIResponse={searchParticipantAPIResponse}
              addParticipant={this.addParticipant}
              addParticipantInputData={addParticipantInputData}
              addParticipantLoadingContent={addParticipantLoadingContent}
              addParticipantButtonDisable={addParticipantButtonDisable}
              getSingleGroupDetails={this.getSingleGroupDetails}
            />
            <EditGroup
              handleChange={this.handleChange}
              inputData={inputData}
              loadingContent={loadingContent}
              buttonDisable={buttonDisable}
              saveGroup={this.saveGroup}
              handleChangeImage={this.handleChangeImage}
            />
          </div>
        )}
      </div>
    );
  }
}

export default withToastManager(translate(ViewSingleGroupIndex));