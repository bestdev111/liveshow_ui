import React, { Component } from "react";

class BroadcastHelper extends Component {
  manyToManyConfiguration(connection) {
    // comment-out below line if you do not have your own socket.io server
    // connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

    connection.socketMessageEvent = "video-conference-demo";

    connection.session = {
      screen: true,
      oneway: true,
    };

    connection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: true,
      OfferToReceiveVideo: true,
    };

    // STAR_FIX_VIDEO_AUTO_PAUSE_ISSUES
    // via: https://github.com/muaz-khan/RTCMultiConnection/issues/778#issuecomment-524853468
    var bitrates = 512;
    var resolutions = "Ultra-HD";
    var videoConstraints = {};

    if (resolutions == "HD") {
      videoConstraints = {
        width: {
          ideal: 1280,
        },
        height: {
          ideal: 720,
        },
        frameRate: 30,
      };
    }

    if (resolutions == "Ultra-HD") {
      videoConstraints = {
        width: {
          ideal: 1920,
        },
        height: {
          ideal: 1080,
        },
        frameRate: 30,
      };
    }

    connection.mediaConstraints = {
      video: videoConstraints,
      audio: true,
    };
    var CodecsHandler = connection.CodecsHandler;

    connection.processSdp = function (sdp) {
      var codecs = "vp8";

      if (codecs.length) {
        sdp = CodecsHandler.preferCodec(sdp, codecs.toLowerCase());
      }

      if (resolutions == "HD") {
        sdp = CodecsHandler.setApplicationSpecificBandwidth(sdp, {
          audio: 128,
          video: bitrates,
          screen: bitrates,
        });

        sdp = CodecsHandler.setVideoBitrates(sdp, {
          min: bitrates * 8 * 1024,
          max: bitrates * 8 * 1024,
        });
      }

      if (resolutions == "Ultra-HD") {
        sdp = CodecsHandler.setApplicationSpecificBandwidth(sdp, {
          audio: 128,
          video: bitrates,
          screen: bitrates,
        });

        sdp = CodecsHandler.setVideoBitrates(sdp, {
          min: bitrates * 8 * 1024,
          max: bitrates * 8 * 1024,
        });
      }

      return sdp;
    };

    // END_FIX_VIDEO_AUTO_PAUSE_ISSUES

    // https://www.rtcmulticonnection.org/docs/iceServers/
    // use your own TURN-server here!
    connection.iceServers = [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
          "stun:stun.l.google.com:19302?transport=udp",
        ],
      },
    ];
  }

  oneToManyConfiguration(connection) {
    connection.socketMessageEvent = "video-broadcast-demo";

    //  oneway: true -- Video Broadcast
    connection.session = {
      audio: true,
      video: true,
      oneway: true,
    };

    // screen: true - screen share

    // connection.session = {
    //   screen: true,
    //   oneway: true,
    // };

    connection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: false,
      OfferToReceiveVideo: false,
    };

    var bitrates = 512;
    var resolutions = "Ultra-HD";
    var videoConstraints = {};

    if (resolutions == "HD") {
      videoConstraints = {
        width: {
          ideal: 1280,
        },
        height: {
          ideal: 720,
        },
        frameRate: 30,
      };
    }

    if (resolutions == "Ultra-HD") {
      videoConstraints = {
        width: {
          ideal: 1920,
        },
        height: {
          ideal: 1080,
        },
        frameRate: 30,
      };
    }

    connection.mediaConstraints = {
      video: videoConstraints,
      audio: true,
    };

    var CodecsHandler = connection.CodecsHandler;

    connection.processSdp = function (sdp) {
      var codecs = "vp8";

      if (codecs.length) {
        sdp = CodecsHandler.preferCodec(sdp, codecs.toLowerCase());
      }

      if (resolutions == "HD") {
        sdp = CodecsHandler.setApplicationSpecificBandwidth(sdp, {
          audio: 128,
          video: bitrates,
          screen: bitrates,
        });

        sdp = CodecsHandler.setVideoBitrates(sdp, {
          min: bitrates * 8 * 1024,
          max: bitrates * 8 * 1024,
        });
      }

      if (resolutions == "Ultra-HD") {
        sdp = CodecsHandler.setApplicationSpecificBandwidth(sdp, {
          audio: 128,
          video: bitrates,
          screen: bitrates,
        });

        sdp = CodecsHandler.setVideoBitrates(sdp, {
          min: bitrates * 8 * 1024,
          max: bitrates * 8 * 1024,
        });
      }

      return sdp;
    };

    connection.iceServers = [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
          "stun:stun.l.google.com:19302?transport=udp",
        ],
      },
    ];
  }
}

export default BroadcastHelper;
