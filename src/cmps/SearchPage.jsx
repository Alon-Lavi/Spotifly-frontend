
import { Link } from "react-router-dom"
import { StationPreview } from "./StationPreview"
import { stationService } from '../services/station.service.local.js'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadStations, addStation, updateStation, removeStation, setSongsToSearch } from '../store/actions/station.actions.js'
import { AiOutlineSearch } from 'react-icons/ai'
import { GenrePreview } from "./GenrePreview"
import { utilService } from "../services/util.service"
import { setSongPlaying } from "../store/actions/player.actions"

export function SearchPage() {

    const songs = useSelector((storeState) => storeState.stationModule.songsToSearch)
    const [genres, setGenres] = useState()


    useEffect(() => {
        loadGenres()
        return () => {
            setSongsToSearch(null)
        }
    }, [])
    async function loadGenres() {
        setGenres(await stationService.getGenres())
      
    }

    function playSong(song) {
        const songToPlay = {
            title: song.snippet.title,
            videoId: song.id.videoId,
            imgUrl: song.snippet.thumbnails.high.url
        }
        setSongPlaying(songToPlay)
    }

    return (
        <>


            <section className="search-page">

                {!songs && genres && <ul className="genres-list">
                    {genres.map((genre) => (

                        <Link to={`station/${genre.title}`}>  <GenrePreview genre={genre} /></Link>

                    ))}
                </ul>}
                {songs && <ul className="song-list">
                    {songs.map(song => <li onClick={() => playSong(song)}>
                        <img src={song.snippet.thumbnails.high.url} alt="" />
                        <span>{song.snippet.title}</span>
                    </li>)}
                </ul>}
            </section>
        </>
    )
}
