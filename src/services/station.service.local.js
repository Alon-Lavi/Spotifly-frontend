import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'stationDB'
const GENRE_KEY = 'genreDB'

export const stationService = {
	query,
	getById,
	save,
	remove,
	getEmptyStation,
	removeSong,
	// addStationMsg,
	getGenres,
}

window.cs = stationService

function removeSong(songId, station) {
	const updatedSongs = station.songs.filter((song) => song._id !== songId)
	station.songs = updatedSongs
	return save(station)
}

var stationsDemo = [
	{
		_id: 'd5001',
		name: 'Daily Mix 1',
		tags: ['Funk', 'Happy'],
		createdBy: {
			_id: 'u101',
			fullname: 'Puki Ben David',
			imgUrl: 'https://dailymix-images.scdn.co/v2/img/ab6761610000e5ebe6b8f92cadb785fd926be403/1/en/default',
		},
		likedByUsers: ['{minimal-user}', '{minimal-user}'],

		songs: [
			{
				id: 's1001',
				album: 'album36',
				title: 'The Meters - Cissy Strut',
				artist: 'Cissy Strut',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
				addedBy: '{minimal-user}',
				addedAt: 162521765262,
			},

			{
				id: 'mUkfiLjooxs',
				album: 'album37',
				artist: " The JB's ",
				title: ' Pass The Peas',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
				addedBy: {},
			},
		],
		msgs: [
			{
				id: 'm101',
				from: '{mini-user}',
				txt: 'Manish?',
			},
		],
	},
	{
		_id: 'd1021',
		name: 'Daily Mix 2',
		tags: ['Funk', 'Happy'],
		createdBy: {
			_id: 'u101',
			fullname: 'Puki Ben David',
			imgUrl: 'https://dailymix-images.scdn.co/v2/img/6f0da41419b31d9d2ba55d2df212f59ad0668118/2/en/default',
		},
		likedByUsers: ['{minimal-user}', '{minimal-user}'],

		songs: [
			{
				id: 's1001',
				album: 'album15',
				title: 'The Meters - Cissy Strut',
				artist: 'Cissy Strut',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
				addedBy: '{minimal-user}',
				addedAt: 162521765262,
			},

			{
				id: 'mUkfiLjooxs',
				album: 'album16',
				artist: " The JB's ",
				title: ' Pass The Peas',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
				addedBy: {},
			},
		],

		msgs: [
			{
				id: 'm101',
				from: '{mini-user}',
				txt: 'Manish?',
			},
		],
	},

	{
		_id: 'd1004',
		name: 'Daily Mix 3',
		tags: ['Funk', 'Happy'],
		createdBy: {
			_id: 'u101',
			fullname: 'Puki Ben David',
			imgUrl: 'https://dailymix-images.scdn.co/v2/img/ab6761610000e5ebbd0a9110c01c547407bfd1b9/3/en/default',
		},
		likedByUsers: ['{minimal-user}', '{minimal-user}'],

		songs: [
			{
				id: 's1001',
				album: 'album1',
				title: 'The Meters - Cissy Strut',
				artist: 'Cissy Strut',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
				addedBy: '{minimal-user}',
				addedAt: 162521765262,
			},

			{
				id: 'mUkfiLjooxs',
				album: 'album2',
				artist: " The JB's ",
				title: ' Pass The Peas',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
				addedBy: {},
			},
		],

		msgs: [
			{
				id: 'm101',
				from: '{mini-user}',
				txt: 'Manish?',
			},
		],
	},
	{
		_id: 'd1031',
		name: 'Daily Mix 4',
		tags: ['Funk', 'Happy'],
		createdBy: {
			_id: 'u101',
			fullname: 'Puki Ben David',
			imgUrl: 'https://dailymix-images.scdn.co/v2/img/ab6761610000e5eb9d786723f2aa91b9f538e139/4/en/default',
		},
		likedByUsers: ['{minimal-user}', '{minimal-user}'],

		songs: [
			{
				id: 's1001',
				album: 'album17',
				title: 'The Meters - Cissy Strut',
				artist: 'Cissy Strut',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
				addedBy: '{minimal-user}',
				addedAt: 162521765262,
			},

			{
				id: 'mUkfiLjooxs',
				album: 'album18',
				artist: " The JB's ",
				title: ' Pass The Peas',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
				addedBy: {},
			},
		],

		msgs: [
			{
				id: 'm101',
				from: '{mini-user}',
				txt: 'Manish?',
			},
		],
	},

	{
		_id: 'd1002',
		name: 'Simpsons',
		tags: ['Pop', 'Rock'],
		createdBy: {
			_id: 'u101',
			fullname: 'Puki Ben David',
			imgUrl:
				'data:image/jpeg;base64,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',
		},
		likedByUsers: ['{minimal-user}', '{minimal-user}'],
		songs: [
			{
				id: 's1001',
				album: 'album1',
				title: 'The Meters - Cissy Strut',
				artist: 'Cissy Strut',
				url: 'youtube/song.mp4',
				imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ7ZmMK94DfO65cgcUxZLxz7KtJ8tHe6vk8A&usqp=CAU',
				addedBy: '{minimal-user}',
				addedAt: 162521765262,
			},
			{
				id: 'mUkfiLjooxs',
				album: 'album2',
				artist: " The JB's ",
				title: ' Pass The Peas',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
				addedBy: {},
			},
		],
		isRecomended: true,

		msgs: [
			{
				id: 'm101',
				from: '{mini-user}',
				txt: 'Manish?',
			},
		],
	},
	{
		_id: 'd1001',
		name: 'Just Chill',
		tags: ['Funk', 'Happy'],
		createdBy: {
			_id: 'u101',
			fullname: 'Puki Ben David',
			imgUrl: 'https://i.scdn.co/image/ab67706f00000002719586de761e1ff231672faa',
		},
		likedByUsers: ['{minimal-user}', '{minimal-user}'],
		songs: [
			{
				id: 's1001',
				album: 'album1',
				title: 'The Meters - Cissy Strut',
				artist: 'Cissy Strut',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
				addedBy: '{minimal-user}',
				addedAt: 162521765262,
			},
			{
				id: 'mUkfiLjooxs',
				album: 'album2',
				artist: " The JB's ",
				title: ' Pass The Peas',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
				addedBy: {},
			},
		],

		isRecomended: true,
		msgs: [
			{
				id: 'm101',
				from: '{mini-user}',
				txt: 'Manish?',
			},
		],
	},

	{
		_id: 'd9001',
		name: 'GTA playlist',
		tags: ['Hip-Hop', 'Rock'],
		createdBy: {
			_id: 'u101',
			fullname: 'Puki Ben David',
			imgUrl:
				'data:image/jpeg;base64,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',
		},
		likedByUsers: ['{minimal-user}', '{minimal-user}'],
		songs: [
			{
				id: 's1001',
				album: 'album1',
				title: 'The Meters - Cissy Strut',
				artist: 'Cissy Strut',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
				addedBy: '{minimal-user}',
				addedAt: 162521765262,
			},
			{
				id: 'mUkfiLjooxs',
				album: 'album2',
				artist: " The JB's ",
				title: ' Pass The Peas',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
				addedBy: {},
			},
		],
		isRecomended: true,

		msgs: [
			{
				id: 'm101',
				from: '{mini-user}',
				txt: 'Manish?',
			},
		],
	},
	{
		_id: 'd1003',
		name: 'watch it burn',
		tags: ['Pop', 'Hip-Hop'],
		createdBy: {
			_id: 'u101',
			fullname: 'Puki Ben David',
			imgUrl:
				'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFhYZGBgaHBkcGhgcGhwcHB4cHBwaHBoaGBgcIS4lHB4rIRgaJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHxISHzQrJCs2NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQIDBAUGBwj/xABBEAACAQIEAwUFBgMHAwUAAAABAgADEQQSITEFQVEGImFxgRMykaGxQlJiwdHwFHLhByMzNHOS8XSCshVDU6LC/8QAGgEAAwEBAQEAAAAAAAAAAAAAAAECAwQFBv/EACYRAAICAgIDAAICAwEAAAAAAAABAhEDIQQSEzFBIjJRYRQjcQX/2gAMAwEAAhEDEQA/AM+C3iAzU4eiIvtHsRsqfePU9F1+Vp7EpUeIZrXG8beS4yoGcsFC35AWA8AJDKT1YrCOvG2klFgG1NtDY2vY8jBsYtJtyVvYXy7Xvpr4a8pIy3y2WxIuVHytfbTrFpAndw3oWANuump6QqgW1uik7hblrW3JOg/DM7HRFURlNmFjyjA8c7A2C3ygWF99dTccvKMtNF/ZLFzRQ0bEvGA4nx9bQzRoklGiWJ1sBuTsIhpWIWO8bmktTDEDMCGHO3LzkIgqBxocGhmjVvC8egFJhmiRIgHBot5GTHAwsBbmNBg01+zFDPXW65lFybi48LyJypFQjbocqJRRs9mOhI13IHdmfWqBmJdsp2ChSQPC4M2u1uIQOEVBmUh2PXw8haZFWijMX9ooU3YgnvjquXrecHH46jNzftnZyeQ5RUF6QzP3QM+bKdHQN3Rb3Sel4ntMmouWIvmbcA6aDqbSWniLkt7qINEHMnQZrbk7yE99L/apgA/iUmynzG07Fv2cQz27/fb5QkUJfRCCib62uBa+ttD9I16+ptoLm3lyB9JD67RCsyTl9KomNaJ7WRezJirRJubGwtc+ekdyCiQ1oe2kuCwJe5uoAtcswX67y5jODFEzh6ZtyDgk+NonN3QhpHuuCMgAJ1GhtqCN73kaV7BSHXKAAyE9N+75cxM3IY4KfhB9hk7VRc22vpFFcDx8NZBci+g1Hw8ukbllXIKLHthD2olYKZJSNmUnYGO5DS2aKYNyASQt9gxsT6R1IaOmzDvW6gbgSLG4dnYupDKedwLeFjEGewupzLoGuPQGO2adUmJRq2DeVreMclNQBnbLfbS/qYi0CABYHUnewBGmvhImouxvdfE5hC2Kha6lGt6g9QdjI/aR2Le5UA3ygLfraQEGDbM2iQ1ovtJFl/dpIKLHlFciXSF9pD2klp4Inwky8OtYsbAmxtYnTwh2YdkVPaTsOztQUcK9YrfUnzGw+c5alhSzomgzEC/nzM1u0OKVFXDJmtT94nnp+szlcnRtjdKzL4jxBqzl3Avtp06SqG8Iw3iMJpVLRm9st4bEKLq6kow1tuCNQRfTTWOfEoFKoGs1rs1gbCxAAHK4vKJEW8nYibNCV7wl9mMlsIEQvEl9QHq5Gxt4/H9YjNf84gMUw6oAXnoDHs94wQEOqHQtoWheBlUAWgBC8L+nzhQqAiBXWBMLwcQJKdIsbDx8PWSuwQZFOa+56eXrGYaqFJB2IsbRyoim5cEb2ANz0vE0aR9E1Y5dbliLA32NxIfZIwOS4a17HW452MRMSLsWHdbQgbjpvH50QHKSzEWvbQXhQ/ZVUQtAnzj6QuY6MmWKVHmY9qoG0bXewsJVzRJWZqPbbNvCYpFQsbM+wUjQfiPU+Ez3xRvK6AmNY6xdUX1VHQ9nKJeqHAFk1JNpl8aq56zsbXzHbw0Ev8NJXC1GBtmcL8OczMWuxmcF+TZT/FKJUtAgQvAzahAL6+Oh8omQfv8AfhB3sP3v0vKzYkhspA/fjM5OKdFKLassZYR+QdYQtB1YppqecY1MjykOQjKeTC4+klpVzsdQZEZyStbRc4ODpjGjTJq6WMhvN4u0QSvUuAMoFuYvc+Jud/KCAm9uQ/dpFeAO0AJShjSZr4HiFMoKdVAAL2qL7wv977wmTXtmOXUXNjt625RRlfsdDbwzRuaKNr39JaEOvFDyO8URsdDs3SAaNtC0QULmihj4RsS8AofmMmw7aysTHI1jE0JxtFrFHWRIt+UnBzDxmhgsOERnbUggKD948/SK6QoK9GYXCjQkHUHpYxuHQu4RR3mNh5xtV7kzY7M0F9srubBQz38LfKKeolRjcqDi+KVcmHRbez949W5/nKeIN1lbFVw9VmBuCxsTvvJ8S3ckxVJEZP2KJaAaNEWa0UK+q2/d5Qepd1PX9/mZoOpCk+H7+sz3p3ewG2n7POc2VXJJGsP1Zv3H7tCZ+Y9fnEldWZ0RJi7rkYbe6f35xFeVjY85bw9PmZnFKEWkdGbI5tNk9c6CVswhiatzYSvea421ExotA7+EQPK5Mt4XCmoTluLAXJ687W5aRTzRgrkzTHhlN1EjDxxeRVabKbEWMZeaRmmrREotOmT5xFVxK+aKDH2ET5oZpEWhmh2/kdEmaBcSrhsRnv0BtJSYlK1YUS5oZhItZNTwzGOxSpexC4iCpLQwfWRthYdieyG0q9jNBcRmFrzLeiREpXvpueX0kv8AoTV7RuUuGkqzkiy+ep5ARcNWVMPWvozkIvQ8zaMw3EWZVpba2I/ETa/zju0VgwpDancX6k7mRbbo0jpWY6EXEv5syzPdrd21ue2uoiLiMst62RKNk5SSJS5mMGLU6j4SviMYbEx91QlGTZYxdQZSvhMvB4gZjfmJIz6XNjqNNQLc5C9VB7pA8hOeWRdrR0xxtRpl32oizP8A4pevyix+cPEXaVEDVrD5xtXG3Fl09JFi2YNlJ8h+cq1DY8tdfjMYz7UTKDTpk2eAcyFj1nR8J4SChZt2UjyB5wzcqOJKzfDx3lbowi86/gqqlIE6cyfHecbi6RRmU7i808O1RsM5JuL7Dw/oJxc3/ao09M7OGlDsn7LHG6iMVdTe9wfnMk1JXDHblC87+PFwgk2cXIcZTtFgvFDysHjg03s56LBcSriMVZLjnt8RGYitso+1p5XkLVLuEGwEylNvSNFEvYZMqAep8zJS0rh45GuZadKjNmhhUvqdpJWxWXQRpeyTLdyTDsRGPZ7Lb4xowYo9ZULxnt1+8PiI+yNFBGvTxBYgbk7CSsArb2YHy1kHAWzVRsQBcnp+7ReMKFqHKb319Zyx5F5XA6ZcZLCpr2XuE4bPWW+YgHM1t9Nb3lrF/wB9UqOO6oJYnoBoPWUMLijTw7suju2TNb7Nrm0qU+IOiMg2Yi+munj0m6luzmcdUTBRudZG5DlUHMyRO8vxv8ZY4TwzPUUEm176eAJ/Yk5JOUX1HiSjNdyljkyNlAtbT+srWB06iLxapdwfz6E/rKYxFmG370kY5tQqRrliuz6+gOHzHvFmsbWF+W2g5xz0E0BuDDFPbLY2BYk+d7C/oZDxJ9Etufn0+Ullxd0S/wAMnUwlKzeMJJdM7jjmAV0DruBpbmJgUcAXRmse6PO5vqZr8VxL0VCW7hW1z1lrgzItC5PLvf1H73nlY88oY1/09GeCEp3/AEckiEkek7bA4u5yAd1Rv47zlsdTGdijCxsbTQw1V6dAs+hJ069Jpy15FF/yZ8Sodk/hS43VV6vd8j53nU4SilOiNNLfHqZxrYXMucHW4+N52VMZMP39bLMeS9RimbYo+5V7OR4xlD3T3WFx85SzRxou6mp9gG1zp6DrIEBbYXPhrPYxTSgtnl5ofm6RJmhmkd+sR2sL8ri5lynUbMoY+0qNrhnCPaozkfynx5TCpoUqOraNfbwnoXBsTTamFSxsBe05PtSpFVXKkHUE9ek8vBypPK4yPRzceKx/j8KWaS1KbIbMLbQ4OivUUHbc/lOg7TUUyKdLjY/CdcuUo5FD+Tnhxe2JyMn2l0kRwbeyapyFv+ZBSrW0nTUiHpmmg0y2Yjl4D9YZs7g1RHHwRadkvYnhyKlbG11DJRW6K2xbKSTY78h6ylW7cYtycq4dVOyexDWHK5J1lnA4OkEyMjcyabVGcEDmU0Go5WlV8OjgqmGRGGt3p2BHQMuxmP8AkpvZXifwjXtE7k+1wuFbTdabUyfAsj6CPXFcPfWpSr4dts1N/aIPHI4vaNocLRrq5FFz7pWpmzD+V5UxPAKyG4tUUfd0a3Lu8/SaRyY27WmTNTrq/RvJwIYhQcJiqNcLeyH+7frqrc5lV+FujqlVGRieY0Pkw0PxlHgeERqxLdwptfuvfp1/5M9C4Vjs9T+Fqd9GVmUsbspW258tjyMjJyHuKNcfGjSmzMOBUUio0AE5M4twSAeuo+B+s2e0fEHw1Y0t1UkZuuxAJ6zM4LhhULMTcC5t18PjM+LKeNNyZryMMcrSj7KVYIQL+9rca+FvlNb/ANH/ALhjbvEX29R6zPUEM2ZbNm226WnSJxDLT74tcHTyH0hycslKPX6TxcEesr9nEYYnMVtpa5BHMaXHxiPSZnzNryHLTyirUvUB6m3oZYrob7mdsdrZzPTG+y8oQyfiMI6QrOv4+pKKgFy1tbbdTM3glFglQMtxyHXyE67IDyvENEC+k+chyKj1PapXf0839oVcBgd7HynQ8fomoqKux2PkLyvxXhju7FVNyfrOmwGHsihhqAJ1Z+RFdWjLFjcU1L6zA4RwwulnBBBuD+/OdK1AFcp1FrSVUAi3nn5M0pytmnatIxuI8IVqZQDy3GvpMfs/g8rujDvfe5WnZESIUADewmkOXOMeousW7aOC4rwdkqFUNxpqeV+stUOFs+HKADNfUcies7CrhVbcc7x9OkF2E2lz5OKX0UcWONtfTH7PcJ9gmpuTa8vcSwC1FKsAfy8pcWKROPyy79vpXyjzGthmSqUQEG9gPAmaXHGcFA21hceW4PSdimAUOX3Jtvyt0lPF8Kz1A9+VivK07/8AMjJ2/iFHGlFxTOd4hwdmUVEHvWAQXv0AAnT8P7MYmnQRFyKbXcXu9zqQtxlB8TL/AArCKKyDkLkDxA0/OddOzDLyxtnmcuXjnUTgaOHVNAuUm4JOrEjfMdyZMQCNvP1lztHVVXNzuU2UnvFdb2GnLUzZ4fwpFQF1DsRcgi4F+QH5xPDctGUc+rZwrYRCwpVVDj/23O5GvcJ+8PmJpIgUAKLACw+Gk0uO8GQaKCFflc2DDW48Jl0tFGZrm25sPj4zPJDqaQydii2DNS/tUTMD3XUm9uXL5TV7F4B0xNR3IYKlg22jnYjke7M3G8VRBZSHboCLD+Yjn4SfhvHK9FHz0DkfZwCpUkALe51XXnbeEVL2bRm21EdxLBiu7uebuR66XlLg/AjRYtnJ6Dlfxm3hG7oHhJp5s+RO2r0egkkc1/BO2IZmU5bg+dhMntaxDhWNhYkDa87PG1giFrbThMVVOJe7C32VHLWejw3LLK36SOXkyjCDr2zJzkG45a/v5zRY3AI2Osj4jgQi6HxNpDhKl0troxHpofznrLWjzIy7KyxCGfwhK0Wekqxiu15Y9jEajPj6PYsr5B0gJPWWwkaJeGwsBEtGsZNROkVARgxGWLUghO0KAaBHIdYrIY6gljrHQDDvEk9ZJn1ccqaWJI6RqLfoLJK+JC6WJMoPxFibIm3Mm2sa+I/vDcWUhbHzvaPUAtqcraXtoD00O868eCLjYpSrURntqpdCtkKsDcE38dOflN08fqWt7NSbe+G+eQj85jWca3DDxFj6Rfan7jfAfrOuEuipHDmxubtk1R2Y3N7677knmbfSdZgcYjoCCAbarfUHoRvOQp1A2x8/DzjKzodHynwOs0jm3s55YLVI2+N4xWNlNwtxfqx0sOoA3mAMFT+4vr3vrHLXQbEDlrf5XiioT7q+uwkzydno0xYXFGPwSiXrs4RSEu2UnLqTZLaW0AM36+JyoquxLOCGR6dspyk6OCVZbi1jYzAwGK/hqzB1OVhbS17ZsyMt7ZrAkEToP4tcQhWkSy3GZiCANR3RfnreaZJqMDTHFuZNhlsq+Q+kmBjfZaR08KSt2egyDGpdCJ51i+45C3OpPkQdLT0moNDPNuMU8lQ9CTPW/wDMl7Rycuui0VsdjS4tY68yflG4E6Efi/ISEp8jJMHuR4gz1/pwRSSpF60IZhEjKPW4jQiHafKHpjWW8iYAR9V7SCo94pFpMcigySmlpWDGTJU1EkbskFMRcgjoolkWxp2lLE4rIGb5eMvOZk8WpZkYC9yNLb3B0tCP7KxraKWOxbgrZjndgoHLX3tNrAXl3C4LMLn3ddeZ6m8zMNSBOcuzsO7qAMvUKo2J+JmngsA6kakAdXLHyI5Tqmklowj72Lj6IDA2FmAX1XYfAyiy5N7svjrbxA6ToatIMCp2+BHkZh41mpHvIzITo6i/oyjW/wAbx4p6oJWnaIw43VwL8idPhykgd9+785Wo4im7FALEi4DKVJ62BG46Sb2FvdJXy2+Bm4llX0Hyn3018r/MCOVuSL8RlH0jcr/eX/b/AFh7HmWb4kRWV5Ij2z/g+cDm6qvjr8uUYcN+J/8AcYGgigliSALksSbAanflGti8qIGxdNnNIrnZ6bBCVBAuy5212IUaec1OFKAzqoAWy6DQcxOZ4JerXqYi1ky+zpi32Qbsw8yJ1HCmGZ9dsoI8dT+cjkfrQoO5WaNvCYP8c4fvgZSbCw1GvObdWoF3nN8QqAu6XGql0Hl7w/OcmOHbR0X12/Rp4uuqKSTaeccXxKmoSDNHiuGrsgrOwKG3dVtRfYnlaYRwbE3y39Z6vEwrGmzk5OWMl1RE1XU2kmFfvE89P39Yq4Q39w6eN/6xWosGuq8rWvr+9Z3qRxxqy53eg+MJTyt9w/KEfZFm4/afFKhTMD+LmJHhu0+MClQ19NyBceIvOYfGOdLzd7KU87MX1TRSfOcM8MIxujoxSlKSVnT9nq9SpZ3csb2Iv9J0607yHAYVEUZbAaeAlLiHaSlSbLYueduU8iUJZJNxR3Sl19mt7OQlipuZkUO2FMvZ1yKdnJ//ADv8JBxvtFTKMKTZz961h8TaOPHn2SonyRL6dqqFyrEqRpr+omjheJUnF0dT6ieUvc3YAM3MBsx153mv2aprU9ohGQ2H9TOvLxYwh2MsWTtKj0Rqo1kDi8rYDDFECb+M0UpWE81+9G70YDKVd12znMviRuPpN/C4pXF1NzzHMHxEr4zAq41uCNQRuD4TmeJ4lqLLnQvv3k0PjcH9Z0wXkpfTNqto7TD0HcEpkCglbtfUje1vGV+I4ch0SpldDdqgW4si6Zrg30Y39I/sNiVqYNGXbM4sdwc50PjqJo4Dv1qznUXWmvSyAlv/ALMR6T0IcaMUmcU80no53ifAHQaA4iluLG1VOlrWzgciCG23mTTdtclYNY2K1F7y8rG1mG/MTuFFWl3ETOh/wzcDJ+F7m+QXNiPKNrcEo1F/vkWq51Z2Hev+FhqoHICaSxJ+jNSOLxFKo2UM6Kb3VkDlgR93Np6G8cwqjQmm6nS7ZkOuliFBH0m1X7MIauRa1ZFKh0GZHsVNmtnUnYrzk1Tsu5Ur/E3BGoNJL+tmkeJj7HO4fC1VuBVUDkmUuoH87EN+kw61d8SzIairh1NmdRlLnmiAkk62m52m4eyGlhKdd3q1iFtlRQtP7bkgXGgPOdRw3C4XChUoU89QADuDO5PMlz3UubncCXDHS2DkZfDODVXCqqexpAaMw75H4E5X6t8JyvH+JNhsYwwvephUz/aDN3sxLbk7bT0s4apV/wAU5E/+NCSW/nfp+FdPEyhxLsfh6lymag+2anYLpsChuD8pfji/YlOUfR5ri+1FaqQpATYEg7X3NiOU0uGUqBrBlrO9SxFzfK1wNAbWPlK/ars3iMKvtHy1aQOXOCQRf3cyePhOfwB9rVRFFiWGoJuLakjxieGEV+JXmlLTOn40zUqD0glwxtTbTKFJBtbe4IOluc5VapvZshuOYI1/7ef6TW7XY69cIPsIP9zanbwt85jfxTf11/WXijUSJFv27gXGUeF/hqYrYxG3OU9OV/OUBimjWq3+wpmpFF72g+/9ITPuv3F+JiwGVmXSdDweoaaLY2J7x6knbzE5/NppIz1JMmUVLTNIScXaOuxfHc3v1Ao6Xv8AITJxHF+VNb/ibf0X9ZkKoO2kmfKAJMYRj6Q5ZHJ7Ho7Bs5sx6nX4DrI6mIdjY3I6cvOQsLnu6SelTtvrLonsPw9bL9lt978p3HZLC0zeouhIAIJ0vOIcATW4DxdEBQu1M8m0K+oPOYZ8TnGkzfBljF7PV0UbxuIxSJ77qvmbTzrE1qtUg/xoy8raaSvXwNP3quLzabAgn01nFHgP6zSWdWdnj+1eGRimYsbchpOQ492k9pogK35/pMjE1MOCQpZ/HW/z0mfVqXICiw5D9Z1YuJGDsiWd1SNTh3abFYak1KjUyIWLaAZgTvlY7XtPa+zVBkw1EOxZyqu7Hcu4zMT43M8IweGuyqftMqj1YCfRFFLKq9FA+At+U6Xo5WyS0AIswuOdokw5WmqmrXf3KKWLHxb7q+Mm7EaGPoM2V0dUZCTmdcy5WFmDDMNNjvynLY3j1d2NLCuuJq7FqdELRTqXqszDToJbpcCxGJOfHv3DqMLSYqg/1HFix5WnSYTCpTQJTVURdAqiwHpAZznA+yYVjWxTfxGIf3na+VRyRV+7+s6VKaoLKqqo5AAD4DaOjgICYym4YBlIKkXBBuCPA84mIqqis7GyqCSfAbyjUwj02L0LWJu9EmysfvIfsP8AI3N9dYxsSmJpOlNu8GC1EYWZSGUsrryuL/GAHHcaq1sTSqrkR2qFSj+1IyIrZguTKRfTUg7mYXDOHDBh69YrmsQqg336G2pNuQkn9onE6aYgU8MAhQN7R07t3Oy90208uc5N65fVyzHkWJOvqYuren6LsMTUzuzve7G5N+v1kWQcjEvAHwmpLdiZSP8AiIzmOLRjH9/CAhPaeEIl/CEBjPWIVP7+sUG0UNEAgGkLR94geAxF0k6GQXjs8EJkrSu1IyRWjrxisg9lJFoSQHWJeKh2ItMDb4yQECNDiFxCgs1uztPPi8Om93X4DvflPc3xqhioDOwOqopYj+a23qZ4Dwnihw1enXVQ5Qk5SbA6EEXtpvPT+FYtKtNa9vZmoWeyuQbkk2zLa9usmQJG12j4+KFEsgvVYhER1Ze+2gJBA0G8f2c4EmHQuW9pWqd6pWNiWY7gEbIOQmVjsa4TOtUuAdM2SoASbG2cGx1/WO7HsTVq3bMSik2JK3ufs7A62NrbSAo60R0IhMpCEMUQUxQIVoBpnh3auu9LiGJem7o2cjMhsbFV005T2nFY+lTF6lSmg/E6r8iZ4j20xVOpjar0nV0YqQym4PdANjGh0c+5vqSSTqT49T4wVrQaBlgODRSYwGOzRCGs0azmKReIBAY25ixcsIBaEvF0isu3KORC2gBNtfQbwGRkawtFKm/79IgMAAiELwMAHKYueMvFgIcr6xC0bC8AHAwzXjYGAHT/ANndMHH0QygqwqDKQCD3DoQZ0HaniL4RaL4chClWqALArbUZSp0K+E5fsHVycQwx2Gdh/uRh+k3/AO0dP7tPCvVHxLGSxplzgvEHxGGerUILvWOYhQo3AFgNhoJm8Q4bjKjp/DBy6KxbI+U2Laa3F9Y/sjUvgiOlcD46zsuy+ld/FPo0X0pnAtX41S0vih/25x8bGQN2r4sujVKoP4qIv80nuWYxc5tufjAizwV+1nE2P+PW9EA+iyu+O4hW0L4l/AB/yFp9BFj1MTMep+MAs8DwvYvH1Tf+HcX+05C/HMbynx3glXCVfY1cuYqrd1iwsxIGpA1upn0NPKv7XMPlxFGpbR6ZQ9CUcnX0c/CNDs89vEuYEaxVEoBCYAwMUARCCGb+sGUaa/DwvHEC2+t9rcrdYxjPaQhaEALGK9/4fSGF94/yt9IQgBDV/JfoIxYQiAVd4GEIwGrHD9PrCEBAsG3hCAA8IQgBqdmP85h/9RJ2H9pH+Gf+of6GEImCKPZL/KP/ANQv/iJ2/Zv/ADB/0z/5CJCS/ZTOtMURYQIFh0hCABPMf7Yvdw3nU+ghCMaPL4LtCEoY4/p+cHhCAhP39I48oQgMSEIQA//Z',
		},
		likedByUsers: ['{minimal-user}', '{minimal-user}'],
		songs: [
			{
				id: 's1001',
				album: 'album1',
				title: 'The Meters - Cissy Strut',
				artist: 'Cissy Strut',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
				addedBy: '{minimal-user}',
				addedAt: 162521765262,
			},
			{
				id: 'mUkfiLjooxs',
				album: 'album2',
				artist: " The JB's ",
				title: ' Pass The Peas',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
				addedBy: {},
			},
		],
		isRecomended: true,

		msgs: [
			{
				id: 'm101',
				from: '{mini-user}',
				txt: 'Manish?',
			},
		],
	},
	{
		_id: 'd1005',
		isRecomended: true,
		name: 'liked songs',
		tags: ['Funk', 'Happy', 'Hip-Hop'],
		createdBy: {
			_id: 'u101',
			fullname: 'Puki Ben David',
			imgUrl: 'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png',
		},
		likedByUsers: ['{minimal-user}', '{minimal-user}'],

		songs: [
			{
				id: 's1001',
				album: 'album3',
				title: 'The Meters - Cissy Strut',
				artist: 'Cissy Strut',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
				addedBy: '{minimal-user}',
				addedAt: 162521765262,
			},

			{
				id: 'mUkfiLjooxs',
				album: 'album4',
				artist: " The JB's ",
				title: ' Pass The Peas',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
				addedBy: {},
			},
		],

		msgs: [
			{
				id: 'm101',
				from: '{mini-user}',
				txt: 'Manish?',
			},
		],
	},

	{
		_id: 'd1006',
		name: 'Subliminal radio',
		tags: ['Hip-Hop'],
		createdBy: {
			_id: 'u101',
			fullname: 'Puki Ben David',
			imgUrl: 'https://seeded-session-images.scdn.co/v1/img/artist/5tHvjw07aaiv3mZ6qJdKzb/en',
		},
		likedByUsers: ['{minimal-user}', '{minimal-user}'],

		songs: [
			{
				id: 's1001',
				album: 'album5',
				title: 'The Meters - Cissy Strut',
				artist: 'Cissy Strut',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
				addedBy: '{minimal-user}',
				addedAt: 162521765262,
			},

			{
				id: 'mUkfiLjooxs',
				album: 'album6',
				artist: " The JB's ",
				title: ' Pass The Peas',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
				addedBy: {},
			},
		],

		msgs: [
			{
				id: 'm101',
				from: '{mini-user}',
				txt: 'Manish?',
			},
		],
	},

	{
		_id: 'd1007',
		name: 'This is Eminem',
		tags: ['Hip-Hop'],
		createdBy: {
			_id: 'u101',
			fullname: 'Puki Ben David',
			imgUrl: 'https://thisis-images.spotifycdn.com/37i9dQZF1DZ06evO4gTUOY-default.jpg',
		},
		likedByUsers: ['{minimal-user}', '{minimal-user}'],

		songs: [
			{
				id: 's1001',
				album: 'album7',
				title: 'The Meters - Cissy Strut',
				artist: 'Cissy Strut',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
				addedBy: '{minimal-user}',
				addedAt: 162521765262,
			},

			{
				id: 'mUkfiLjooxs',
				album: 'album8',
				artist: " The JB's ",
				title: ' Pass The Peas',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
				addedBy: {},
			},
		],

		msgs: [
			{
				id: 'm101',
				from: '{mini-user}',
				txt: 'Manish?',
			},
		],
	},

	{
		_id: 'd1008',
		name: 'Top of 2020',
		tags: ['Pop'],
		createdBy: {
			_id: 'u101',
			fullname: 'Puki Ben David',
			imgUrl: 'https://lineup-images.scdn.co/wrapped-2020-top100_DEFAULT-en.jpg',
		},
		likedByUsers: ['{minimal-user}', '{minimal-user}'],

		songs: [
			{
				id: 's1001',
				album: 'album9',
				title: 'The Meters - Cissy Strut',
				artist: 'Cissy Strut',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
				addedBy: '{minimal-user}',
				addedAt: 162521765262,
			},

			{
				id: 'mUkfiLjooxs',
				album: 'album10',
				artist: " The JB's ",
				title: ' Pass The Peas',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
				addedBy: {},
			},
		],

		msgs: [
			{
				id: 'm101',
				from: '{mini-user}',
				txt: 'Manish?',
			},
		],
	},

	{
		_id: 'd1010',
		name: 'הליהיטים הגדולים של ישראל',
		tags: ['Pop'],
		createdBy: {
			_id: 'u101',
			fullname: 'Puki Ben David',
			imgUrl: 'https://i.scdn.co/image/ab67706f00000002d1e67ca86b9727635bd5bc69',
		},
		likedByUsers: ['{minimal-user}', '{minimal-user}'],

		songs: [
			{
				id: 's1001',
				album: 'album11',
				title: 'The Meters - Cissy Strut',
				artist: 'Cissy Strut',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
				addedBy: '{minimal-user}',
				addedAt: 162521765262,
			},

			{
				id: 'mUkfiLjooxs',
				album: 'album12',
				artist: " The JB's ",
				title: ' Pass The Peas',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
				addedBy: {},
			},
		],
		isRecomended: true,

		msgs: [
			{
				id: 'm101',
				from: '{mini-user}',
				txt: 'Manish?',
			},
		],
	},

	{
		_id: 'd1011',
		name: 'Tate we made it',
		tags: ['Hip-Hop', 'Workout'],
		createdBy: {
			_id: 'u101',
			fullname: 'Puki Ben David',
			imgUrl: 'https://i.scdn.co/image/ab67616d00001e022ab6f137693d0fcf542ecbe2',
		},
		likedByUsers: ['{minimal-user}', '{minimal-user}'],

		songs: [
			{
				id: 's1001',
				album: 'album13',
				title: 'The Meters - Cissy Strut',
				artist: 'Cissy Strut',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
				addedBy: '{minimal-user}',
				addedAt: 162521765262,
			},

			{
				id: 'mUkfiLjooxs',
				album: 'album14',
				artist: " The JB's ",
				title: ' Pass The Peas',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
				addedBy: {},
			},
		],

		msgs: [
			{
				id: 'm101',
				from: '{mini-user}',
				txt: 'Manish?',
			},
		],
	},

	{
		_id: 'd1041',
		name: 'Daily Mix 10',
		tags: ['Funk', 'Happy'],
		createdBy: {
			_id: 'u101',
			fullname: 'Puki Ben David',
			imgUrl:
				'data:image/jpeg;base64,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',
		},
		likedByUsers: ['{minimal-user}', '{minimal-user}'],

		songs: [
			{
				id: 's1001',
				album: 'album19',
				title: 'The Meters - Cissy Strut',
				artist: 'Cissy Strut',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
				addedBy: '{minimal-user}',
				addedAt: 162521765262,
			},

			{
				id: 'mUkfiLjooxs',
				album: 'album20',
				artist: " The JB's ",
				title: ' Pass The Peas',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
				addedBy: {},
			},
		],

		msgs: [
			{
				id: 'm101',
				from: '{mini-user}',
				txt: 'Manish?',
			},
		],
	},

	{
		_id: 'd1051',
		name: 'Daily Mix 21',
		tags: ['Funk', 'Happy'],
		createdBy: {
			_id: 'u101',
			fullname: 'Puki Ben David',
			imgUrl:
				'data:image/jpeg;base64,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',
		},
		likedByUsers: ['{minimal-user}', '{minimal-user}'],

		songs: [
			{
				id: 's1001',
				album: 'album22',
				title: 'The Meters - Cissy Strut',
				artist: 'Cissy Strut',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
				addedBy: '{minimal-user}',
				addedAt: 162521765262,
			},

			{
				id: 'mUkfiLjooxs',
				album: 'album23',
				artist: " The JB's ",
				title: ' Pass The Peas',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
				addedBy: {},
			},
		],

		msgs: [
			{
				id: 'm101',
				from: '{mini-user}',
				txt: 'Manish?',
			},
		],
	},

	{
		_id: 'd1061',
		name: 'Daily Mix 12',
		tags: ['Funk', 'Happy'],
		createdBy: {
			_id: 'u101',
			fullname: 'Puki Ben David',
			imgUrl:
				'data:image/jpeg;base64,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',
		},
		likedByUsers: ['{minimal-user}', '{minimal-user}'],

		songs: [
			{
				id: 's1001',
				album: 'album24',
				title: 'The Meters - Cissy Strut',
				artist: 'Cissy Strut',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
				addedBy: '{minimal-user}',
				addedAt: 162521765262,
			},

			{
				id: 'mUkfiLjooxs',
				album: 'album25',
				artist: " The JB's ",
				title: ' Pass The Peas',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
				addedBy: {},
			},
		],

		msgs: [
			{
				id: 'm101',
				from: '{mini-user}',
				txt: 'Manish?',
			},
		],
	},

	{
		_id: 'd1231',
		name: 'Daily Mix 13',
		tags: ['Funk', 'Happy'],
		createdBy: {
			_id: 'u101',
			fullname: 'Puki Ben David',
			imgUrl:
				'data:image/jpeg;base64,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',
		},
		likedByUsers: ['{minimal-user}', '{minimal-user}'],

		songs: [
			{
				id: 's1001',
				album: 'album26',
				title: 'The Meters - Cissy Strut',
				artist: 'Cissy Strut',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
				addedBy: '{minimal-user}',
				addedAt: 162521765262,
			},

			{
				id: 'mUkfiLjooxs',
				album: 'album27',
				artist: " The JB's ",
				title: ' Pass The Peas',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
				addedBy: {},
			},
		],

		msgs: [
			{
				id: 'm101',
				from: '{mini-user}',
				txt: 'Manish?',
			},
		],
	},

	{
		_id: 'd1201',
		name: 'Daily Mix 14',
		tags: ['Funk', 'Happy'],
		createdBy: {
			_id: 'u101',
			fullname: 'Puki Ben David',
			imgUrl:
				'data:image/jpeg;base64,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',
		},
		likedByUsers: ['{minimal-user}', '{minimal-user}'],

		songs: [
			{
				id: 's1001',
				album: 'album28',
				title: 'The Meters - Cissy Strut',
				artist: 'Cissy Strut',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
				addedBy: '{minimal-user}',
				addedAt: 162521765262,
			},

			{
				id: 'mUkfiLjooxs',
				album: 'album29',
				artist: " The JB's ",
				title: ' Pass The Peas',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
				addedBy: {},
			},
		],

		msgs: [
			{
				id: 'm101',
				from: '{mini-user}',
				txt: 'Manish?',
			},
		],
	},

	{
		_id: 'd1401',
		name: 'Daily Mix 15',
		tags: ['Funk', 'Happy'],
		createdBy: {
			_id: 'u101',
			fullname: 'Puki Ben David',
			imgUrl:
				'data:image/jpeg;base64,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',
		},
		likedByUsers: ['{minimal-user}', '{minimal-user}'],

		songs: [
			{
				id: 's1001',
				album: 'album30',
				title: 'The Meters - Cissy Strut',
				artist: 'Cissy Strut',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
				addedBy: '{minimal-user}',
				addedAt: 162521765262,
			},

			{
				id: 'mUkfiLjooxs',
				album: 'album31',
				title: ' Pass The Peas',
				url: 'youtube/song.mp4',
				artist: " The JB's ",
				imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
				addedBy: {},
			},
		],

		msgs: [
			{
				id: 'm101',
				from: '{mini-user}',
				txt: 'Manish?',
			},
		],
	},

	{
		_id: 'd1501',
		name: 'Daily Mix 16',
		tags: ['Funk', 'Happy'],
		createdBy: {
			_id: 'u101',
			fullname: 'Puki Ben David',
			imgUrl:
				'data:image/jpeg;base64,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',
		},
		likedByUsers: ['{minimal-user}', '{minimal-user}'],

		songs: [
			{
				id: 's1001',
				album: 'album32',
				title: 'The Meters - Cissy Strut',
				artist: 'Cissy Strut',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
				addedBy: '{minimal-user}',
				addedAt: 162521765262,
			},

			{
				id: 'mUkfiLjooxs',
				album: 'album33',
				artist: " The JB's ",
				title: ' Pass The Peas',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
				addedBy: {},
			},
		],

		msgs: [
			{
				id: 'm101',
				from: '{mini-user}',
				txt: 'Manish?',
			},
		],
	},

	{
		_id: 'd3001',
		name: 'Daily Mix 17',
		tags: ['Funk', 'Happy'],
		createdBy: {
			_id: 'u101',
			fullname: 'Puki Ben David',
			imgUrl:
				'data:image/jpeg;base64,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',
		},
		likedByUsers: ['{minimal-user}', '{minimal-user}'],

		songs: [
			{
				id: 's1001',
				album: 'album34',
				title: 'The Meters - Cissy Strut',
				artist: 'Cissy Strut',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
				addedBy: '{minimal-user}',
				addedAt: 162521765262,
			},

			{
				id: 'mUkfiLjooxs',
				album: 'album35',
				artist: " The JB's ",
				title: ' Pass The Peas',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
				addedBy: {},
			},
		],
		msgs: [
			{
				id: 'm101',
				from: '{mini-user}',
				txt: 'Manish?',
			},
		],
	},
]
const genres = [
	{
	  title: 'Hip-Hop',
	  imgUrl: 'https://i.scdn.co/image/ab67fb8200005caf9e3dea60be755ccd97b7351f',
	  backgroundcolor: 'purple',
	},
	{
	  title: 'Pop',
	  imgUrl: 'https://i.scdn.co/image/ab67fb8200005cafa862ab80dd85682b37c4e768',
	  backgroundcolor: 'green',
	},
	{
	  title: 'Rock',
	  imgUrl: 'https://i.scdn.co/image/ab67fb8200005cafae7e69beb88f16969641b53e',
	  backgroundcolor: 'red',
	},
	{
	  title: 'Workout',
	  imgUrl: 'https://i.scdn.co/image/ab67706f000000029249b35f23fb596b6f006a15',
	  backgroundcolor: 'grey',
	},
	{
	  title: 'Instrumental',
	  imgUrl: 'https://i.scdn.co/image/ab67706f000000028ed1a5002b96c2ea882541b2',
	  backgroundcolor: 'lightblue',
	},
	{
	  title: 'Electronic',
	  imgUrl: 'URL',
	  backgroundcolor: 'pink',
	},
	{
	  title: 'R&B',
	  imgUrl: 'URL',
	  backgroundcolor: 'orange',
	},
	{
	  title: 'Country',
	  imgUrl: 'URL',
	  backgroundcolor: 'blue',
	},
	{
	  title: 'Classical',
	  imgUrl: 'URL',
	  backgroundcolor: 'teal',
	},
	{
	  title: 'Jazz',
	  imgUrl: 'URL',
	  backgroundcolor: 'brown',
	},
	{
	  title: 'Indie',
	  imgUrl: 'URL',
	  backgroundcolor: 'lime',
	},
	{
	  title: 'Metal',
	  imgUrl: 'URL',
	  backgroundcolor: 'gold',
	},
	{
	  title: 'Reggae',
	  imgUrl: 'URL',
	  backgroundcolor: 'cyan',
	},
	{
	  title: 'Blues',
	  imgUrl: 'URL',
	  backgroundcolor: 'indigo',
	},
	{
	  title: 'Folk',
	  imgUrl: 'URL',
	  backgroundcolor: 'magenta',
	},
	{
	  title: 'Latin',
	  imgUrl: 'URL',
	  backgroundcolor: 'lightcoral',
	},
	{
	  title: 'Dance',
	  imgUrl: 'URL',
	  backgroundcolor: 'lightseagreen',
	},
	{
	  title: 'Alternative',
	  imgUrl: 'URL',
	  backgroundcolor: 'tomato',
	},
	{
	  title: 'Soul',
	  imgUrl: 'URL',
	  backgroundcolor: 'royalblue',
	},
	{
	  title: 'Reggaeton',
	  imgUrl: 'URL',
	  backgroundcolor: 'darkorange',
	},
	{
	  title: 'Punk',
	  imgUrl: 'URL',
	  backgroundcolor: 'sienna',
	},
	{
	  title: 'K-Pop',
	  imgUrl: 'URL',
	  backgroundcolor: 'orchid',
	},
	{
	  title: 'Acoustic',
	  imgUrl: 'URL',
	  backgroundcolor: 'cadetblue',
	},
	{
	  title: 'Chill',
	  imgUrl: 'URL',
	  backgroundcolor: 'peru',
	},
  ];
  
  

