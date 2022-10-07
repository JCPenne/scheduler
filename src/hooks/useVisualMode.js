import { useState } from 'react';

export function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  function transition(newMode, replace) {
    if (replace) {
      setMode(newMode);
      setHistory(prev => prev);
    } else {
      setMode(newMode);
      const newHistory = [...history].push(mode);
      setHistory(newHistory);
    }
  }
  function back() {
    if (history.length > 1) {
      setMode(history.at(-1));
      const newHistory = [...history].pop();
      setHistory(newHistory);
    }
  }

  return { mode, transition, back };
}
