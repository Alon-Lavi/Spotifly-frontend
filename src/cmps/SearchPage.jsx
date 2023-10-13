import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { loadStations, setSongsToSearch } from '../store/actions/station.actions';
import { stationService } from '../services/station.service.local.js';
import { GenrePreview } from './GenrePreview';
import { setSongPlaying } from '../store/actions/player.actions';
import { AddToPlaylistModal } from './AddToPlaylistModal';

export function SearchPage() {
    const songs = useSelector((storeState) => storeState.stationModule.songsToSearch);
    const [genres, setGenres] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [svgPosition, setSvgPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        loadGenres();
        return () => {
            setSongsToSearch(null);
        };
    }, []);

    async function loadGenres() {
        const allGenres = await stationService.getGenres();
        // console.log(allGenres)
        setGenres(allGenres);
        loadPlaylists(allGenres);
    }

    async function loadPlaylists(genres) {

        const allPlaylists = await stationService.getGenres();
        // console.log('All playlists:', allPlaylists);
        setPlaylists(allPlaylists);
    }



    function getPlaylistNames() {

        return stationsDemo.map((station) => ({
            _id: station._id,
            name: station.name,
        }));
    }

    function playSong(song) {
        const songToPlay = {
            title: song.snippet.title,
            videoId: song.id.videoId,
            imgUrl: song.snippet.thumbnails.high.url,
        };
        setSongPlaying(songToPlay);
    }

    function openAddToPlaylistModal(event, song) {
        const svgPosition = {
            x: event.clientX,
            y: event.clientY,
        };
        setSelectedSong(song);
        setSvgPosition(svgPosition);
        setIsModalOpen(true);
    }

    function closeAddToPlaylistModal() {
        setIsModalOpen(false);
        setSelectedSong(null);
    }

    function addToPlaylist(playlistId) {

        closeAddToPlaylistModal();
    }
    return (
        <>
            <section className="search-page">
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

                        {songs.map((song, idx) => (
                            <li key={idx}>
                                <img src={song.snippet.thumbnails.high.url} alt="" />
                                <span className='text-song-name'>{song.snippet.title}</span>
                                <div className="options">
                                    <button className='button-play black-button-play' onClick={() => playSong(song)}>
                                        &#9658;
                                    </button>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        width="23"
                                        height="23"
                                        fill="currentColor"
                                        class="bi bi-heart"
                                        viewBox="0 0 23 19"
                                        id="IconChangeColor"
                                    >
                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                                            id="mainIconPathAttribute"
                                            fill="#ffffff">
                                        </path> </svg>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="15"
                                        height="15"
                                        viewBox="0 0 23 19"
                                        fill="none"
                                        stroke="#ffffff"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        onClick={(event) => openAddToPlaylistModal(event, song)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <circle cx="12" cy="12" r="1"></circle>
                                        <circle cx="19" cy="12" r="1"></circle>
                                        <circle cx="5" cy="12" r="1"></circle>
                                    </svg>

                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
            {isModalOpen && (
                <AddToPlaylistModal
                    playlists={playlists}
                    svgPosition={svgPosition}
                    onClose={closeAddToPlaylistModal}
                    onAddToPlaylist={addToPlaylist}
                />
            )}
        </>
    );
}