function getEmptyStation() {
	return {
		//  name: prompt('playlist name?'),
		name: 'playlist',
		id: utilService.makeId(),
		createdBy: {
			imgUrl:
				'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDw8PDw8PDRAPEA8PEBAPDg8QDQ8PFhYXFxYSFhYZHikhGRsmHBYWIjIiJiosLy8wGCA1OjUtOSkuLzkBCgoKDg0OGBAQGC4gICAuLi4uLi4uLi4uLi4uLi4uLC4uLi4uLC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLv/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAAAQIGAwUHBAj/xABKEAABAwIDBAYFCAUJCQAAAAABAAIDBBEFEiEGEzFBUVJhcYGRBxQiI6EyQmJykrHB0TOCsrPwNTZDU2NzdKLhFRYkJpPC0uLx/8QAGwEAAgMBAQEAAAAAAAAAAAAAAAECAwQFBgf/xAAzEQACAgECBAMFCAIDAAAAAAAAAQIDEQQhEjFBUQVh8BNxkbHRIjJCUoGhwfEV4RQzNP/aAAwDAQACEQMRAD8Ave7b1W+QT3Teq37IUguUbVY7U4hNPDTYhS4dT08roMslQ+KoqHt+U+zGlxZe4HLTpU2cmuDm+Z1XdN6rfshG7b1W+QXGMJnxSgzVFPXU+JwxAyVMEdaZbRNBzOLJLObwPtNF+8LsVBVsnhinjN2TRslZfQ5XAEX7dUJjsrcOuTLu29VvkEbtvVb5BQq6qOFhfK9sbBxc42Hd2nsVXrtvIWkiGF8v0nndsPcLE+YCjKcY82Sqott+4m/XfkWvdt6rfII3beq3yCow2+l500dugPffzsthR7dQOsJYpIu1pEjB9x+BVavrfUuloNTH8Ofc0/ky07tvVb5BG7b1W+QWGir4Z25oZI5RzynUd44jxXoVuzMj4k8Mju29UeQT3beqPIKSEYFlkd23qt8gnu29VvkE008BlkN23qt8gjdt6o8gpoSDLIZG9UeQQQ0ch5BTKwFNJCcmhm3Jo8gqvtztSzD4srAx1VKDumEAhg4b146ByHM+Kx7Y7bQ0IMUWWeqI0YDdkX0pCP2eJ7BquN11ZLPI+aZ5kkkN3OdxPZ2AdHJDwaKKZTfFLl8zZUm0czf0nv7kklxs8km5JPNbzDsbhmIbcxvPBr+Z7DwKpSAeY+HG6yWaWufTD9dDtVay2HXK8zpYCkAtdgNfv4gSfbb7L+09PitmAuNZFxk4s7kJqcVJdSTQpgJNCkFTJkxtCyAKLQsjQqpMY7ITsmq8gXwLiWLzT4NW1jHtqd1UymaF0NR6u17CXG5cGFxIzAWBFrHjcLtqwVtFDOzdzxRzsOuSVjXtv02PNeyayeCqs4M5WUzhVfjkmJMZSxRTTTyyNaxs+5qXsHHNHPka9nCxDswtc3C7AKiPC6CnjkdvDDDHC0DQyyNaAbdAvr2Beyjwujow98MEFMMpMj44mMOUa6kC5AXNNocWdWTukNwwezE3qs/M8T/oqrbPZrzZu09K1UuFLEY7vz8jHiuKzVUm8ldfjlYNI2DoaPx4leMKIUlz28vJ34RUUklhIEBCYCRMywSuY4PY5zHDg5pLXDxCtWE7ayss2pbvm9dtmzDv5O+CqaAnCcoPMWV26eu5Yms+ujOtYdi9PUD3UrXHqH2ZB+qdV7lxn+O1bSkx+si0bO9w6H+8H+a61R1f5kcq3wd865fo/qvodSQqDDtpVD5TIX/qPB+Dll/33n/qYf8AP+asWqrMr8K1PZfFF6TC5/JtlVO4CFncxxPxK19VjVVLo+d5HQ1xY3ybZQlrILkmy2Hg98vvNL9/ki941jtLSMc+aUDLqWM9uX7I/Gy5ntJ6Q6icGOlBpIzoX3BqXDvGjPC57V5sUbeCUfRJ/H81VJFKq9zXYsn4fXQ1n7T8/oYwNbnUkkknUkniSV6GsCwhZInA6XRIvrxkxVDADosNl66qMjVeMlWQexXdHE2bTAK7dStuTlcQCOWv+n3BX4LlzDYjlqF1GPgO4Lm+IxScX3ydHw2bcZR7E2qYCQUmrlNnTJtCyAKDQphUyYAhNCrAvaEIC9sfPSp+kHE8kTKdps6b2n/3TTw8Xfslc9W22prt/WTPvdrHbpn1WafE3PitUAubdLik2ep0dPsqYrq9372SCE0gqjYSTQE0hoLJhJSCRIAmhSCGMApBJMKJJDAUklIKIxvYCCOkEHuKos0Za8t6CR362V8CqWLMyzSd5I8dfxWnSSw5Iw6+GYxZ4pIiGg/wEoWL0l/s8eA4LHGOa18TxhmV1xUlg9LRduq8LYuLuTeIXuDlhe/Lx6b99gq4vHIvtjF4b6GAe1IzicxGnPiulR6gHjfVUPZ6n3tQCRoxpdpy5fir7GywAWPXyWYx7fyX6CLxKfd/ImAptUQsjQuWzoE2rIoNUwqGwFZCkhQyBeF5MWq9zTzS844nOH1rez8bL1qs+kCqyUgjHGWVrf1W+0fiG+a9rOXDFs8HRX7S2Me7/v8AY5wFIJJhcs9cNMJISY0SUgkEKJIaYUVIIGSTCAmEiQBSSCkFEkhhTCgFMKIyQVa2jPvBpqBa/IjkfjZb+qrI4heR7W9l7uPc0alVTFMW3zrBoawHmBnd2k8u5aNLCTlxY2MetsgocOdzxNf4+C9VObheYcVlbJYrdLyMFUsNZZnuvNWOv4LKTdKRl2nuVcdmXWZnFpHjZI5pu1zmnpaSD8Fb9m9oDIRDORn4MfoM/wBE9v3qmoVt1EbY8MjJRfOqXFH4HWQsgVP2e2mtlhqXaaBsp5dAf/5efSri1ed1FE6ZYl/Z6Cm6NseKJMKTVELIFjbLRoQhQAu6576RKvNURxDhFHc/Webn4BvmugucACSbAAkk8ABxK49i1YZ55Zj/AEj3OHY3g0eQC9hqZYjjueQ8Kr4rXP8AKv3e3yyeVSUVJYT0IgplRCkosaGiyEwkSQwmkE0DJBMJBNRJDCaSkkSRCeZsbS95s1upP4d6rtfj8j7iL3TenTeHx5eC2GO4kxjTFYSPcNQfktHSe3sVVW3S0prikvcczWaiSfBB+8bnEkkkkniSbk+KSELec0kzVZmiywNWS6hImmeprtFjqZNLDmse8WNx5qqMNy6V32cIghCFeZgV12Sxxm63M8jWOYbRl5sHM6uY6XH3KlIVOoojdDhkXUXyplxROwsIIuNQdQRwI6Vkaub7ObQupSI33fATqPnR/Sb2dI8l0eNwIBBBBAII4EHgV5rV6WdEt90+T9cju6fURujlc1zRNNJCx7mg2e3WKbmm3LT7youztEXzz48PErmq9uNYm+rndM/S+jG8mMHBv8cyV4l6e2fHLJxtHp/Y1KL5vd+//QKSiFJVGtEgmohSSY0NAQE1EkhhMJJoGNSSCaiSGFJqiFGpm3cb39VpPjbT4pYzsPOFkpdffey3NzvH6+JWBMknU6k6nvSXbSxsecby8ghCECGEwVEIRjIGQlQJSTQkDYkIQUACEIQA1cdhsZOb1SQ3FiYSeItclnda5HcexU5b/YmmL6xr7aRNe8noJGUfefJZdbCEqJ8fRZ/XoaNJKUbo8PX5HRkJoXkT0eCjhCAmvSmAYTSCkojGE0gmEhjTSCaiSQBSUQpIGSCaQTUSQwvFjlvV5Lm3C3acwNl7QtNtSDkiN9M5Fu23H4HzVlSzZEq1DxVJ+RW0IQuscEEIQgAQUIQAIQhAAhCEACEIQA1a/R88CadpOro2EDpDXG/3hVQK0bA0+aeWS/6OMNt0l5/9Ssmvx/x557GnR59tHHrYvl0k0l5M9IUoJpBNejOcSCaQTSGNMJBNIYKQUVJImgUlJsTjwa49wJSc0jiCO8WSAApKITCiSJBV3aOta8iJuu7cS53K9rZQrGFRqu+8kvxzPv35itWkgnJy7GLXTagkupiQhC6ByQQhCABCEIAEIQgAQhBQAIQgIAatfo/faaZvJ0TSe9rtP2iqpZWv0fM97O7qxsH2nX/7Vk1//nn7v5Rp0f8A3x9dC8pKSF5M9JsUgKSiE16Q5w1JRXsw3Dpal+7hYXnmeDGDpceQS5iclFNvkjzBb7CNlamos4jcRn50gOYj6LOJ8bBW3Atloaaz32nm45nD2GH6DfxOvct8tMNN1mcjUeK9Kfi/4X1K/Q7HUkdi8OqHdL3EM+y38brc09DDHpHFDH9SNrfuC9AQtUYRjyRybL7LPvybGkRfjr3oQplWEeOowqmk+XBC7t3bQ7zGq1NZsdTP1jL4T2HOzydr8VYk1XKuEuaL69TbX9yTX67fB5RzvENlKmLVoE7RzjuX27WcfK65TWX3st9CJH3HMHMV9LvOi0O0Gy9HXj38YElrNmjs2dv63MdhuFGuhQbcepql4lOxJWLl1X0/o4ChWjanYmqoM0g/4inGu9YPaYP7Rnze8XHcqurCyMlJZTBCEIJAhCEACEIQAIQkgBoQEIAas2wUtqiRvWiJ+y4fmVWVcPR/St99N84ERDsbYOJ8dPJZNc0tPPPrc1aNN3RwXNJJNeU4UeiwUsKS92GYPUVJ9zGXDm8+zEO9x/DVXnA9joYLPmtUSDUAj3DD2N+ce0+S9PCuUuRxb9ZVSvtPL7LmVrZ7ZWWptJJeGHjmI95IPoA8u0/FdCoKGKnYI4WBjR0cSelx5lehaDC9rYKitmoN3NBUQ5iWzNYGyBtr5C1xvoQ7tGq2V1RhyODqNTbqM55LouS+vvN+haKPaqB+IOw2Nk0szG5pHsDNxEAATmcXX0uBoOJAW9VhmcWuY0JhCBCQhCBAmhCAIScFBSk5KKkiD5gQuc7Z+jsPzVGHtDX6l9MLBj+kxdU/R4HlZdGUo+KbJ12Sg8xPnTFMKkpsmf5w10sWPHymHuWuXctvNkxiEeaEiOoju5t9I5ja2V/Qeh3ndcUqqeSJ74pWOjkYcr2OFnNP8c1TBSS+0dVXV2bwWPIwoCLoUiQJJpWQAIQmgAQE0WQAK9bAstBK7rTEDuDGfiSqKPPsHEldSwSj3FPFFza27vruN3fE/Bc7xOaVPD3f9nQ8Ohm3i7L5nuQhC86drBfALAAaAcAOAQhC9ofPgXPPSnhzoDBi9M4RT0r2MeeuwmzCRzsSWkcw7sXQ1pdscEdiFFJSse2IvdG7O4EgZXB3AdyGWVy4Zpv0jn0FRJhGDiuaQ+uxSRrt84B+7Y8OeDrxNrnX5z9b2XqxWrxjBvV6uqrW1sUsgjngLdGuILi1psOQdYi2oGlirViWyDKnC4MPlks+njhEczW3DZY2Zb5TxBFxbtWih2ExCokgbieIMqaWmcCyKPMXSAaAPJa3UgAEnMbEi+t0jRGyL3k1zefNdMHtw7G6h+0NVSGVxpmU7ZGRWblDjHC697X4vcePNaul2jrS7aMGdx9S3/q2jPc5ZZQLaa6NHG/BbXaLY2qkr/8AaOH1baWZ7WslztJFg0MuNCD7Ib7JHFt7rDhGwE8EWJsfVsnfiEWTeFjg4PJcS9wub3LroI5rxnK5L5oPR1Ni1WIq2qqWPpTHKxsVrSyODi3eOs23EHny4K+rU7JYQ6hooKVz2yOiDwXtBDTme5wsD9ZbZNFNklKTxyGhJCCsjIoKcnBQUkRlzBAPFCExAq1tjslDiLL6RVLBaOa3EdR/S34jlzBsqEDjJxeUfO1bg1TBK6GWJzHscG2Nsrifk5DwcDysvAQRoRYjQg6EHoX0Hj+Bw1seSS7Xt1jlZpJE7pB6Oz/6uJ7TYBU0MxbUNuHucWTNvupeeh5O6WnXvGqgzp03KxdmadCAhIuBNJNAAhCEDyb/AGNoRLUF7tWwBr7dLzfL5WJ8Ar+CqZsCfbqR9GE/GT81cQvPeJSbuafRI7vh8UqU11yZLoUboXPwbS/IQheyPnoIQuU4jDX12OV1HBiFTRsjYJWhk0wjADYgWhjXAC5fdDZOuHHnfGDq6S5rheMYjheIwUGIz+uQVOVsMxuXNc45WnMRf5VgQ69r3B6bPjW3GHUUpgmmO9bbO2ONz8l+TiNAezijJKVUspLfPYsiFSducQpqnDoJ2Yg+khknYWTwsldnOV/u3NYQ4WsTrwLRda+trpWbQ0MYmmfD6lnczM+0hEMxzFg0LjYHhxSyONTa59+nY6OktVg20lHWxSTU8ueOEkSFzXMyWbmuQ4A2tz7CsmBY3T10ZmpnOfG15ZmdG9gLgASBmAvxCZW4tZ25GxQSuJ021lVT4zM6WpqH0ja6eCRj5nugjjc97R7JNhlAuLdRWv0sY7NBDBTUz5GT1Dy8uhc5sgiZ0FpuLkjwaUZLXQ1KMe5fXG6S5TQ1bp8AElViFRTn1wg1B3s73W4Rusc2Xnx4gK8U+0VJFJS0Uk7zNLFDunyxvbvw5vsvzWy3cRw6dE0yudLXLfn07G+QtXh+P0tTPNTQPMslPfe5Y37thBtbPbKTe+l+R6Cqx6S8ZxGCGVtNA6OANjMla2UB7MzgCxgBBab2GbXie9NshGqTko8i9oWl2LnfJh1G+R7pHuhaXPe4ue466knUlbpMjJYbQLBXUcU8bopo2yxvFnMeLtP5HtWdCBHJtp/RrLFeWhJnj4mBxG/Z2NPB48j3qhSsc1xa5rmOabOa4Fr2noIOoX0stXjWz9JWi1TAyQgWD9Wyt7ntsfDgo8Jrr1TX3tz56TXT8T9FTSSaWqLR1J2B3hnbb7itBP6NsTadGwSjpZPb4OASwzUr63+Ip6Fa2ejzFD/Qxt7XTxW+BK99J6La136WanhH0TJK7ys0fFAO6tfiRrdhB72c/wBmzTpu4/db4q6NBNgBcnkNSVstl9gKekzudLJUOeGB1wI2aX4Aa8+lW2mpI4haNjGdw1PeeJXL1Ohlda5ZwtvNm6nxaumpRjFye/kvX6FJ9Qn/AKmX/pv/ACQr4hR/xcPzMj/nbPyL4sxIQhdY4ILk7sep8P2kxCepLmsdCIwWNznMWwEaDsaV1heaXDoHkufBC9x4udDG5x7yRqgsrmo5TWco5g+vdj2LUb6aKRlLQua98r220a8PN7GwzZWtA48T02w1+MZqvFoxJSYOGmVjx6m2SqrtXgj2uLnHXQfPHG111yKJrAGsa1jRwa1oa0dwCwSYZTvlbO6CF8zfkyuijMreWjyLhLBYro/l2S29M4fVH/lmn7MUd+6kVtqP5zYb/gW/uZl0T/Z8GTd7iHJfNk3UeTNa2bLa17c1J9PHmD93HvALNfkbnaOFg61wNSjASvW+3f8AfBx7bakqMOrauCk/RYwwNDBb5bpBnYO25cOjLL2LqWz2FtoqSClbY7pgDiNA+Q6vd4uJK0kmzU82MNxCofC6CCPLTRNc8yNcBo54LQOLnu0PHKrYpRRC63ijGK7b+/8A0ccpMG9ddtJEG5pGVBmh0F96yWcgDtIzN/WUdkhLiL6quqPaFDhrqaI66v3L2g35m28ce14XX4qaNhc5kbGOebvLWNa5543cRx4nzSipY2NLWRxsa6+ZrWNa119DcAaowN6nZ4XbHlssnGXfzWH+P/Nb7b90c1NhVHDGZa+RsDoMjgHxMLACSeQJA6LZCb6Lo3qMOTd7mLJfNk3TN3m6ctrX7VJtJEHB4ijDwLB4jYHgWtYOte1tEYD26znHJt/EpPokqoBTS0gZuquCV5qWu/SPJdYP8LZbciO1bL0n/wAkVfdD+9jVlZSxh5kEcYeb3eGNEhvxu61ysk0TXtLXta9p4tc0OaeeoKMbYK3YvaKfnk0Wwn8l0P8AcM/Fb9Rjja0BrWhjRoGtAa0DoAHBSUkVyeW2CEIQRBCEIAEIQgAQhCAM0PDxU1CPgFkVb5lqEhCEhmJCEKREEIQgAQhNAAsRKyrEU0KQIQhSIAhCEACAjKVLKUhiQhCAG1l0OFkNda6bRzKQyKSaExCQnZSLQQOlGQwQQhCYAhCECM0fAKahHwCmqy1AhCEYAxIQhMQIQhADQUIQALG7ihCkiMhIQhMiClHxQhMaMiRQhVljMaEIUisFk+b4IQiRJGNCEIIggIQgBIQhNACEIQIzt4DwUkIVZagQhCAP/9k=',
		},
		songs: [
			{
				id: 's1001',
				album: 'album1',
				title: 'The Meters - Cissy Strut',
				artist: 'Cissy Strut',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
				addedBy: '{minimal-user}',
				addedAt: 162521765262,
			},
			{
				id: 'mUkfiLjooxs',
				album: 'album2',
				artist: " The JB's ",
				title: ' Pass The Peas',
				url: 'youtube/song.mp4',
				imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
				addedBy: {},
			},
		],
	}
}

