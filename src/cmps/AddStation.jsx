import { useEffect, useState } from "react";
import { stationService } from "../services/station.service.local";
import { ImgUploader } from "./ImgUploader";
import { useNavigate } from "react-router";


export function AddStation() {
    const [newStation, setNewStation] = useState(stationService.getEmptyStation())
    const navigate = useNavigate()



    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        setNewStation(prevStation => ({ ...prevStation, [field]: value }))

    }
    async function submitForm(ev) {
        ev.preventDefault()
        await stationService.save(newStation)
        navigate(`/station/station/${newStation.id}`)
    }

    return (
        <section className="create-station">
            <form onSubmit={submitForm}>
                <input onChange={handleChange} value={newStation.name} type="text" name="name" />
            </form>
        </section>
    )
}