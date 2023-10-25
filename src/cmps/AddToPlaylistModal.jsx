import { useState, useEffect } from 'react'
import { addSongToStation } from '../store/actions/station.actions'
import { utilService } from '../services/util.service'

export function AddToPlaylistModal({ stations, onClose, svgPosition, song }) {
	const [selectedPlaylist, setSelectedPlaylist] = useState('')
	const [modalStyle, setModalStyle] = useState({})

	useEffect(() => {
		if (svgPosition) {
			const { x, y } = svgPosition
			setModalStyle({ top: `${y}px`, left: `${x}px` })
		}
	}, [svgPosition])

	function handleAddToPlaylist() {
		const songToSave = {
			id: utilService.makeId(),
			title: song.snippet.title,
			videoId: song.id.videoId,
			imgUrl: song.snippet.thumbnails.high.url,
		}

		if (selectedPlaylist && songToSave) {
			addSongToStation(songToSave, selectedPlaylist)
			onClose()
		}
	}

	return (
		<div className="modal" style={modalStyle}>
			<select className="select-txt" onChange={(event) => setSelectedPlaylist(event.target.value)} value={selectedPlaylist}>
				<option value="" disabled>
					Select a Playlist
				</option>

				{stations.map((station, idx) => (
					<option key={station._id} value={station._id}>
						{station.name}
					</option>
				))}
			</select>

			<button className="button-select-modal-add" onClick={handleAddToPlaylist}>
				Add to Playlist
			</button>

			<button className="button-select-modal-close" onClick={onClose}>
				Close
			</button>
		</div>
	)
}
