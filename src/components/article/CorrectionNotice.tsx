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
    <div className="correction-notice bg-red-50 border-l-4 border-red-400 p-4 mb-6">
      <div className="flex items-start gap-2">
        <svg className="w-5 h-5 text-red-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <div className="flex-1">
          <h3 className="font-bold text-red-900 mb-2">
            Correction{corrections.length > 1 ? 's' : ''}
          </h3>
          {corrections.map((correction, index) => (
            <div key={index} className="mb-3 pb-3 border-b border-red-200 last:border-0">
              <time className="text-xs text-red-700">
                {new Date(correction.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit'
                })}
              </time>
              <div className="mt-1 text-sm">
                <p className="text-gray-700">
                  <strong>Original:</strong> <span className="line-through">{correction.originalText}</span>
                </p>
                <p className="text-gray-900 mt-1">
                  <strong>Corrected:</strong> {correction.correctedText}
                </p>
                <p className="text-gray-600 mt-1 italic">
                  {correction.reason}
                </p>
              </div>
            </div>
          ))}
          <p className="text-xs text-red-700 mt-2">
            We strive for accuracy in all our reporting. View our{' '}
            <Link href="/corrections" className="underline hover:text-red-900">
              corrections policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}