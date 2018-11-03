import React from 'react';
import VideoPlayer from 'react-videoplayer'
//import 'react-videoplayer/lib/index.css'


class Player extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            videoSrc : 'https://www.w3schools.com/html/mov_bbb.mp4'
        };

    }


    render() {
        return (
            <div>
                <VideoPlayer
                    videoSrc={this.state.videoSrc}
                    autoPlay={true}
                />
            </div>
        );
    }
}

export default Player;
