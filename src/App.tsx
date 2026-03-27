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
  const wpm = time > 0 ? Math.round((position / 5) / minutes) : 0;
  const cpm = time > 0 ? Math.round(position / minutes) : 0;
  const accuracy = totalKeyPresses > 0
    ? Math.min(100, Math.round((position / totalKeyPresses) * 100))
    : 100;
  console.log({ time, position, gameState });
  return (
    <div
      className="min-h-screen bg-gray-100 flex flex-col items-center py-16 px-4"
      onClick={(e) => { if (!(e.target instanceof HTMLSelectElement)) inputRef.current?.focus(); }}
    >
      <div className="w-full max-w-4xl mb-8">
        <h1 className="text-3xl font-bold text-gray-800">devtype</h1>
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
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
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
