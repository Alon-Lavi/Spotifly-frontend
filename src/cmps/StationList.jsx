import { Link, useNavigate } from "react-router-dom"
import { StationPreview } from "./StationPreview.jsx"


export function StationList({stations,onPlayStation}){
    const navigate = useNavigate()
    return(
        <ul className="station-list">
            
        {stations.map((station) => (
            <li onClick={()=> navigate(`/station/${station._id}`)} className="station-preview" key={station._id}>
 
            <StationPreview onPlayStation={onPlayStation} station={station} />           

            </li>
        ))}
    </ul>
    )
}