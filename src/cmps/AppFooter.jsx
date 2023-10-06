import { useState } from 'react'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { UserMsg } from './UserMsg.jsx'
import axios from 'axios'
import ReactPlayer from 'react-player'
import { Player } from './Player.jsx'

export function AppFooter() {
	// //   axios
	// // 	.get(
	// // 		'https://www.googleapis.com/youtube/v3/search?part=snippet%20&videoEmbeddable=true&type=video&key=AIzaSyBL-4tgjB8MxfYouEBcUPllZk2u8noV9kM&q=${madona}'
	// // 	)
	// // 	.then((res) => (console.log(res.data.items[3].id.videoId)))

	return (
		<div>
			<Player />
		</div>
	)
}
