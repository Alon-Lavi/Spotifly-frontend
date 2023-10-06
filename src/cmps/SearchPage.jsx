
import { Link } from "react-router-dom"
import { StationPreview } from "./StationPreview"
import { stationService } from '../services/station.service.local.js'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadStations, addStation, updateStation, removeStation } from '../store/actions/station.actions.js'
import { AiOutlineSearch } from 'react-icons/ai'
import { GenrePreview } from "./GenrePreview"

export function SearchPage() {

    const [genres, setGenres] = useState()
    useEffect(() => {
        loadGenres()
    }, [])
    async function loadGenres() {
        setGenres(await stationService.getGenres())
    }
    return (
        <section className="search-page">
            <div className="search-bar">
                <form>
                    <h4 className="search-header">Browse all</h4>
                    <div className="search-input-container">
                        <span>

                        </span>
                        <input
                            name="txt"
                            type="text"
                            placeholder="      &#128269; What do you want to listen to?"
                        />
                    </div>

                </form>
            </div>
            {genres && <ul className="genres-list">
                {genres.map((genre) => (
            
                        <Link to={`station/${genre.title}`}>  <GenrePreview genre={genre} /></Link>

                   
                ))}
            </ul>}
        </section>
    )
}
