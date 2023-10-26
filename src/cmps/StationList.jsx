import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { _ } from 'lodash'

import { StationPreview } from './StationPreview.jsx'

export function StationList({ genre, stations, onPlayStation }) {
	const navigate = useNavigate()
	const user = useSelector((storeState) => storeState.userModule.user)

	const myStations = stations.filter((station) => station.createdBy._id === user?._id)
	const dailyStation = stations.filter((station) => _.includes(station.tags, 'daily'))
	const recentStation = stations.filter((station) => _.includes(station.tags, 'recent'))
	const mixStation = stations.filter((station) => _.includes(station.tags, 'mix'))
console.log(genre);

	if (genre) return (
		<>
			{<h1 className="episodes-txt">{genre}</h1>}

			<ul className="station-list">
				{stations.map((station, idx) => (
					<li onClick={() => navigate(`/station/${station._id}`)} className="station-preview" key={idx}>
						<StationPreview onPlayStation={onPlayStation} station={station} />
					</li>
				))}
			</ul>
		</>
	)
	return (
		<section>
			{<h1 className="episodes-txt">Your playlists</h1>}

			<ul className="station-list">
				{user && (
					<li onClick={() => navigate(`/likedsongs`)} className="station-preview" key={user.likedSongs._id}>
						<StationPreview onPlayStation={onPlayStation} station={user.likedSongs} />
					</li>
				)}

				{myStations.map((station, idx) => (
					<li onClick={() => navigate(`/station/${station._id}`)} className="station-preview" key={idx}>
						<StationPreview onPlayStation={onPlayStation} station={station} />
					</li>
				))}
			</ul>

			{user && <h1 className="episodes-txt">{`made for ${user.fullname}`}</h1>}

			{user && (
				<ul className="station-list">
					{dailyStation.map((station, idx) => (
						<li onClick={() => navigate(`/station/${station._id}`)} className="station-preview" key={idx}>
							<StationPreview onPlayStation={onPlayStation} station={station} />
						</li>
					))}
				</ul>
			)}

			{user && <h1 className="episodes-txt">{`Recently Played`}</h1>}

			<ul className="station-list">
				{recentStation.map((station, idx) => (
					<li onClick={() => navigate(`/station/${station._id}`)} className="station-preview" key={idx}>
						<StationPreview onPlayStation={onPlayStation} station={station} />
					</li>
				))}
			</ul>

			{user && <h1 className="episodes-txt">{`Your top mixes`}</h1>}

			<ul className="station-list">
				{mixStation.map((station, idx) => (
					<li onClick={() => navigate(`/station/${station._id}`)} className="station-preview" key={idx}>
						<StationPreview onPlayStation={onPlayStation} station={station} />
					</li>
				))}
			</ul>
		</section>
	)
}
