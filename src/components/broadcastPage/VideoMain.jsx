import React, {Component} from "react";

export default class VideoMain extends Component {
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    // componentDidUpdate(props) {
    //     if (props && !!this.videoRef) {
    //         //   this.props.streamManager.addVideoElement(this.videoRef.current);
    //         console.log("componentDidUpdate");
    //         this.videoRef.current.srcObject = props.streamManager.stream;

    //         if (props.streamManager.unmuteType === "audio") {
    //             this.videoRef.current.muted = false;
    //             console.log("asdfadsf");
    //         } else {
    //             this.videoRef.current.muted = true;
    //             console.log("asdfadsfsadfasdfasdfsadffs");
    //         }
    //         if (props.streamManager.type == "local") {
    //             this.videoRef.current.volume = 0;
    //             this.videoRef.current.muted = true;
    //             console.log("componentDidUpdate volume = 0", this.videoRef);
    //         }
    //     }
    // }

    componentDidMount() {
        console.log("Props,", this.props);
        console.log("Props,", this.videoRef);

        if (this.props && !!this.videoRef) {
            console.log("componentDidMount");
            this.videoRef.current.srcObject = this.props.streamManager.stream;
            this.videoRef.current.muted = true;
            if (this.props.streamManager.type == "local") {
                this.videoRef.current.volume = 0;
            }
        }
    }

    render() {
        return (
            <video
                autoPlay={true}
                ref={this.videoRef}
                // className="broadcast-video"
                className="video-fluid"
            />
        );
    }
}
