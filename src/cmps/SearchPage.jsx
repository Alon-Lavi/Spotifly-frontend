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
        console.log(allGenres)
        setGenres(allGenres);
        loadPlaylists(allGenres);
    }

    async function loadPlaylists(genres) {

        const allPlaylists = await stationService.getGenres();
        console.log('All playlists:', allPlaylists);
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