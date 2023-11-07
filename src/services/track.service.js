import axios from 'axios'
import { utilService } from './util.service'
import { _ } from 'lodash'

// import { httpService } from './http.service'
// import { stationService } from './station.service.local'

export const trackService = {
	getVideos,
	getCleanTitle,
	truncateTitle,
	getArtistName,
	getArtists,
	getSongDurations,
	getSongInfo
}

const KEY = 'videosDB'
const API_KEY = 'AIzaSyBW5qn1Rksz37QRNmq2hZGhs2kep291zpk'
// const API_KEY = 'AIzaSyBRKY6ERVlaMGjytOb4wV1GWgyjr8d0tL0'


async function getSongInfo(value) {
	const res = await axios.get(
		`https://www.googleapis.com/youtube/v3/search?part=snippet%20&videoEmbeddable=true&type=video&key=${API_KEY}&q=${value}`
	)
	const songs = res.data.items
	const PROMISES = songs.map((song) => {
		return axios.get(
			`https://www.googleapis.com/youtube/v3/videos?id=${song.id.videoId}&part=contentDetails&key=AIzaSyCIHRUBlXc7OJQY31NlL6jlfigPqh9_PHE`
		)
	})
	return Promise.all(PROMISES).then((values) => {
		console.log(values)
		const songsToSave = songs.map((song, idx) => {
			song.duration = values[idx].data.items[0]?.contentDetails.duration
			return song
		})
		return songsToSave
	})
}
async function getSongDurations(song) {
	const videoId = song.kind ? song.id.videoId : song.videoId
	try {
		console.log(videoId)
		const res = await axios.get(
			`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=AIzaSyCIHRUBlXc7OJQY31NlL6jlfigPqh9_PHE`
		)
		const dur = utilService.getSongDurations(res.data.items[0].contentDetails.duration)
		return dur
	} catch (error) {
		console.error('Error:', error)
		return null
	}
}
async function getVideos(term, amount = 5) {
	const termVideosMap = utilService.loadFromStorage(KEY) || {}
	if (termVideosMap[term]) return termVideosMap[term]

	try {
		const response = await axios.get(
			`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${amount}&q=${term}&key=${API_KEY}`
		)
		const ytVideos = response.data.items

		const durations = await Promise.all(
			ytVideos.map(async (ytVideo) => {
				const videoId = ytVideo.id.videoId
				try {
					const videoResponse = await axios.get(
						`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${API_KEY}`
					)
					if (videoResponse.data.items && videoResponse.data.items.length > 0) {
						return videoResponse.data.items[0].contentDetails.duration
					} else {
						return ''
					}
				} catch (err) {
					return ''
				}
			})
		)

		const ytVideosWithDurations = ytVideos.map((ytVideo, index) => {
			const duration = durations[index] ? convertDuration(durations[index]) : 'Unknown'

			return {
				_id: ytVideo.id.videoId,
				title: ytVideo.snippet.title,
				imgUrl: ytVideo.snippet.thumbnails.default.url,
				addedAt: ytVideo.snippet.publishedAt,
				duration: duration,
			}
		})
		termVideosMap[term] = ytVideosWithDurations
		utilService.saveToStorage(KEY, termVideosMap)

		return ytVideosWithDurations
	} catch (err) {
		throw err
	}
}
function getArtists(station) {
	const artists = []
	station.songs.map((song) => {
		if (artists.length === 2) return
		if (song.artist) {
			if (!_.includes(artists, song.artist)) artists.push(song.artist)
		}
	})
	return artists.join(', ')
}
function convertDuration(duration) {
	const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)

	const hours = parseInt(match[1]) || 0
	const minutes = parseInt(match[2]) || 0
	const seconds = parseInt(match[3]) || 0

	let formattedDuration = ''

	if (hours > 0) {
		formattedDuration += `${padZero(hours)}:`
	}

	formattedDuration += `${padZero(minutes)}:${padZero(seconds)}`

	return formattedDuration
}

function padZero(num) {
	return num.toString().padStart(2, '0')
}

function getCleanTitle(title) {
	if (typeof title !== 'string') return ''
	const regex = /^[^<>/|[!@#$%^&*()]+/
	const match = title.match(regex)
	return match?.[0] ?? ''
}

function truncateTitle(title, maxLength = 20) {
	if (!title) return

	if (title.length <= maxLength) {
		return title
	}

	const truncatedTitle = title.slice(0, maxLength) + '...'
	return truncatedTitle
}

function getArtistName(title) {
	if (typeof title !== 'string') return ''

	const regex = /^(.*?)(-|–|:|—)\s/
	const match = title.match(regex)

	return match?.[1] || ''
}
