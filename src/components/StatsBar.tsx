interface StatsBarProps {
  wpm: number,
  cpm: number,
  accuracy: number,
  errors: number,
  time: number,
}

export default function StatsBar ({ wpm, cpm, accuracy, errors, time }: StatsBarProps) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formatted = `${minutes}:${seconds.toString().padStart(2,"0")}`;
  return (
    <div className="flex gap-4">
      {[
        { label: "Time", value: formatted },
        { label: "WPM", value: wpm },
        { label: "CPM", value: cpm },
        { label: "Accuracy", value: `${accuracy}%` },
        { label: "Errors", value: errors },
      ].map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 w-20">
          <span className="text-xs text-gray-400 uppercase tracking-wide">{label}</span>
          <span className="text-lg font-semibold text-gray-800 dark:text-white">{value}</span>
        </div>
      ))}
    </div>
  )
}
