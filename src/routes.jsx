import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { StationIndex } from './pages/StationIndex.jsx'
import { ReviewIndex } from './pages/ReviewIndex.jsx'
import { ChatApp } from './pages/Chat.jsx'
import { AdminApp } from './pages/AdminIndex.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
	{
		path: '/',
		component: <HomePage />,
		label: 'Home 🏠',
	},
	{
		path: 'baba',
		// component: <BabaIndex />,
		label: 'Meet our Babas',
	},
	// {
	//     path: 'survey',
	//     component: <SurveyIndex />,
	//     label: 'Take our survey'
	// },
	{
		path: 'car',
		component: <StationIndex />,
		label: 'Cars',
	},
	// {
	//     path: 'review',
	//     component: <ReviewIndex />,
	//     label: 'Reviews'
	// },
	// {
	//     path: 'chat',
	//     component: <ChatApp />,
	//     label: 'Chat'
	// },
	// {
	//     path: 'about',
	//     component: <AboutUs />,
	//     label: 'About us'
	// },
	// {
	//     path: 'admin',
	//     component: <AdminApp />,
	//     label: 'Admin Only'
	// }
]

export default routes
