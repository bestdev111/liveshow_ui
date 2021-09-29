import React, { Component } from "react";
import RTCMultiConnection from "rtcmulticonnection";
import DetectRTC from "../../../node_modules/detectrtc/DetectRTC";
import RecordRTC from "../../../node_modules/recordrtc/RecordRTC";
import BroadcastChat from "./BroadcastChat";
import Sidebar from "../layouts/sidebar/Sidebar";
import BroadcastPublicVideoSec from "./BroadcastPublicVideoSec";
import BroadcastStartModel from "./BroadcastStartModel";
import VideoWebrtc from "./SampleVideo";
import VideoConnecting from "./VideoConnecting";
import BroadcastHelper from "./BroadcastHelper";
import { translate, t } from "react-multi-lang";

let connection = new RTCMultiConnection();

// by default, socket.io server is assumed to be deployed on your own URL
// connection.socketURL = "https://rtcmulticonnection.herokuapp.com:443/";

connection.socketURL = "https://streamnow.appswamy.com:9001/";

class BroadcastIndex extends BroadcastHelper {
  state = {
    subscribers: [],
    customizeData: {
      audioMute: true,
      audioUnmute: false,
      videoMute: true,
      videoUnmute: false,
      recordStatus: false,
    },
    snapshot: null,
  };

  componentDidMount() {
    this.manyToManyConfiguration(connection);
    // this.oneToManyConfiguration(connection);
  }

  nextConnection = () => {
    connection.onstream = (event) => {
      console.log("Evnet1", event);
      var existing = document.getElementById(event.streamid);
      if (existing && existing.parentNode) {
        console.log("existing con");
        existing.parentNode.removeChild(existing);
      }
      console.log("Evnet", event);
      console.log("Evnet", event.stream);

      var subscriber = event;
      var subscribers = this.state.subscribers;
      subscribers.push(subscriber);

      this.setState({
        subscribers: subscribers,
      });

      // to keep room-id in cache
      localStorage.setItem(connection.socketMessageEvent, connection.sessionid);

      if (this.state.recordStatus) {
        var recorder = connection.recorder;
        if (!recorder) {
          recorder = RecordRTC([event.stream], {
            type: "video",
          });
          recorder.startRecording();
          connection.recorder = recorder;
        } else {
          recorder.getInternalRecorder().addStreams([event.stream]);
        }

        if (!connection.recorder.streams) {
          connection.recorder.streams = [];
        }

        connection.recorder.streams.push(event.stream);
      }

      if (event.type === "local") {
        connection.socket.on("disconnect", function () {
          if (!connection.getAllParticipants().length) {
            alert(
              {t("boradcast_is_ended")}
            );
            window.location.reload();
          }
        });
      }
    };

    connection.onstreamended = (event) => {
      console.log("Connection ended check 1");
      let array = [...this.state.subscribers]; // make a separate copy of the array
      let index = array.indexOf(event);
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({ subscribers: array });
      }

      if (event.userid === connection.sessionid && !connection.isInitiator) {
        alert(
          {t("boradcast_is_ended")}
        );
        window.location.reload();
      }

      this.addStreamStopListener(event.stream, () => {
        alert({t("screenshare_is_ended")});
      });
      window.location.reload();
    };

    connection.onMediaError = (e) => {
      console.log("Connection ended check 2");
      if (e.message === "Concurrent mic process limit.") {
        if (DetectRTC.audioInputDevices.length <= 1) {
          alert(
            {t("select_external_microphone")}
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
      alert({t("data_connection_closed")});
      window.location.reload();
    };

    connection.onleave = function (event) {
      var remoteUserId = event.userid;
      var remoteUserFullName = event.extra.fullName;

      alert(remoteUserFullName + " left you.");
      window.location.reload();
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

  startConferencing = () => {
    connection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: true,
      OfferToReceiveVideo: true,
    };

    setTimeout(() => {
      var roomid = "123";
      connection.openOrJoin(roomid.value || "preferred-roomid");

      this.nextConnection();
    }, 3000);
  };

  startStreaming = () => {
    connection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: false,
      OfferToReceiveVideo: false,
    };
    setTimeout(() => {
      var roomid = "123sdf";
      connection.open(roomid);
      this.nextConnection();
    }, 3000);
  };

  watchStreaming = () => {
    var roomid = "123sdf";
    connection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: true,
      OfferToReceiveVideo: true,
    };
    connection.join(roomid);
    this.nextConnection();
  };

  screenSharing = () => {
    connection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: false,
      OfferToReceiveVideo: false,
    };
    var roomid = "123sdf";
    connection.open(roomid);
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
  };

  changeRecordStatus = ({ currentTarget: input }) => {
    if (input.checked == true) {
      this.setState({ recordStatus: true });
    } else {
      this.setState({ recordStatus: false });
    }
  };

  stopRecordingVideo = () => {
    let recorder = connection.recorder;
    if (!recorder) return alert({t("no_data_found")});
    recorder.stopRecording(() => {
      let blob = recorder.getBlob();
      RecordRTC.invokeSaveAsDialog(blob);

      connection.recorder = null;
    });
  };

  takePhoto = (video) => {
    let canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || video.clientWidth;
    canvas.height = video.videoHeight || video.clientHeight;

    let context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    console.log("image", canvas.toDataURL("image/png"));
    this.setState({ snapshot: canvas.toDataURL("image/png") });
    // return canvas.toDataURL("image/png");
  };

  render() {
    return (
      <div class="main">
        <Sidebar />

        <div className="sec-padding left-spacing1">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 top-margin">
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
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="relative">
                  <img
                    src="/assets/img/stream.jpg"
                    className="img-responsive broadcast-img"
                  />
                  <div className="broadcast-btn">
                    <div className="checkbox">
                      <label>
                        <input
                          type="checkbox"
                          onChange={this.changeRecordStatus}
                          name="record"
                        />{" "}
                        <span className="checkbox-text">{t("record")}</span>
                      </label>
                    </div>

                    <button
                      className="btn"
                      type="button"
                      onClick={this.startConferencing}
                    >
                      {t("start_conferencing")}
                    </button>
                    <button
                      className="btn"
                      type="button"
                      onClick={this.startStreaming}
                    >
                      {t("start_broadcasting")}
                    </button>
                    <button
                      className="btn"
                      type="button"
                      onClick={this.watchStreaming}
                    >
                      {t("watch_broadcasting")}
                    </button>
                    <button
                      className="btn"
                      type="button"
                      onClick={this.screenSharing}
                    >
                      {t("screen_share")}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <img
              src={
                this.state.snapshot != null
                  ? this.state.snapshot
                  : "/assets/img/stream.jpg"
              }
              className="img-responsive broadcast-img"
            />

            <BroadcastChat />
          </div>
        </div>
        <BroadcastPublicVideoSec />
        <BroadcastStartModel />
      </div>
    );
  }
}

export default translate(BroadcastIndex);