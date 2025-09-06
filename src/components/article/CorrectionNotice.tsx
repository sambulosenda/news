import Link from 'next/link';

interface CorrectionNoticeProps {
  corrections: Correction[];
}

interface Correction {
  date: string;
  originalText: string;
  correctedText: string;
  reason: string;
}

/**
 * Correction Notice Component
 * Displays article corrections transparently for trust and Google News compliance
 */
export default function CorrectionNotice({ corrections }: CorrectionNoticeProps) {
  if (!corrections || corrections.length === 0) {
    return null;
  }
  
  return (
    <div className="correction-notice bg-red-50 border-l-4 border-red-400 p-3 sm:p-4 mb-6">
      <div className="flex items-start gap-2">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm sm:text-base text-red-900 mb-2">
            Correction{corrections.length > 1 ? 's' : ''}
          </h3>
          {corrections.map((correction, index) => (
            <div key={index} className="mb-3 pb-3 border-b border-red-200 last:border-0">
              <time className="text-xs text-red-700 block mb-1">
                {new Date(correction.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
                <span className="hidden sm:inline">
                  {' at '}
                  {new Date(correction.date).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit'
                  })}
                </span>
              </time>
              <div className="mt-1 text-xs sm:text-sm space-y-1">
                <p className="text-gray-700 break-words">
                  <strong className="font-semibold">Original:</strong>{' '}
                  <span className="line-through">{correction.originalText}</span>
                </p>
                <p className="text-gray-900 break-words">
                  <strong className="font-semibold">Corrected:</strong>{' '}
                  {correction.correctedText}
                </p>
                <p className="text-gray-600 italic break-words">
                  {correction.reason}
                </p>
              </div>
            </div>
          ))}
          <p className="text-xs text-red-700 mt-2">
            We strive for accuracy.{' '}
            <Link href="/corrections" className="underline hover:text-red-900">
              View policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}