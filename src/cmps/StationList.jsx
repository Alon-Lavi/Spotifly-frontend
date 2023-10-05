import { Link } from "react-router-dom"
import { StationPreview } from "./StationPreview.jsx"





export function StationList({stations,onRemoveStation,onUpdateStation}){
   
    return(
        <ul className="station-list">
        {stations.map((station,idx) => (
            <li className="station-preview" key={station._id}>
             <Link key={idx+100} to={`station/${station._id}`}>  <StationPreview station={station} /></Link> 
                

            </li>
        ))}
    </ul>
    )
}