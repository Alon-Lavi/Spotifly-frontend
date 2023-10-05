
import { Link } from "react-router-dom"
import { StationPreview } from "./StationPreview"
import { stationService } from '../services/station.service.js'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadStations, addStation, updateStation, removeStation } from '../store/actions/station.actions.js'
import { AiOutlineSearch } from 'react-icons/ai'

export function SearchPage() {

    const stations = useSelector((storeState) => storeState.stationModule.stations)
	useEffect(() => {
		loadStations()
	}, [])

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
                  placeholder="   &#128269; What do you want to listen to?"
/>
                </div>
               
               </form>
            </div>
            {/* <ul className="station-list">
        {stations.map((station) => (
            <li className="station-preview" key={station._id}>
             <Link to={`station/${station._id}`}>  <StationPreview station={station} /></Link> 

            </li>
        ))}
    </ul> */}
        </section>
    )
}
