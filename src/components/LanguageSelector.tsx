interface LanguageSelectorProps {
  language: string,
  onChange: (language: string) => void,
}

export default function LanguageSelector ({ language, onChange}: LanguageSelectorProps) {
  return (
    <select value={language} onChange={e => onChange(e.target.value)}>
      <option value="javascript">javascript</option>
      <option value="typescript">typescript</option>
      <option value="python">python</option>
      <option value="ruby">ruby</option>
      <option value="go">go</option>
      <option value="rust">rust</option>
      <option value="java">java</option>
      <option value="cpp">cpp</option>
      <option value="swift">swift</option>
      <option value="php">php</option>
      <option value="css">css</option>
    </select>
  )
}

