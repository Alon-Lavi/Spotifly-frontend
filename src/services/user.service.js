import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
	login,
	logout,
	signup,
	getLoggedinUser,
	saveLocalUser,
	getUsers,
	getById,
	remove,
	removeSong,
	updateUser,
	addSong,
}

window.userService = userService

function getUsers() {
	// return storageService.query('user')
	return httpService.get(`user`)
}

async function getById(userId) {
	// const user = await storageService.get('user', userId)
	const user = await httpService.get(`user/${userId}`)
	return user
}

function remove(userId) {
	// return storageService.remove('user', userId)
	return httpService.delete(`user/${userId}`)
}

async function addSong(_id, song) {
	const user = await httpService.get(`user/${_id}`)
	user.likedSongs.songs.push(song)
	await httpService.put(`user/${user._id}`, user)
	if (getLoggedinUser()._id === user._id) saveLocalUser(user)
	return user
	// await storageService.put('user', user)
}

async function removeSong(_id, videoId) {
	const user = await httpService.get(`user/${_id}`)
	const idx = user.likedSongs.songs.findIndex((song) => song.videoId === videoId)
	user.likedSongs.songs.splice(idx, 1)
	await httpService.put(`user/${user._id}`, user)
	if (getLoggedinUser()._id === user._id) saveLocalUser(user)
	return user
	// await storageService.put('user', user)
}

async function updateUser(user) {
	await httpService.put(`user/${user._id}`, user)
	return user
}

async function login(userCred) {
	const users = await httpService.get('user')
	const user = users.find((user) => user.username === userCred.username)
	await httpService.post('auth/login', userCred)
	if (user) {
		return saveLocalUser(user)
	}
}

async function signup(userCred) {
	userCred.likedSongs = {
		imgUrl: 'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png',
		name: 'Liked Songs',
		songs: [],
		createdBy: {
			_id: userCred._id,
			fullname: userCred.fullname,
		},
	}

	if (!userCred.imgUrl)
		userCred.imgUrl =
			'https://www.pc.co.il/wp-content/uploads/2018/06/Kim_Jong-un_at_the_Workers_Party_of_Korea_main_building600-600x416.jpg'

	// const user = await storageService.post('user', userCred)
	const user = await httpService.post('auth/signup', userCred)
	return saveLocalUser(user)
}

async function logout() {
	sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
	return await httpService.post('auth/logout')
}

function saveLocalUser(user) {
	user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, likedSongs: user.likedSongs }
	sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
	return user
}

function getLoggedinUser() {
	return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}
