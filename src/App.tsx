import React, { useEffect, useState } from 'react';
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
import type { User } from './types';

function readAuthError(): string | null {
	const params = new URLSearchParams(window.location.search);
	const error = params.get('auth_error');
	if (error) {
		window.history.replaceState({}, '', window.location.pathname);
	}
	return error;
}

async function fetchCurrentUser(): Promise<User | null> {
	const res = await fetch('/api/me', { credentials: 'include' });
	if (res.ok) return res.json();
	return null;
}

async function fetchDevUserName(): Promise<string | null> {
	const res = await fetch('/api/auth/dev-available', { credentials: 'include' });
	if (!res.ok) return null;
	const { available, userName } = await res.json();
	return available ? userName : null;
}

const App: React.FC = () => {
	const [user, setUser] = useState<User | null>(null);
	const [devUserName, setDevUserName] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [authError, setAuthError] = useState(readAuthError);

	useEffect(() => {
		fetchCurrentUser()
			.then(setUser)
			.finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		fetchDevUserName().then(setDevUserName);
	}, []);

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<span className="text-gray-400 text-sm">Loading...</span>
			</div>
		);
	}

	return (
		<Router>
			<div className="min-h-screen flex flex-col">
				<main className="flex-grow">
					<Routes>
						<Route
							path="/"
							element={
								<Dashboard
									user={user}
									devUserName={devUserName}
									authError={authError}
									onClearAuthError={() => setAuthError(null)}
									onLogin={setUser}
									onLogout={() => setUser(null)}
								/>
							}
						/>
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
