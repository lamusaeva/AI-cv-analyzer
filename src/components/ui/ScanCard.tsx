type Props = {
  fileName: string
  date: string
  score: number
}

export default function ScanCard({ fileName, date, score }: Props) {
  const badgeColor =
    score >= 90
      ? 'bg-green-600'
      : score >= 60
      ? 'bg-amber-600'
      : 'bg-purple-mid'

  return (
    <div className="bg-white rounded-2xl p-3 flex-1 relative border border-purple-light">
      <span className={`absolute top-2 right-2 text-white text-xs font-bold px-2 py-0.5 rounded-lg ${badgeColor}`}>
        {score}
      </span>
      <div className="bg-purple-pale rounded-xl h-16 flex items-center justify-center mb-2">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#534AB7" strokeWidth="1.5">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M8 8h8M8 12h8M8 16h4" />
        </svg>
      </div>
      <p className="text-sm font-medium text-purple-deep truncate">{fileName}</p>
      <p className="text-xs text-gray-400">{date}</p>

    </div>
  )
}