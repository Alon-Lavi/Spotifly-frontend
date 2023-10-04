import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { stationService } from "../services/station.service.local"




export function StationDetails() {
    const [station, setStation] = useState(null)
    var i = 1
    const { stationId } = useParams()

    useEffect(() => {
        loadStations()
    }, [])

    async function loadStations() {

        try {
            const station = await stationService.getById(stationId)
            setStation(station)
            console.log('====================================');
            console.log(station);
            console.log('====================================');
        } catch (err) {
            console.log('Had issues in station details', err)
            // showErrorMsg('Cannot load station')
            // navigate('/station')
        }

    }
    if (!station) return <dir>loading</dir>
    return (
        <section className="station-details">
            <header>
                <img src={station.createdBy.imgUrl} alt="" />
                <p>
                    <h1>{station.name}</h1>
                    {station.songs.map(song => <span key={song.artist}>{song.artist} </span>)}
                </p>
            </header>
            <table>
                <thead>
                    <th>#</th>    <th>title</th>    <th>album</th>    <th>time</th>
                </thead>
                <tbody>
                    {station.songs.map(song => <tr>
                        <td>{i++}</td><td><img src={song.imgUrl} alt="" /> {song.title} </td><td>{song.album}</td><td>{song.addedAt}</td>
                    </tr>
                    )}
                </tbody>

            </table>
        </section>
    )

}