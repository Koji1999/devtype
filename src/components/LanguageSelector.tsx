interface LanguageSelectorProps {
  language: string,
  onChange: (language: string) => void,
}

export default function LanguageSelector ({ language, onChange}: LanguageSelectorProps) {
 return (
  <div className="flex items-center gap-2 ml-auto">
    <label className="text-sm text-gray-400 uppercase tracking-wide">Language</label>
    <select
      value={language}
      onChange={e => onChange(e.target.value)}
      className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white font-medium text-sm px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 focus:outline-none focus:border-blue-500 cursor-pointer transition-colors"
    >
      <option value="javascript">JavaScript</option>
      <option value="typescript">TypeScript</option>
      <option value="python">Python</option>
      <option value="ruby">Ruby</option>
      <option value="go">Go</option>
      <option value="rust">Rust</option>
      <option value="java">Java</option>
      <option value="cpp">C++</option>
      <option value="swift">Swift</option>
      <option value="php">PHP</option>
      <option value="css">CSS</option>
    </select>
  </div>
  )
}
