import React from 'react';
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TabsV3 from './pages/visits/TabsV3';
import TabsV4 from './pages/visits/TabsV4';
import VisitBuilderV3 from './pages/visits/VisitBuilderV3';

const App: React.FC = () => {
	return (
		<Router>
			<div className="min-h-screen flex flex-col">
				<main className="flex-grow">
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/visits/tabs-v3" element={<TabsV3 />} />
						<Route path="/visits/tabs-v4" element={<TabsV4 />} />
						<Route
							path="/visits/builder-v3"
							element={<VisitBuilderV3 />}
						/>
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</main>
			</div>
		</Router>
	);
};

export default App;