createStations()
async function createStations() {
	const stationsFromStorage = await stationService.query(STORAGE_KEY)
	if (!stationsFromStorage || !stationsFromStorage.length) {
		storageService.save(STORAGE_KEY, stationsDemo)
	}
}
createGenres()
async function createGenres() {
	const genresFromStorage = await stationService.query(GENRE_KEY)
	if (!genresFromStorage || !genresFromStorage.length) {
	}
}
storageService.save(GENRE_KEY, genres)
async function getGenres() {
	const genres = await storageService.query(GENRE_KEY)
	return genres
}

async function query(filterBy = { txt: '' }) {
	console.log('====================================')
	console.log(filterBy)
	console.log('====================================')
	var stations = await storageService.query(STORAGE_KEY)
	if (filterBy.txt) {
		const regex = new RegExp(filterBy.txt, 'i')
		stations = stations.filter((station) => regex.test(station.vendor) || regex.test(station.description))
	}
	if (filterBy.isRecomended) {
		stations = stations.filter((station) => station.isRecomended === true)
	}
	if (filterBy.genre) {
		stations = stations.filter((station) => station.tags.includes(filterBy.genre))
	}

	return stations
}

function getById(stationId) {
	return storageService.get(STORAGE_KEY, stationId)
}

async function remove(stationId) {
	// throw new Error('Nope')
	await storageService.remove(STORAGE_KEY, stationId)
}

async function save(station) {
	var savedStation
	if (station._id) {
		savedStation = await storageService.put(STORAGE_KEY, station)
	} else {
		// Later, owner is set by the backend
		// station.owner = userService.getLoggedinUser()
		savedStation = await storageService.post(STORAGE_KEY, station)
	}
	return savedStation
}

async function addStationMsg(stationId, txt) {
	// Later, this is all done by the backend
	const station = await getById(stationId)
	if (!station.msgs) station.msgs = []

	const msg = {
		id: 'd1001',
		by: userService.getLoggedinUser(),
		txt,
	}
	station.msgs.push(msg)
	await storageService.put(STORAGE_KEY, station)

	return msg
}
