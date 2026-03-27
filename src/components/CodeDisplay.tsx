import "./CodeDisplay.css";

interface CodeDisplayProps {
  snippet: string,
  position: number,
  errorPositions: Set<number>,
  isError: boolean,
}

export default function CodeDisplay ({ snippet, position, errorPositions, isError }: CodeDisplayProps) {
  const chars = snippet.split("");
  const cursorPos = isError ? position + 1 : position;
  return (
    <>
      <div className="font-mono bg-gray-900 text-sm p-4 rounded whitespace-pre-wrap leading-relaxed">
        {chars.map((char, i) => {
          let className = "char";
          let extraClass = "";
          if (i < position) {
            if (errorPositions.has(i)) {
              className += " text-amber-400";
              if (char === ' ') className += " border-b-2 border-amber-400";
            } else {
              className += " text-green-400";
            }
          } else if (i === position) {
            className += isError ? " text-red-400" : " text-white";
            if (isError && char === ' ') {
              className += " border-b-2 border-red-400";
            }
          } else {
            className += " text-gray-400";
          }
          if (i === cursorPos) {
            extraClass = isError ? "cursor shake" : "cursor";
          }
          return <span key={i} className={`${className} ${extraClass}`.trim()}>{char}</span>;
        })}
      </div>
    </>
  )
}
