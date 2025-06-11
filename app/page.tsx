'use client';

import React, { useState } from 'react';
import LoadingRose from './components/LoadingRose';
import SupportWebsite from './components/SupportWebsite';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingRose onLoadingComplete={handleLoadingComplete} />}
      <div 
        style={{ 
          opacity: isLoading ? 0 : 1,
          visibility: isLoading ? 'hidden' : 'visible',
        }} 
        className="transition-all duration-1000"
      >
        <SupportWebsite />
      </div>
    </>
  );
}