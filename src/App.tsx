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
	const res = await fetch('/api/me');
	if (res.ok) return res.json();

	const devRes = await fetch('/api/auth/dev-available');
	if (!devRes.ok) return null;

	const { available } = await devRes.json();
	if (!available) return null;

	const loginRes = await fetch('/api/auth/dev-login', { method: 'POST' });
	if (!loginRes.ok) return null;
	return loginRes.json();
}

async function fetchDevUserName(): Promise<string | null> {
	const res = await fetch('/api/auth/dev-available');
	if (!res.ok) return null;
	const { available, userName } = await res.json();
	return available ? userName : null;
}

const App: React.FC = () => {
	const [user, setUser] = useState<User | null>(null);
	const [devUserName, setDevUserName] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [authError] = useState(readAuthError);

	useEffect(() => {
		fetchCurrentUser()
			.then(setUser)
			.finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		if (user) return;
		fetchDevUserName().then(setDevUserName);
	}, [user]);

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<span className="text-gray-400 text-sm">Loading...</span>
			</div>
		);
	}

	if (!user) {
		return (
			<Login
				error={authError}
				devUserName={devUserName}
				onDevLogin={setUser}
			/>
		);
	}

	return (
		<Router>
			<div className="min-h-screen flex flex-col">
				<main className="flex-grow">
					<Routes>
						<Route
							path="/"
							element={<Dashboard user={user} onLogout={() => setUser(null)} />}
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
