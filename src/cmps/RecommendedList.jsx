import { Link } from 'react-router-dom'
import { RecommendedPreview } from './RecommendedPreview'
import { useSelector } from 'react-redux'
import { utilService } from '../services/util.service'

export function RecommendedList({ onPlayStation, recommended }) {
	const user = useSelector((storeState) => storeState.userModule.user)
	const bgc = useSelector((storeState) => storeState.stationModule.bgc)
	

	return (
		<section style={{backgroundImage:`linear-gradient(180deg, ${bgc}, transparent)`}} className="recommended-container">
			<h3 className="greeting">{utilService.getGreetings()}</h3>
			<section className="recommended-list">
				{user && (
					<Link key={user._id} to={`/likedsongs`}>
						<RecommendedPreview onPlayStation={onPlayStation} station={user.likedSongs} />
					</Link>
				)}

				{recommended.map((station, idx) => (
					<Link key={idx + 1} to={`station/${station._id}`}>
						<RecommendedPreview onPlayStation={onPlayStation} station={station} />
					</Link>
				))}
			</section>
		</section>
	)
}
