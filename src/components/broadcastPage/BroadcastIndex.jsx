// import React, { Component } from "react";
import RTCMultiConnection from "rtcmulticonnection";
import DetectRTC from "../../../node_modules/detectrtc/DetectRTC";
// import RecordRTC from "../../../node_modules/recordrtc/RecordRTC";
import BroadcastChat from "./BroadcastChat";
import Sidebar from "../layouts/sidebar/Sidebar";
// import BroadcastPublicVideoSec from "./BroadcastPublicVideoSec";
import BroadcastStartModel from "./BroadcastStartModel";
import EventModel from "./EventModel";
import VideoConnecting from "./VideoConnecting";
import BroadcastHelper from "./BroadcastHelper";
import api from "../../Environment";
import ToastContent from "../helper/ToastContent";
import { withToastManager } from "react-toast-notifications";
import io from "socket.io-client";
import config from "react-global-configuration";
import { Redirect } from "react-router-dom";
import { translate, t } from "react-multi-lang";
import moment from 'moment';
let connection = new RTCMultiConnection();

// by default, socket.io server is assumed to be deployed on your own URL
// connection.socketURL = "https://rtcmulticonnection.herokuapp.com:443/";

connection.socketURL = "https://admin.lyveshow.com:9002/";

const $ = window.$;
let chatSocket;

class BroadcastIndex extends BroadcastHelper {
  state = {
    subscribers: [],
    chatSocket: false,
    customizeData: {
      audioMute: true,
      audioUnmute: false,
      videoMute: true,
      videoUnmute: false,
      recordStatus: false,
    },
    snapshot: null,
    startBroadcastInputData: {},
    startEventInputData: {},
    modelLoadingContent: null,
    modelButtonDisabled: false,
    groupData: null,
    loadingGroup: true,
    liveVideoData: null,
    loadingLiveVideo: true,
    liveVideoSuggesstion: null,
    loadingLiveVideoSuggesstion: true,
    chatData: null,
    loadingChatData: true,
    chatInputMessage: "",
    loadMoreButtonDisable: false,
    loadingContent: null,
    skipCount: 0,
    viewerCount: 0,
    streamingStatus: false,
    viewerProfileRedirect: false,
    streamingType: null,
    mainStreamer: false,
    loadingStreamingPage: true,
    apiCallstatus: false,
    startBroadcastButtonDisable: false,
    startEventButtondisable: false,
    startBroadcastButtonLoadingContent: null,
    profileData: {},
    handleChange: {}
  };

  componentDidMount() {
    console.log("componentDidMount");
    this.oneToManyConfiguration(connection);
    if (this.props.location.state != null) {
      if (Object.keys(this.props.location.state).length > 2) {
        this.setState({
          liveVideoData: this.props.location.state,
        });
        setTimeout(() => {
          this.watchStreaming();
        }, 1000);
      } else {
        this.getSingleLiveVideoDetails();
      }
    } else {
      if (localStorage.getItem("isStreamer") != 1) {
        alert(t('live_stream_ended'));
        window.location.replace("/");
      }
      this.setState({ loadingStreamingPage: false });
      this.getGroupDetails();
    }

    this.getLiveVideoSuggesstionDetails();
  }

  componentDidUpdate(prevProps, prevState) {
    connection.beforeAddingStream = (stream, peer) => {
      console.log("before Streaming called....");
      this.setState({ viewerCount: this.state.viewerCount + 1 });
      return stream;
    };
  }

