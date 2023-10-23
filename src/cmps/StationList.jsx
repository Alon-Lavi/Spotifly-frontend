import { Link, useNavigate } from "react-router-dom"
import { StationPreview } from "./StationPreview.jsx"
import { useSelector } from "react-redux"


export function StationList({stations,onPlayStation}){
    const navigate = useNavigate()
	const user =useSelector((storeState) => storeState.userModule.user)

    return(
        <ul className="station-list">
        {user&&   <li onClick={()=> navigate(`/likedsongs`)} className="station-preview" key={user.likedSongs._id}>
           <StationPreview onPlayStation={onPlayStation} station={user.likedSongs} />           
            
            </li> }
        {stations.map((station) => (
            <li onClick={()=> navigate(`/station/${station._id}`)} className="station-preview" key={station._id}>
 
            <StationPreview onPlayStation={onPlayStation} station={station} />           

            </li>
        ))}
    </ul>
    )
}