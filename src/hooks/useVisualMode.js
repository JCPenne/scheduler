import { useState } from 'react';
/**
 * Handles state transitions across Appointment components to show the correct state at each step.
 * @param {String} initialMode
 * @returns Object
 */
export function useVisualMode(initialMode) {
	const [mode, setMode] = useState(initialMode);
	const [history, setHistory] = useState([initialMode]);
/**
 * Updates State, handling whether to replace current state with new state, or push into a new state array
 * @param {String} newMode 
 * @param {Boolean} replace 
 */
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
