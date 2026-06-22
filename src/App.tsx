import React, { useEffect, useState } from 'react';
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import TabsV3 from './pages/visits/TabsV3';
import TabsV4 from './pages/visits/TabsV4';
import VisitBuilderV3 from './pages/visits/VisitBuilderV3';

const App: React.FC = () => {
	const [authed, setAuthed] = useState<boolean | null>(null);

	useEffect(() => {
		fetch('/api/me').then(r => setAuthed(r.ok));
	}, []);

	if (authed === null) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<span className="text-gray-400 text-sm">Loading...</span>
			</div>
		);
	}

	if (!authed) {
		return <Login onLogin={() => setAuthed(true)} />;
	}

	return (
		<Router>
			<div className="min-h-screen flex flex-col">
				<main className="flex-grow">
					<Routes>
						<Route path="/" element={<Dashboard onLogout={() => setAuthed(false)} />} />
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
