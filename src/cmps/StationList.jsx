import { Link } from "react-router-dom"
import { StationPreview } from "./StationPreview.jsx"





export function StationList({stations,onRemoveStation,onUpdateStation}){
   
    return(
        <ul className="station-list">
        {stations.map((station) => (
            <li className="station-preview" key={station._id}>
             <Link to={`station/${station._id}`}>  <StationPreview station={station} /></Link> 
                

            </li>
        ))}
    </ul>
    )
}