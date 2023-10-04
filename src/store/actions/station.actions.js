import { StationService } from "../../services/station.service.local.js";
import { userService } from "../../services/user.service.js";
import { store } from '../store.js'
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'
import {  ADD_STATION , REMOVE_STATION, SET_STATIONS, UNDO_REMOVE_STATION, UPDATE_STATION } from "../reducer/station.reducer.js";

// Action Creators:
export function getActionRemoveStation(sattionId) {
    return {
        type: REMOVE_STATION,
        sattionId
    }
}
export function getActionAddStation(station) {
    return {
        type: ADD_STATION,
        station
    }
}
export function getActionUpdateStation(station) {
    return {
        type: UPDATE_STATION,
        station
    }
}

export async function loadStations() {
    try {
        const stations = await StationService.query()
        console.log('Stations from DB:', stations)
        store.dispatch({
            type: SET_STATIONS,
            stations
        })

    } catch (err) {
        console.log('Cannot load stations', err)
        throw err
    }

}

export async function removeStation(sattionId) {
    try {
        await StationService.remove(sattionId)
        store.dispatch(getActionRemoveStation(sattionId))
    } catch (err) {
        console.log('Cannot remove station', err)
        throw err
    }
}

export async function addStation(station) {
    try {
        const savedStation = await StationService.save(station)
        console.log('Added station', savedStation)
        store.dispatch(getActionAddStation(savedStation))
        return savedStation
    } catch (err) {
        console.log('Cannot add station', err)
        throw err
    }
}

export function updateStation(station) {
    return StationService.save(station)
        .then(savedStation => {
            console.log('Updated station:', savedStation)
            store.dispatch(getActionUpdateStation(savedStation))
            return savedStation
        })
        .catch(err => {
            console.log('Cannot save station', err)
            throw err
        })
}








// Demo for Optimistic Mutation 
// (IOW - Assuming the server call will work, so updating the UI first)
export function onRemoveStationOptimistic(sattionId) {
    store.dispatch({
        type: REMOVE_STATION,
        sattionId
    })
    showSuccessMsg('station removed')

    StationService.remove(sattionId)
        .then(() => {
            console.log('Server Reported - Deleted Succesfully');
        })
        .catch(err => {
            showErrorMsg('Cannot remove station')
            console.log('Cannot load stations', err)
            store.dispatch({
                type: UNDO_REMOVE_STATION,
            })
        })
}
