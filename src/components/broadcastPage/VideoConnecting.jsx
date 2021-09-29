import React, { Component } from "react";
import VideoMain from "./VideoMain";

export default class VideoConnecting extends Component {
  getNicknameTag() {
    // Gets the nickName of the user
    return JSON.parse(this.props.streamManager.stream.connection.data)
      .clientData;
  }

  render() {
    return (
      <div>
        {this.props.streamManager !== undefined ? (
          <div>
            <div className="col-md-12 bg-flora-white">
              <div className="embed-responsive embed-responsive-16by9">
                <VideoMain
                  streamManager={this.props.streamManager}
                  key={this.props.streamManager.stream.id}
                  takePhoto={this.props.takePhoto}
                />
              </div>

              <div className="Spacer-10"></div>

              <div className="row broadcast-video">
                <div className="col-md-6">
                  <button className="btn1 margin-left-zero" type="button">
                    <span className="text-uppercase">
                      {this.props.liveVideoData.type}
                    </span>
                  </button>
                  {this.props.liveVideoData.amount > 0 ? (
                    <button className="btn1" type="button">
                      <span>{this.props.liveVideoData.amount_formatted}</span>
                    </button>
                  ) : (
                    ""
                  )}

                  <button className="btn1" type="button">
                    <i className="fas fa-eye icon"></i>
                    <span>{this.props.viewerCount}</span>
                  </button>
                </div>

                <div className="col-md-6">
                  {this.props.streamManager.type == "local" ? (
                    <>
                      {this.props.customizeData.videoMute ? (
                        <button
                          className="btn1 margin-left-zero"
                          onClick={this.props.muteVideo}
                        >
                          <i className="fas fa-video icon"></i>
                          {/* Mute Video */}
                        </button>
                      ) : null}
                      {this.props.customizeData.videoUnmute ? (
                        <button
                          className="btn1"
                          onClick={this.props.unmuteVideo}
                        >
                          <i className="fas fa-video-slash icon"></i>

                          {/* unMute Video */}
                        </button>
                      ) : null}
                      {this.props.customizeData.audioMute ? (
                        <button
                          type="submit"
                          className="btn1"
                          onClick={this.props.muteAudio}
                        >
                          <i className="fas fa-microphone icon"></i>
                          {/* Mute Audio */}
                        </button>
                      ) : null}

                      {this.props.customizeData.audioUnmute ? (
                        <button
                          className="btn1"
                          type="submit"
                          onClick={this.props.unmuteAudio}
                        >
                          <i className="fas fa-microphone-slash icon"></i>

                          {/* Un Mute Audio */}
                        </button>
                      ) : null}

                      <button
                        type="submit"
                        className="btn1"
                        onClick={() =>
                          this.props.stopStreaming(this.props.streamManager)
                        }
                      >
                        <i className="fas fa-stop-circle icon"></i>
                        {/* Stop streaming */}
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
              <div className="content-stm-video">
                {/* <div className="video-right-btn">
                                    <button
                                        className="btn btn-default btn-block btn-br"
                                        type="button"
                                    >
                                        Lorem Ipsum Lorem
                                    </button>
                                    <button
                                        className="btn btn-default btn-block btn-br"
                                        type="button"
                                    >
                                        Music
                                    </button>
                                    <button
                                        className="btn btn-default btn-block btn-br"
                                        type="button"
                                    >
                                        Music
                                    </button>
                                </div>
                                 */}
                <div className="video-content">
                  <h1 className="h4-s text-bold top">
                    {this.props.liveVideoData.title}
                  </h1>
                  {/* <div className="row video-watch-time">
                                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 watched-user">
                                            Watching - 5431
                                        </div>
                                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 strated-time">
                                            Started - 4:35 PM
                                        </div>
                                    </div> */}
                  <div className="user-details">
                    <span className="user-img-sm">
                      <img
                        className="img-circle img-responsive user-details-img"
                        src={this.props.liveVideoData.user_picture}
                      ></img>
                    </span>
                    <span className="user-name-info">
                      {this.props.liveVideoData.user_name}
                    </span>
                  </div>

                  <p className="top">{this.props.liveVideoData.description}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
