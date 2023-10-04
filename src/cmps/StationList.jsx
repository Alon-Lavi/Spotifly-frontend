import { StationPreview } from "./StationPreview.jsx"





export function StationList({stations,onRemoveStation,onUpdateStation}){
   
    return(
        <ul className="station-list">
        {stations.map((station) => (
            <li className="station-preview" key={station._id}>
                {/* {shouldShowActionBtns(station) &&  */}
                <StationPreview station={station} />
                
                    {/* <div>
                        <button
                            onClick={() => {
                                onRemoveStation(station._id)
                            }}
                        >
                            x
                        </button>
                        <button
                            onClick={() => {
                                onUpdateStation(station)
                            }}
                        >
                            Edit
                        </button>
                    </div> */}
                
                {/* } */}

            </li>
        ))}
    </ul>
    )
}