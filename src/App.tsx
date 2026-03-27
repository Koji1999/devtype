import { useState, useEffect, useRef } from "react";
import { useTimer } from "./hooks/useTimer";
import { fetchSnippet } from "./utils/github";
import LanguageSelector from "./components/LanguageSelector";
import CodeDisplay from "./components/CodeDisplay";
import StatsBar from "./components/StatsBar";

type GameState = "idle" | "active" | "finished";

export default function App () {
  const [snippet, setSnippet] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [position, setPosition] = useState(0);
  const [errors, setErrors] = useState(0);
  const [errorPositions, setErrorPositions] = useState<Set<number>>(new Set());
  const [isError, setIsError] = useState(false);
  const [totalKeyPresses, setTotalKeyPresses] = useState(0);
  const [gameState, setGameState] = useState<GameState>('idle');
  const { time, start, stop, reset } = useTimer();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function load() {
      const result = await fetchSnippet(language);
      setSnippet(result)
    }
    load();
  }, [language]);

  const handleKeyPress = (key: string) => {
    const ignoredKeys = ['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    if (ignoredKeys.includes(key)) return;

    if (gameState === 'idle' && key !== 'Backspace') {
      setGameState('active');
      start();
    }

    if (key === 'Backspace') {
      if (isError) {
        setIsError(false);
      }
      return;
    }

    if (isError) return;

    if (key === 'Tab') {
      if (snippet[position] === ' ' && snippet[position + 1] === ' ') {
        setTotalKeyPresses(t => t + 2);
        setIsError(false);
        setPosition(p => p + 2);
        if (position + 2 === snippet.length) {
          stop();
          setGameState('finished');
        }
      } else {
        setErrors(e => e + 1);
        setErrorPositions(prev => new Set([...prev, position]));
        setIsError(true);
      }
      return;
    }

    const effectiveKey = key === 'Enter' ? '\n' : key;

    setTotalKeyPresses(t => t + 1);

    if (snippet[position] === effectiveKey) {
      let newPosition = position + 1;
      if (effectiveKey === '\n') {
        while (newPosition < snippet.length && snippet[newPosition] === ' ') {
          newPosition++;
        }
      }
      setIsError(false);
      setPosition(newPosition);
      if (newPosition === snippet.length) {
        stop();
        setGameState('finished');
      }
    } else {
      setErrors(e => e + 1);
      setErrorPositions(prev => new Set([...prev, position]));
      setIsError(true);
    }
  }

  const handleReset = (lang?: string) => {
    stop(); // stopping before reset to stop the interval
    reset(); // moved up before the setGameState because the timer keeps going after previous game
    setPosition(0);
    setErrors(0);
    setErrorPositions(new Set());
    setIsError(false);
    setTotalKeyPresses(0);
    setGameState('idle');
    fetchSnippet(lang ?? language).then(setSnippet);
    inputRef.current?.focus();
  };

  const minutes = time / 60;
  // if time is 0 just show 0, it was changing even after clicking reset
  const wpm = time > 0 ? Math.round((position / 5) / minutes) : 0;
  const cpm = time > 0 ? Math.round(position / minutes) : 0;
  const accuracy = totalKeyPresses > 0
    ? Math.min(100, Math.round(((totalKeyPresses - errors) / totalKeyPresses) * 100))
    : 100;
  return (
    <div
      className="min-h-screen bg-gray-100 flex flex-col items-center py-16 px-4"
      onClick={(e) => { if (!(e.target instanceof HTMLSelectElement)) inputRef.current?.focus(); }}
    >
      {/* 'Finished' popup */}
      {gameState === 'finished' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center gap-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800">Nice work! 🎉</h2>

            <div className="grid grid-cols-2 gap-4 w-full">
              {[
                { label: "WPM", value: wpm },
                { label: "CPM", value: cpm },
                { label: "Accuracy", value: `${accuracy}%` },
                { label: "Errors", value: errors },
                { label: "Time", value: `${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, "0")}` },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col items-center bg-gray-100 rounded-xl px-4 py-3">
                  <span className="text-xs text-gray-400 uppercase tracking-wide">{label}</span>
                  <span className="text-2xl font-bold text-gray-800">{value}</span>
                </div>
              ))}
            </div>

            <button
              className="bg-blue-800 hover:bg-purple-600 text-white px-8 py-3 rounded-lg transition-colors font-medium w-full"
              onClick={() => handleReset()}
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-4xl mb-6 flex items-center gap-3">
        <img src="/favicon.svg" alt="devtype logo" className="w-8 h-8" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">devtype</h1>
          <p className="text-sm text-gray-400 mt-1">Practice typing real code. Select a language and start typing to begin.</p>
        </div>
      </div>

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-8 flex flex-col gap-6">
        <LanguageSelector
          language={language}
          onChange={(lang) => {
            setLanguage(lang);
            handleReset(lang);
          }}
        />

        <CodeDisplay
          snippet={snippet}
          position={position}
          errorPositions={errorPositions}
          isError={isError}
        />

        <div className="flex items-center justify-between">
          <StatsBar
            wpm={wpm}
            cpm={cpm}
            accuracy={accuracy}
            errors={errors}
            time={time}
          />
          <button
            className="bg-blue-800 hover:bg-purple-600 text-white drop-shadow px-6 py-2 rounded-lg transition-colors"
            onClick={(e) => { e.stopPropagation(); handleReset(); }}
          >
            Reset
          </button>
        </div>
      </div>

      <input
        ref={inputRef}
        className="opacity-0 absolute w-0 h-0"
        autoFocus
        onKeyDown={(e) => {
          if (e.ctrlKey || e.metaKey) return;
          e.preventDefault();
          handleKeyPress(e.key);
        }}
      />
    </div>
  )
}
