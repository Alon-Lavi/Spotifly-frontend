import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { _ } from 'lodash'

import { StationPreview } from './StationPreview.jsx'
import { setBgc } from '../store/actions/station.actions.js'
import { stationService } from '../services/station.service.local.js'
import { useEffect, useState } from 'react'

export function StationList({ library, genre, stations, onPlayStation }) {
	const navigate = useNavigate()
	const user = useSelector((storeState) => storeState.userModule.user)
	const bgc = useSelector((storeState) => storeState.stationModule.bgc)


	const myStations = stations.filter((station) => station.createdBy._id === user?._id)
	const dailyStation = stations.filter((station) => _.includes(station.tags, 'daily'))
	const recentStation = stations.filter((station) => _.includes(station.tags, 'recent'))
	const mixStation = stations.filter((station) => _.includes(station.tags, 'mix'))

	useEffect(() => {

		return () => {
			setBgc(null)
		}
	}, []
	)


	async function getGenre(genre) {
		const genreToSet = await stationService.getByName(genre)

		setBgc(genreToSet.backgroundcolor)

	}
	if (genre) {
		getGenre(genre)



		return (
			<>
				{<div className='title-container' style={{ backgroundColor: bgc }} >

					<h1 className="genre-title">{genre}</h1>
				</div>
				}

				<ul className="station-list">
					{stations.map((station, idx) => (
						<li onClick={() => navigate(`/station/${station._id}`)} className="station-preview" key={idx}>
							<StationPreview onPlayStation={onPlayStation} station={station} />
						</li>
					))}
				</ul>
			</>
		)
	}
	if (library) {
		return (
			<>
				<h1 className="episodes-txt">Library</h1>
				<ul className="station-list">
					<li onClick={() => navigate(`/likedsongs`)} className="station-preview" key={user.likedSongs._id}>
						<StationPreview onPlayStation={onPlayStation} station={user.likedSongs} />
					</li>
					{stations.map((station, idx) => (
						<li onClick={() => navigate(`/station/${station._id}`)} className="station-preview" key={idx}>
							<StationPreview onPlayStation={onPlayStation} station={station} />
						</li>
					))}
				</ul>
			</>
		)
	}

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

			{user && <h1 className="episodes-txt">{`Made For ${user.fullname}`}</h1>}

			{user && (
				<ul className="station-list">
					{dailyStation.map((station, idx) => (
						<li onClick={() => navigate(`/station/${station._id}`)} className="station-preview" key={idx}>
							<StationPreview onPlayStation={onPlayStation} station={station} />
						</li>
					))}
				</ul>
			)}

			{user && <h1 className="episodes-txt">{`Recently played`}</h1>}

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
