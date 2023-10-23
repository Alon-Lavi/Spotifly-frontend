export const utilService = {
	makeId,
	convertTime,
	makeLorem,
	getRandomIntInclusive,
	debounce,
	randomPastTime,
	saveToStorage,
	loadFromStorage,
	getAssetSrc,
	getGreetings,
	handleChange,
	getRandomSongIndex,
	getDate,
}

function convertTime(time) {
	if (typeof time !== 'number') {
		return null
	}
	const minutes = Math.floor(time / 60)
	const seconds = Math.floor(time % 60)
	return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

function makeId(length = 6) {
	var txt = ''
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

	for (var i = 0; i < length; i++) {
		txt += possible.charAt(Math.floor(Math.random() * possible.length))
	}

	return txt
}

function makeLorem(size = 100) {
	var words = [
		'The sky',
		'above',
		'the port',
		'was',
		'the color of television',
		'tuned',
		'to',
		'a dead channel',
		'.',
		'All',
		'this happened',
		'more or less',
		'.',
		'I',
		'had',
		'the story',
		'bit by bit',
		'from various people',
		'and',
		'as generally',
		'happens',
		'in such cases',
		'each time',
		'it',
		'was',
		'a different story',
		'.',
		'It',
		'was',
		'a pleasure',
		'to',
		'burn',
	]
	var txt = ''
	while (size > 0) {
		size--
		txt += words[Math.floor(Math.random() * words.length)] + ' '
	}
	return txt
}

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function randomPastTime() {
	const HOUR = 1000 * 60 * 60
	const DAY = 1000 * 60 * 60 * 24
	const WEEK = 1000 * 60 * 60 * 24 * 7

	const pastTime = getRandomIntInclusive(HOUR, WEEK)
	return Date.now() - pastTime
}

function debounce(func, timeout = 300) {
	let timer
	return (...args) => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			func.apply(this, args)
		}, timeout)
	}
}

function saveToStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
	const data = localStorage.getItem(key)
	return data ? JSON.parse(data) : undefined
}

function getGreetings() {
	var myDate = new Date()
	var hrs = myDate.getHours()
	let greet

	if (hrs < 12) {
		greet = 'Good morning'
	} else if (hrs >= 12 && hrs <= 17) {
		greet = 'Good afternoon'
	} else if (hrs >= 17 && hrs <= 24) {
		greet = 'Good evening'
	}
	return greet
}

function handleChange({ target }) {
	const field = target.name
	const value = target.type === 'number' ? +target.value || '' : target.value
	console.log('field,value', field, value)
	// onSetFilter({ ...filterBy, [field]: value })
}
function getDate(stamp) {
	const date = new Date(stamp)
	return date.toLocaleDateString()
}

// util function
function getAssetSrc(name) {
	const path = `/src/assets/${name}`
	const modules = import.meta.glob('/src/assets/*', { eager: true })
	const mod = modules[path]
	return mod.default
}

function getRandomSongIndex(songArray) {
	const minIndex = 0
	const maxIndex = songArray.length - 1
	return Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex
}
