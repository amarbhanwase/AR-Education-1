import React, { useState, useEffect } from 'react';
import { MOCK_ADS } from '../../constants.ts';
import { Ad } from '../../types.ts';

interface AdBannerProps {
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ className = '' }) => {
  const [ad, setAd] = useState<Ad | null>(null);

  useEffect(() => {
    // Select a random ad when the component mounts
    const randomAd = MOCK_ADS[Math.floor(Math.random() * MOCK_ADS.length)];
    setAd(randomAd);
  }, []);

  if (!ad) {
    return (
      <div className={`w-full bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center h-24 my-6 ${className}`}>
        <span className="text-gray-500">Loading Ad...</span>
      </div>
    );
  }

  return (
    <div className={`my-6 ${className}`}>
        <p className="text-xs text-gray-400 mb-1 pl-2">Advertisement</p>
        <a
            href={ad.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-white border border-sky-100 rounded-lg flex items-center p-3 shadow-sm hover:shadow-md transition-shadow"
        >
            <img src={ad.imageUrl} alt={ad.title} className="w-20 h-20 object-cover rounded-md mr-4 flex-shrink-0" />
            <div className="flex-1">
                <h4 className="font-bold text-sky-800 leading-tight">{ad.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{ad.description}</p>
            </div>
        </a>
    </div>
  );
};

export default AdBanner;