  nextConnection = () => {
    connection.onstream = (event) => {
      let existing = document.getElementById(event.streamid);
      if (existing && existing.parentNode) {
        existing.parentNode.removeChild(existing);
      }

      let subscriber = event;
      let subscribers = this.state.subscribers;
      subscribers.push(subscriber);

      this.setState({
        subscribers: subscribers,
        streamingStatus: true,
        loadingStreamingPage: false,
      });

      // to keep room-id in cache
      localStorage.setItem(connection.socketMessageEvent, connection.sessionid);

      if (event.type === "local") {
        connection.socket.on("disconnect", () => {
          if (!connection.getAllParticipants().length) {

            alert('BroadCast Ended');
            this.stopBroadcastAPI();
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        });
        this.takePhoto(event.mediaElement);
      }
    };

    connection.onEntireSessionClosed = (event) => {
      console.log("Entire session is closed: ", event.sessionid, event.extra);
    };

    connection.onstreamended = (event) => {
      console.log("Connection ended check 1");
      let array = [...this.state.subscribers]; // make a separate copy of the array
      let index = array.indexOf(event);
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({ subscribers: array });
      }

      // if (event.type === "local") {
      //   ToastContent(
      //     this.props.toastManager,
      //     "Redirecting to home Page..",
      //     "success"
      //   );
      //   setTimeout(() => {
      //     window.location.replace("/");
      //   }, 1000);
      // }

      if (event.type === "local") {
        if (event.userid === connection.sessionid && !connection.isInitiator) {
          alert('BroadCast Ended');
          this.stopBroadcastAPI();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      } else {
        ToastContent(
          this.props.toastManager,
          t("live_stream_ended"),
          "success"
        );
        setTimeout(() => {
          window.location.replace("/");
        }, 1000);
      }

      // this.addStreamStopListener(event.stream, () => {
      //   alert("screen sharing is ended.");
      // });
      // this.stopBroadcastAPI();
      // window.location.reload();
    };

    connection.onMediaError = (e) => {
      console.log("Connection ended check 2");
      if (e.message === "Concurrent mic process limit.") {
        if (DetectRTC.audioInputDevices.length <= 1) {
          alert(
            t("select_external_microphone")
          );
          return;
        }

        var secondaryMic = DetectRTC.audioInputDevices[1].deviceId;
        connection.mediaConstraints.audio = {
          deviceId: secondaryMic,
        };
        connection.join(connection.sessionid);
      }
    };

    connection.onclose = (event) => {
      console.log("Connection ended check 3");
      alert(t("data_connection_closed"));
      window.location.reload();
    };

    connection.onleave = (event) => {
      if (event.type === "remote") {
        alert(" left you.");
        window.location.replace("/");
      }
      if (event.type === "local") {
        alert(" left you.");
        window.location.reload();
      }
    };
  };

  addStreamStopListener = (stream, callback) => {
    console.log("Connection ended check 4");
    stream.addEventListener(
      "ended",
      function () {
        callback();
        callback = function () {};
      },
      false
    );
    stream.addEventListener(
      "inactive",
      function () {
        callback();
        callback = function () {};
      },
      false
    );
    stream.getTracks().forEach(function (track) {
      track.addEventListener(
        "ended",
        function () {
          callback();
          callback = function () {};
        },
        false
      );
      track.addEventListener(
        "inactive",
        function () {
          callback();
          callback = function () {};
        },
        false
      );
    });
  };

  startStreaming = () => {
    connection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: false,
      OfferToReceiveVideo: false,
    };
    setTimeout(() => {
      let roomid = this.state.liveVideoData.virtual_id;
      connection.open(roomid);
      this.nextConnection();
      this.getLiveVideoChatDetails();
    }, 2000);
  };

