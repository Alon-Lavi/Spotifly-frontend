import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { setBgc, setSongsToSearch } from '../store/actions/station.actions'
import { updateUser } from '../store/actions/user.actions'
import { setSongPlaying } from '../store/actions/player.actions'
import { stationService } from '../services/station.service.local'
import { GenrePreview } from './GenrePreview'
import { AddToPlaylistModal } from './AddToPlaylistModal'
import { trackService } from '../services/track.service.js'


import { StationPreview } from './StationPreview'

export function SearchPage() {
    const songs = useSelector((storeState) => storeState.stationModule.songsToSearch)
    const stations = useSelector((storeState) => storeState.stationModule.stations)
    const [genres, setGenres] = useState([])
    const [filteredStations, setFilteredStations] = useState([]);
    const [searchText, setSearchText] = useState('')
    const [song, setSong] = useState(null)
    const [likedSongs, setLikedSongs] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [svgPosition, setSvgPosition] = useState({ x: 0, y: 0 })
    const user = useSelector((storeState) => storeState.userModule.user)


    useEffect(() => {
        loadGenres()
        setBgc(null)
        return () => {
            setSongsToSearch(null)
        }
    }, [])

    async function loadGenres() {
        const allGenres = await stationService.getGenres()
        setGenres(allGenres)

    }


    function playSong(song) {
        const songToPlay = {
            title: song.snippet.title,
            videoId: song.id.videoId,
            imgUrl: song.snippet.thumbnails.high.url,
            addedAt: Date.now(),
        }
        setSongPlaying(songToPlay)
    }

    function openAddToPlaylistModal(event, song, stationId) {
        event.stopPropagation()
        const svgPosition = {
            x: event.clientX - 130,
            y: event.clientY,
        }
        setSong(song)

        setSvgPosition(svgPosition)
        setIsModalOpen(true)
    }

    function onPlayStation(station, ev) {
        ev.stopPropagation()
        if (station._id === currStation?._id) {
            const isCurrentlyPlaying = !isPlaying
            isCurrentlyPlaying ? player.playVideo() : player.pauseVideo()
            setIsPlaying(isCurrentlyPlaying)
        } else {
            setCurrStation(station)
            setSongPlaying(station.songs[0])
        }
    }

    function closeAddToPlaylistModal() {
        setIsModalOpen(false)
        setSelectedSong(null)
    }

    function checkLikedSongs(ev, newSong) {
        ev.stopPropagation()
        const songToSave = {
            title: newSong.snippet.title.replace(/\([^)]*\)|\[[^\]]*\]/g, ''),
            videoId: newSong.id.videoId,
            imgUrl: newSong.snippet.thumbnails.high.url,
            addedAt: Date.now(),
        }
        const idx = user.likedSongs.songs.findIndex((likedSong) => likedSong.videoId === songToSave.videoId)

        if (idx === -1) addToLikedSongs(songToSave)
        else removeFromLikedSongs(songToSave)
    }

    async function addToLikedSongs(newSong) {
        const updatedUser = await userService.addSong(user._id, newSong)
        updateUser(updatedUser)
    }

    async function removeFromLikedSongs(newSong) {
        const updatedUser = await userService.removeSong(user._id, newSong.videoId)
        updateUser(updatedUser)
    }

    function checkIfLiked(song) {
        const idx = user.likedSongs.songs.findIndex((likedSong) => likedSong.videoId === song.id.videoId)
        if (idx === -1) return false

        return true
    }

    return (
        <>
            <section className="search-page">
                <h1 className="search-text">Browse all</h1>
                {!songs && genres && (
                    <ul className="genres-list">
                        {genres.map((genre, idx) => (
                            <Link to={`station/${genre.title}`} key={idx}>
                                <GenrePreview genre={genre} />
                            </Link>
                        ))}
                    </ul>
                )}

                {songs && (
                    <ul className="song-list">
                        <div className='artist-page'>
                           
                            <img src={songs[0].snippet.thumbnails.high.url} alt="" />
                            <span className='text-artist-name'>{trackService.getArtistName(songs[0].snippet.title)}</span>
                        </div>

                        <div className='song-list-list'>
                        {songs.map((song, idx) => (
                            <li  key={idx} onClick={() => playSong(song)}>
                                <img src={song.snippet.thumbnails.high.url} alt="" />

                                <span className="text-song-name">{trackService.getCleanTitle(song.snippet.title)}</span>

                                <div className="options">


                                    <span style={{ opacity: checkIfLiked(song) ? 1 : 0 }} className="like-btn">
                                        <svg
                                            onClick={(event) => {
                                                checkLikedSongs(event, song)
                                            }}
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill={checkIfLiked(song) ? '' : 'white'}
                                            height="37"
                                            width="37"
                                            aria-hidden="true"
                                            data-encore-id="icon"
                                            className={`liked-song-icon ${likedSongs[song.id.videoId] ? 'liked' : ''}`}
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                fill={checkIfLiked(song) ? '#1ed760' : 'none'}
                                                d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z"
                                            ></path>

                                            <path
                                                fill={checkIfLiked(song) ? '#1ed760' : 'white'}
                                                d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                                            ></path>
                                        </svg>
                                    </span>

                                    <svg
                                        className='svg-option'
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="15"
                                        height="15"
                                        viewBox="0 0 23 19"
                                        fill="none"
                                        stroke="#ffffff"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        onClick={(event) => {
                                            openAddToPlaylistModal(event, song)
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <circle cx="12" cy="12" r="1"></circle>
                                        <circle cx="19" cy="12" r="1"></circle>
                                        <circle cx="5" cy="12" r="1"></circle>
                                    </svg>
                                </div>
                            </li>



))}
</div>

                    </ul>

                )}
                <h1 className="search-text">Playlists</h1>
               <ul className="station-list">
                
				
                        {stations
                        .filter((station) => station.name.toLowerCase().includes(searchText.toLowerCase()))
                        .map((station, idx) => (
                            <li onClick={() => navigate(`/station/${station._id}`)} className="station-preview" key={idx}>
                                
                                <StationPreview onPlayStation={onPlayStation} station={station} />
                            </li>
                        ))}
                    </ul>


            </section>


            {isModalOpen && <AddToPlaylistModal stations={stations} svgPosition={svgPosition} onClose={closeAddToPlaylistModal} song={song} />}
        </>
    )
}
