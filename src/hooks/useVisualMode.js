import { useState } from 'react';

export function useVisualMode(initialMode) {
	const [mode, setMode] = useState(initialMode);
	const [history, setHistory] = useState([initialMode]);

	function transition(newMode, replace) {
		const newHistory = [...history];

		if (replace) {
			newHistory.pop();
		}

		setMode(newMode);
		newHistory.push(newMode);
		setHistory(newHistory);
	}
	function back() {
		if (history.length === 1) {
			return;
		}

		const newHistory = [...history];
		newHistory.pop();
		setHistory(newHistory);

		setMode(newHistory.at(-1));
	}

	return { mode, transition, back };
}
