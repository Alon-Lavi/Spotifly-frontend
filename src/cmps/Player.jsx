// import React from 'react'
// import YouTube from 'react-youtube'

// export class Player extends React.Component {
// 	render() {
// 		const opts = {
// 			height: '390',
// 			width: '640',
// 			playerVars: {
// 				https: '//developers.google.com/youtube/player_parameters',
// 				autoplay: 1,
// 			},
// 		}

// 		return <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={this._onReady} />
// 	}

// 	_onReady(event) {
// 		// access to player in all event handlers via event.target
// 		event.target.pauseVideo()
// 	}
// }
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS

export const Player = () => (
	<div className="music-player">
		<AudioPlayer
			autoPlay
			src="https://www.youtube.com/watch?v=m8qFZ7hHgQ0&ab_channel=Levy%27sFit"
			onPlay={(e) => console.log('onPlay')}
			// other props here
		/>
	</div>
)
