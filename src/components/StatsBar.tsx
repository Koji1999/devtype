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
    <div className="flex gap-6 my-4">
      <span>Time: {formatted}</span>
      <span>WPM: {wpm}</span>
      <span>CPM: {cpm}</span>
      <span>Accuracy: {accuracy}%</span>
      <span>Errors: {errors}</span>
    </div>
  )
}