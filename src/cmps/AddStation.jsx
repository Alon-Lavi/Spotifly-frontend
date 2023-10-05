import { useEffect, useState } from "react";
import { stationService } from "../services/station.service.local";
import { ImgUploader } from "./ImgUploader";
import { useNavigate } from "react-router";


export function AddStation() {
    const [newStation, setNewStation] = useState(stationService.getEmptyStation())
    const navigate = useNavigate()
    console.log('====================================');
    console.log('hi');
    console.log('====================================');
    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        setNewStation(prevStation => ({ ...prevStation, [field]: value }))

    }
    function submitForm(ev) {
        ev.preventDefault()
        stationService.save(newStation)
        navigate('/station')
    }

    return (
        <section className="create-station">
            <form onSubmit={submitForm}>
                <input onChange={handleChange} value={newStation.name} type="text" name="name" />
            </form>
        </section>
    )
}