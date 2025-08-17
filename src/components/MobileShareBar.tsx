'use client';

import { useState } from 'react';
import { Share2, Twitter, Linkedin, Copy, MessageCircle } from 'lucide-react';

interface MobileShareBarProps {
  url: string;
  title: string;
}

export default function MobileShareBar({ url, title }: MobileShareBarProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40 md:hidden">
      <div className="flex items-center justify-around">
        <button
          onClick={handleShare}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Share"
        >
          <Share2 className="w-5 h-5" />
        </button>

        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-5 h-5" />
        </a>

        <a
          href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Share on WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
        </a>

        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>

        <button
          onClick={handleCopy}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Copy link"
        >
          <Copy className={`w-5 h-5 ${copied ? 'text-green-600' : ''}`} />
        </button>
      </div>
    </div>
  );
}