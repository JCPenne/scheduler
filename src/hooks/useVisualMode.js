import { useState } from 'react';

export function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  function transition(newMode, replace) {
    if (replace) {
      setMode(newMode);
      setHistory((prev) => prev)
    }
    else {
      setMode(newMode);
      history.push(mode)
    }
  }
  function back() {

    if (history.length > 1) {
      setMode(history.at(-1))
      history.pop()
      console.log(`back`, history);
    }
  }

  return { mode, transition, back };
}
