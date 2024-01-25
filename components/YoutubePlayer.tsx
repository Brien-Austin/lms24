"use client"

import React from 'react';
import YouTube from 'react-youtube';

interface YouTubePlayerProps {
  videoUrl: string | null | undefined;
  isLocked : boolean;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoUrl,isLocked }) => {
  if (!videoUrl) {
    return <div>Error: Invalid YouTube video URL</div>;
  }

  // Extract video ID from the URL
  const getVideoId = (url: string): string | null => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))([^"&?\/\s]{11})/);
    return match && match[1] ? match[1] : null;
  };

  const videoId = getVideoId(videoUrl);

  if (!videoId) {
    return <div>Error: Invalid YouTube video URL</div>;
  }

  const opts: any = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
    // Add any additional options here
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <YouTube videoId={videoId} opts={opts} />
    </div>
  );
};

export default YouTubePlayer;