  watchStreaming = () => {
    let roomid = this.state.liveVideoData.virtual_id;
    connection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: true,
      OfferToReceiveVideo: true,
    };
    connection.checkPresence(roomid, (isRoomEists, roomid) => {
      if (isRoomEists) {
        connection.join(roomid, (isRoomJoined, roomid, error) => {
          if (error) {
            alert(error);
            window.location.replace("/");
          }
        });
        this.chatSocketConnect();
      } else {
        alert(t("live_streaming_stopped"));
        this.stopBroadcastAPI();
        setTimeout(() => {
          window.location.replace("/");
        }, 1000);
      }
    });
    this.viewerUpdateAPI();
    this.getLiveVideoChatDetails();
    this.nextConnection();
  };

  muteVideo = () => {
    let localStream = connection.attachStreams[0];

    let videoTracks = localStream.getVideoTracks();
    if (videoTracks[0]) {
      videoTracks[0].enabled = false;
    }
    // console.log("mutte sdfd", connection.attachStreams);
    // localStream.mute("video");
    const customizeData = { ...this.state.customizeData };
    customizeData["videoMute"] = false;
    customizeData["videoUnmute"] = true;
    this.setState({ customizeData });
    console.log("video muted");
  };
  unmuteVideo = () => {
    let localStream = connection.attachStreams[0];
    let videoTracks = localStream.getVideoTracks();
    if (videoTracks[0]) {
      videoTracks[0].enabled = true;
    }
    // localStream.unmute("video");
    const customizeData = { ...this.state.customizeData };
    customizeData["videoMute"] = true;
    customizeData["videoUnmute"] = false;
    this.setState({ customizeData });
    console.log("video muted");
  };

  muteAudio = () => {
    let localStream = connection.attachStreams[0];
    // localStream
    //   .getTracks()
    //   .forEach((track) => (track.enabled = !track.enabled));

    console.log("localstream data", localStream);

    let audioTracks = localStream.getAudioTracks();
    if (audioTracks[0]) {
      audioTracks[0].enabled = false;
    }

    const customizeData = { ...this.state.customizeData };
    customizeData["audioMute"] = false;
    customizeData["audioUnmute"] = true;
    this.setState({ customizeData });
    console.log("video muted");
  };

  unmuteAudio = () => {
    let localStream = connection.attachStreams[0];
    let audioTracks = localStream.getAudioTracks();
    if (audioTracks[0]) {
      audioTracks[0].enabled = true;
    }

    const customizeData = { ...this.state.customizeData };
    customizeData["audioMute"] = true;
    customizeData["audioUnmute"] = false;
    this.setState({ customizeData });
    console.log("video muted");
  };

  leaveStreaming = (event, inputIndex) => {
    let array = [...this.state.subscribers]; // make a separate copy of the array
    let index = array.indexOf(event);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ subscribers: array });
      let localStream = connection.attachStreams[inputIndex];
      localStream.stop();
    }
  };

  stopStreaming = (event) => {
    // disconnect with all users

    connection.getAllParticipants().forEach(function (pid) {
      connection.disconnectWith(pid);
    });

    // stop all local cameras
    connection.attachStreams.forEach(function (localStream) {
      localStream.stop();
    });

    // close socket.io connection
    connection.closeSocket();
    this.setState({ subscribers: [] });
    this.stopBroadcastAPI();
  };

  takePhoto = (video) => {
    let canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || video.clientWidth;
    canvas.height = video.videoHeight || video.clientHeight;

    let context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    this.setState({ snapshot: canvas.toDataURL("image/png") });
    setTimeout(() => {
      this.snapShotAPI();
    }, 2000);
  };
  
