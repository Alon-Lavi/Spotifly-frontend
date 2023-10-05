import { useState } from 'react'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { UserMsg } from './UserMsg.jsx'
import axios from 'axios'
import { Player } from './Player'
import ReactPlayer from 'react-player'

export function AppFooter({videoId}) {
	const config = {
		youtube: {
		  playerVars: {
			controls: 0, // Hide video controls
			modestbranding: 1, // Hide YouTube logo
			disablekb: 1, // Disable keyboard controls
			fs: 0, // Disable fullscreen button
			rel: 0, // Hide related videos at the end
			iv_load_policy: 3, // Hide video annotations
		  },
		},
	  };
	
	//   axios
	// 	.get(
	// 		'https://www.googleapis.com/youtube/v3/search?part=snippet%20&videoEmbeddable=true&type=video&key=AIzaSyBL-4tgjB8MxfYouEBcUPllZk2u8noV9kM&q=${madona}'
	// 	)
	// 	.then((res) => (console.log(res.data.items[3].id.videoId)))
		
	
	
	return (
		<div className='music-player'>
		  <ReactPlayer
			url={`https://www.youtube.com/watch?v=${'6p-lDYPR2P8'}`}
			config={config}
			playing={false} // Set to true to autoplay
			controls // Show audio player controls
			width="300px" // Adjust width as needed
			height="50px" // Adjust height as needed
			volume={0.8} // Adjust the volume (0-1)
		  />
		</div>
	  );
	};
	

