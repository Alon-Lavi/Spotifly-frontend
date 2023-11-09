import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC } from '../services/socket.service'
import { updateStation } from '../store/actions/station.actions'
import { utilService } from '../services/util.service'

export function ChatApp({ toggleChatVisibility, station }) {
	const botTimeoutRef = useRef()

	const [msg, setMsg] = useState({ txt: '' })
	const [msgs, setMsgs] = useState([])

	const loggedInUser = useSelector((storeState) => storeState.userModule.user)
	const bgc = useSelector((storeState) => storeState.stationModule.bgc)

	useEffect(() => {
		setMsgs([])

		socketService.emit(SOCKET_EMIT_SET_TOPIC, station._id)
		socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
		return () => {
			socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
			botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
		}
	}, [station])



	async function addMsg(newMsg) {
		console.log('add msg was activated', newMsg)
		setMsgs((prevMsgs) => [...prevMsgs, newMsg])
	}

	async function sendMsg(ev) {
		ev.preventDefault()
		try {
			const imgUrl = loggedInUser.imgUrl
			const from = loggedInUser?.fullname || 'Me'
			const newMsg = { imgUrl, from, txt: msg.txt }
			const stationToSave = { ...station, msgs: [newMsg, ...station.msgs] }
			console.log('====================================')
			console.log(stationToSave)
			console.log('====================================')
			await updateStation(stationToSave)
			socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
			// if (isBotMode) sendBotResponse()
			// for now - we add the msg ourself
			// addMsg(newMsg)
			setMsg({ txt: '' })
		} catch (err) {
			console.log('err with sending the message:', err)
		}
	}

	function handleFormChange(ev) {
		const { name, value } = ev.target
		setMsg((prevMsg) => ({ ...prevMsg, [name]: value }))
	}
	if (!station) return
	return (
		<div className="chat">
			<div className="chat-title">
				<h1>{station.name}</h1>
				<span onClick={toggleChatVisibility}> &times;</span>
			</div>
			<div className="messages" style={{ backgroundColor: bgc }}>
				<div className="bg"></div>
				<div className="messges-content">
					{msgs.length > 0 &&
						msgs.map((msg, idx) => (
							<div key={idx} className={`message ${loggedInUser.fullname === msg.from ? 'sent' : 'recevied'}`}>
								{msg.from}: {msg.txt}
								<span className="time-stamp">{utilService.getTimeStamp()}</span>
								<img className="avatar" src={msg.imgUrl} alt="" />
							</div>
						))}
				</div>
			</div>

			<form className="message-box" onSubmit={sendMsg}>
				<input
					className="message-input"
					placeholder="Type message..."
					type="text"
					value={msg.txt}
					onChange={handleFormChange}
					name="txt"
					autoComplete="off"
				/>
				<button className="message-submit">Send</button>
			</form>
		</div>
	)
}
