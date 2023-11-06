import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC } from '../services/socket.service'
import { stationService } from '../services/station.service'
import { updateStation } from '../store/actions/station.actions'

export function ChatApp({ station }) {
	const [msg, setMsg] = useState({ txt: '' })
	const [msgs, setMsgs] = useState([])
	const [topic, setTopic] = useState(station)
	const [isBotMode, setIsBotMode] = useState(false)

	const loggedInUser = useSelector((storeState) => storeState.userModule.user)

	const botTimeoutRef = useRef()

	useEffect(() => {
		socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
		return () => {
			socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
			botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
		}
	}, [])

	useEffect(() => {

		socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)
		
	}, [])


	

	function addMsg(newMsg) {

		setMsgs((prevMsgs) => [...prevMsgs, newMsg])
		console.log('====================================');
		console.log(newMsg);
		console.log('====================================');

		// const stationToSave = { ...station, msgs: [...station.msgs, newMsg] }
		station.msgs.push(newMsg)
		console.log(station);
		updateStation(station)
	}

	function sendBotResponse() {
		// Handle case: send single bot response (debounce).
		botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
		botTimeoutRef.current = setTimeout(() => {
			setMsgs((prevMsgs) => [...prevMsgs, { from: 'Bot', txt: 'You are amazing!' }])
		}, 1250)
	}

	function sendMsg(ev) {
		ev.preventDefault()
		const from = loggedInUser?.fullname || 'Me'
		const newMsg = { from, txt: msg.txt }
		socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
		if (isBotMode) sendBotResponse()
		// for now - we add the msg ourself
		// addMsg(newMsg)
		setMsg({ txt: '' })
	}

	function handleFormChange(ev) {
		const { name, value } = ev.target
		setMsg((prevMsg) => ({ ...prevMsg, [name]: value }))
	}
	if (!station) return
	return (
		<section className="chat">
			<h2>Lets Chat about this playlist</h2>


			<form onSubmit={sendMsg}>
				<input type="text" value={msg.txt} onChange={handleFormChange} name="txt" autoComplete="off" />
				<button>Send</button>
			</form>

			<ul>
				{station.msgs && station.msgs.map((msg, idx) => (
					<li key={idx}>
						{msg.from}: {msg.txt}
					</li>
				))}
			</ul>
		</section>
	)
}
