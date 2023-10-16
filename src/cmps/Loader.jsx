import { ThreeDots } from 'react-loader-spinner'

export const LoaderService = {
	threeDots: (
		<div className="loading-container">
			<div className="loader-wrapper">
				<ThreeDots height={80} width={80} radius={9} color="#1ed760" ariaLabel="three-dots-loading" visible={true} />
			</div>
		</div>
	),
}