//Stream lyve model

  modelChange = ({ currentTarget: input }) => {
    const startBroadcastInputData = {
      ...this.state.startBroadcastInputData,
    };
    startBroadcastInputData[input.name] = input.value;
    if (input.name == "payment_status" && input.value == 1) {
      $("#broadcast-amount").show();
    }
    if (input.name == "payment_status" && input.value == 0) {
      $("#broadcast-amount").hide();
    }
    this.setState({ startBroadcastInputData });
  };



  getGroupDetails = () => {
    api.postMethod("live_groups_index").then((response) => {
      if (response.data.success) {
        this.setState({
          groupData: response.data.data.groups,
          loadingGroup: false,
        });
      } else {
      }
    });
  };

  startBroadcastAPI = (event) => {
    event.preventDefault();
    this.setState({
      modelLoadingContent: t('loading'),
      modelButtonDisabled: true,
      startBroadcastButtonDisable: true,
      startBroadcastButtonLoadingContent: t('loading'),
    });
    this.startBroadcastAPICall();
  };

  startBroadcastAPICall = () => {
    api
      .postMethod(
        "live_videos_broadcast_start",
        this.state.startBroadcastInputData
      )
      .then((response) => {
        if (response.data.success) {
          this.setState({
            loadingLiveVideo: false,
            liveVideoData: response.data.data,
          });
          ToastContent(
            this.props.toastManager,
            response.data.message,
            "success"
          );
          this.startStreaming();
          this.chatSocketConnect();
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
                startBroadcastButtonDisable: false,
                startBroadcastButtonLoadingContent: null,
              });
              return false;
            }
          } else {
            ToastContent(this.props.toastManager, response.data.error, "error");
            this.setState({
              modelLoadingContent: null,
              modelButtonDisabled: false,
              startBroadcastButtonDisable: false,
              startBroadcastButtonLoadingContent: null,
            });
            return false;
          }
        }
        this.setState({
          modelLoadingContent: null,
          modelButtonDisabled: false,
        });
        $("#start_broadcast").modal("hide");
      });
  };

  snapShotAPI = () => {
    const inputData = {
      snapshot: this.state.snapshot,
      live_video_id: this.state.liveVideoData.live_video_id,
    };
    api.postMethod("live_videos_snapshot_save", inputData).then((response) => {
      if (response.data.success) {
        this.setState({
          snapshot: null,
        });
      } else {
      }
    });
  };

  stopBroadcastAPI = () => {
    const inputData = {
      live_video_id: this.state.liveVideoData.live_video_id,
    };
    if (this.state.apiCallstatus == false)
      api
        .postMethod("live_videos_broadcast_stop", inputData)
        .then((response) => {
          if (response.data.success) {
            ToastContent(
              this.props.toastManager,
              response.data.message,
              "success"
            );
            this.setState({ apiCallstatus: true });
          } else {
            ToastContent(this.props.toastManager, response.data.error, "error");
          }
        });
  };

  eraseOldStreamingAPI = () => {
    api.postMethod("live_videos_erase_old_streamings").then((response) => {
      if (response.data.success) {
        ToastContent(this.props.toastManager, response.data.message, "success");
        this.startBroadcastAPICall();
      } else {
        ToastContent(this.props.toastManager, response.data.error, "error");
      }
    });
  };

  viewerUpdateAPI = () => {
    const inputData = {
      live_video_id: this.state.liveVideoData.live_video_id,
    };
    api.postMethod("live_videos_viewer_update", inputData).then((response) => {
      if (response.data.success) {
        // ToastContent(
        //     this.props.toastManager,
        //     response.data.message,
        //     "success"
        // );
      } else {
        ToastContent(this.props.toastManager, response.data.error, "error");
        if (
          response.data.error_code == 169 ||
          response.data.error_code == 170 ||
          response.data.error_code == 171
        ) {
          this.props.history.push("/");
        }
      }
    });
  };

  getLiveVideoSuggesstionDetails = () => {
    api.postMethod("live_videos_suggestions").then((response) => {
      if (response.data.success) {
        this.setState({
          liveVideoSuggesstion: response.data.data,
          loadingLiveVideoSuggesstion: false,
        });
      } else {
      }
    });
  };

  getSingleLiveVideoDetails = () => {
    const inputData = {
      live_video_id: this.props.location.state.live_video_id,
    };
    api.postMethod("live_videos_view", inputData).then((response) => {
      if (response.data.success) {
        this.setState({
          liveVideoData: response.data.data,
          loadingLiveVideo: false,
        });
        setTimeout(() => {
          if (this.state.liveVideoData.is_user_needs_to_pay == 1) {
            // this.props.history.push("/invoice", {
            //   state: this.state.liveVideoData,
            //   prevPath: location.pathname,
            // });
            this.props.history.push("/invoice", this.state.liveVideoData);
          } else {
            this.watchStreaming();
            this.chatSocketConnect();
          }
        }, 2000);
      } else {
        ToastContent(this.props.toastManager, response.data.error, "error");
        this.props.history.push("/");
      }
    });
  };

  getLiveVideoChatDetails = () => {
    const inputData = {
      live_video_id: this.state.liveVideoData.live_video_id,
      skip: this.state.skipCount,
    };
    this.getLiveVideoChatAPI(inputData);
  };

  loadMore = (event) => {
    event.preventDefault();
    this.setState({
      loadMoreButtonDisable: true,
      loadingContent: t('loading'),
    });
    const inputData = {
      live_video_id: this.state.liveVideoData.live_video_id,
      skip: this.state.skipCount,
    };

    this.getLiveVideoChatAPI(inputData);
  };

  getLiveVideoChatAPI = (inputData) => {
    let items;
    api.postMethod("live_videos_chat", inputData).then((response) => {
      if (response.data.success) {
        if (this.state.chatData != null) {
          items = [...this.state.chatData, ...response.data.data];
        } else {
          items = [...response.data.data];
        }
        items = items.reverse();
        this.setState({
          chatData: items,
          loadingChatData: false,
          skipCount: response.data.data.length + this.state.skipCount,
          loadMoreButtonDisable: false,
          loadingContent: null,
        });
      } else {
      }
    });
  };

  chatSocketConnect = () => {
    // check the socket url is configured
    let chatSocketUrl = config.get("configData.chat_socket_url");
    console.log("chatSocketUrl" + chatSocketUrl);
    if (chatSocketUrl && Object.keys(this.state.liveVideoData).length > 0) {
      chatSocket = io(chatSocketUrl, {
        query: `room: '` + this.state.liveVideoData.virtual_id + `'`,
      });

      chatSocket.emit("update sender", {
        room: this.state.liveVideoData.virtual_id,
      });
      let chatContent;
      chatSocket.on("message", (newData) => {
        let content = [];
        content.push(newData);
        chatContent = [...this.state.chatData, ...content];
        this.setState({ chatData: chatContent });
      });
    }
  };

  handleChatSubmit = (event) => {
    event.preventDefault();
    const type =
      this.state.liveVideoData.user_id == localStorage.getItem("userId")
        ? "uv"
        : "vu";
    let chatData = [
      {
        live_video_id: this.state.liveVideoData.live_video_id,
        user_id: this.state.liveVideoData.user_id,
        live_video_viewer_id: localStorage.getItem("userId"),
        message: this.state.chatInputMessage,
        type: type,
        user_name: localStorage.getItem("username"),
        user_picture: localStorage.getItem("user_picture"),
      },
    ];
    let chatSocketUrl = config.get("configData.chat_socket_url");
    console.log("chatSocketUrl" + chatSocketUrl);
    if (chatSocketUrl && Object.keys(this.state.liveVideoData).length > 0) {
      chatSocket.emit("message", chatData[0]);
    }
    let messages;
    if (this.state.chatData != null) {
      messages = [...this.state.chatData, ...chatData];
    } else {
      messages = [...chatData];
    }
    this.setState({
      chatData: messages,
      chatInputMessage: "",
    });
  };

  chatInputChange = ({ currentTarget: input }) => {
    this.setState({ chatInputMessage: input.value });
  };

  handleChangeImage = ({ currentTarget: input }) => {
    ToastContent(this.props.toastManager, t("upload_image_message"), "success");
    const inputData = { ...this.state.inputData };
    if (input.type === "file") {
      inputData[input.name] = input.files[0];
      console.log("input.files: ", input.files[0]);
      // inputData["name"] = this.state.profileData.name;
      // inputData["email"] = this.state.profileData.email;
      // inputData["description"] = this.state.profileData.description;
      this.setState({ inputData });
    }
    let reader = new FileReader();
    let file = input.files[0];

    reader.onloadend = () => {
      if (file)
        this.setState({
          imagePreviewUrl: reader.result,
        });
      // console.log("imagePreviewUrl: ", reader.result);
      // if (input.name == "cover")
      //   this.setState({
      //     coverPreviewUrl: reader.result,
      //   });
    };
    if (file) {
      reader.readAsDataURL(file);
      setTimeout(() => {
        this.updateProfileApiCall(this.state.inputData);
      }, 1000);
    }
  };

  render() {
    const {
      startBroadcastInputData,
      startEventInputData,
      modelLoadingContent,
      modelButtonDisabled,
      loadingGroup,
      groupData,
      profileData,
      loadingContent,
      loadMoreButtonDisable,
      chatData,
      loadingChatData,
      handleChange      
      // liveVideoSuggesstion,
      // loadingLiveVideoSuggesstion,
    } = this.state;
    
    return (
      <div class="main">
        <Sidebar />

        {this.state.loadingStreamingPage ? (
          <div className="no-data-found-img">
            <div className="Spacer-10"></div>
            <img
              src={
                window.location.origin +
                "/assets/img/fidget-spinner-loading.gif"
              }
              alt="fidget"
            ></img>
          </div>
        ) : (
          // "Getting details... Please wait.."
          <div className="sec-padding left-spacing1">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 top-margin">
                {this.state.streamingStatus == true &&
                this.state.subscribers.length == 0 ? (
                  <Redirect to="/" />
                ) : null}
                {this.state.subscribers.length > 0 ? (
                  <div className="relative">
                    {this.state.subscribers.map((sub, i) => (
                      <div key={i}>
                        <VideoConnecting
                          streamManager={sub}
                          muteVideo={this.muteVideo}
                          unmuteVideo={this.unmuteVideo}
                          unmuteAudio={this.unmuteAudio}
                          muteAudio={this.muteAudio}
                          stopStreaming={this.stopStreaming}
                          leaveStreaming={this.leaveStreaming}
                          videoIndex={i}
                          customizeData={this.state.customizeData}
                          stopRecordingVideo={this.stopRecordingVideo}
                          takePhoto={this.takePhoto}
                          liveVideoData={this.state.liveVideoData}
                          viewerCount={this.state.viewerCount}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src="/assets/img/stream.jpg"
                      className="img-responsive broadcast-img"
                      alt="streamimg"
                    />
                    <div className="broadcast-btn">
                      <button
                        className="btn bottom-space"
                        type="button"
                        // onClick={this.startStreaming}
                        data-toggle="modal"
                        data-target="#start_broadcast"
                        disabled={this.state.startBroadcastButtonDisable}
                        >
                        {this.state.startBroadcastButtonLoadingContent != null
                          ? this.state.startBroadcastButtonLoadingContent
                          : t("go_lyve")}
                      </button>
                      <div className="Spacer-7"></div>
                      <button
                        className="btn"
                        type="button"
                        data-toggle="modal"
                        data-target="#event_model"
                        // disabled={this.state.startEventButtondisable}
                      >
                        {t("schedule_lyve")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <BroadcastChat
                loadMore={this.loadMore}
                chatData={chatData}
                loadingChatData={loadingChatData}
                loadingContent={loadingContent}
                loadMoreButtonDisable={loadMoreButtonDisable}
                chatInputMessage={this.state.chatInputMessage}
                chatInputChange={this.chatInputChange}
                handleChatSubmit={this.handleChatSubmit}
              />
            </div>
          </div>
        )}
        {/* <BroadcastPublicVideoSec
          liveVideoSuggesstion={liveVideoSuggesstion}
          loadingLiveVideoSuggesstion={loadingLiveVideoSuggesstion}
        /> */}
        <BroadcastStartModel
          startBroadcastInputData={startBroadcastInputData}
          modelLoadingContent={modelLoadingContent}
          modelButtonDisabled={modelButtonDisabled}
          groupData={groupData}
          loadingGroup={loadingGroup}
          modelChange={this.modelChange}
          startBroadcastAPI={this.startBroadcastAPI}
        />
        <EventModel
          startEventInputData={startEventInputData}
          modelLoadingContent={modelLoadingContent}
          modelButtonDisabled={modelButtonDisabled}
          groupData={groupData}
          loadingGroup={loadingGroup}
          modelEventChange={this.modelEventChange}
          startScheduleAPI={this.startScheduleAPI}
          profileData={profileData}
          handleChange = {handleChange}
          handleChangeImage = {this.handleChangeImage}
        />
      </div>
    );
  }
}

export default withToastManager(translate(BroadcastIndex));
