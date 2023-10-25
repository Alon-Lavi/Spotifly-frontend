import axios from 'axios'
import { utilService } from './util.service'
// import { httpService } from './http.service'
// import { stationService } from './station.service.local'

export const trackService = {
	getVideos,
	getCleanTitle,
	truncateTitle,
}

const KEY = 'videosDB'
const apiKey = 'AIzaSyBRKY6ERVlaMGjytOb4wV1GWgyjr8d0tL0'

async function getVideos(term, amount = 5) {
	const termVideosMap = utilService.loadFromStorage(KEY) || {}
	if (termVideosMap[term]) return termVideosMap[term]

	try {
		const response = await axios.get(
			`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${amount}&q=${term}&key=${apiKey}`
		)
		const ytVideos = response.data.items

		const durations = await Promise.all(
			ytVideos.map(async (ytVideo) => {
				const videoId = ytVideo.id.videoId
				try {
					const videoResponse = await axios.get(
						`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${apiKey}`
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
	const regex = /^[^<>/|!@#$%^&*()]+/
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
