import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { utilService } from './util.service'

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

	addSong,
	
}

window.userService = userService

function getUsers() {
	return storageService.query('user')
	// return httpService.get(`user`)
}

async function getById(userId) {
	const user = await storageService.get('user', userId)
	// const user = await httpService.get(`user/${userId}`)
	return user
}

function remove(userId) {
	return storageService.remove('user', userId)
	// return httpService.delete(`user/${userId}`)
}

async function addSong( _id, song ) {
	const user = await storageService.get('user', _id)
	user.likedSongs.songs.push(song)
	console.log(user,'updtae');
	await storageService.put('user', user)

	// const user = await httpService.put(`user/${_id}`, {_id, score})
	// Handle case in which admin updates other user's details
	if (getLoggedinUser()._id === user._id) saveLocalUser(user)
	return user
}

async function removeSong( _id, videoId ) {
	const user = await storageService.get('user', _id)
	const idx = user.likedSongs.songs.findIndex((song) => song.videoId === videoId)
	console.log(idx,'idx');
	user.likedSongs.songs.splice(idx, 1)
	
	console.log(user,'updtae');
	await storageService.put('user', user)

	// const user = await httpService.put(`user/${_id}`, {_id, score})
	// Handle case in which admin updates other user's details
	if (getLoggedinUser()._id === user._id) saveLocalUser(user)
	return user
}
async function login(userCred) {
	const users = await storageService.query('user')
	const user = users.find((user) => user.username === userCred.username)
	// const user = await httpService.post('auth/login', userCred)
	if (user) {
		return saveLocalUser(user)
	}
}

async function signup(userCred) {
	userCred.likedSongs = {
		_id: utilService.makeId,
		imgUrl:'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png',
		name: 'Liked Songs',
		songs:[],
		createdBy:{
			_id:userCred._id,
			fullname:userCred.fullname
		}
	
	}
	if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
	const user = await storageService.post('user', userCred)
	// const user = await httpService.post('auth/signup', userCred)
	return saveLocalUser(user)
}

async function logout() {
	sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
	// return await httpService.post('auth/logout')
}



function saveLocalUser(user) {
	user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, likedSongs: user.likedSongs }
	sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
	return user
}

function getLoggedinUser() {
	return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()

// const user = {
//     _id: "u101",
//     username: "Muki",
//     password: "1234",
//     fullname: "Muki Muki",
//     imgUrl: "http://some-img",
//     likedSongs: [
//       {
//         _id: "u100",
//         fullname: "Moki Song",
//         imgUrl: "http://some-img"
//       }
//     ],
//     playLists: [
//       {
//         _id: "u105",
//         fullname: "Bob",
//         imgUrl: "http://some-img"
//       }
//     ],
//     savedStoryIds: ["s102", "s120", "s200"]
//   }
