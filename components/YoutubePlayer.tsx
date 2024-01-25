"use client"
import { Lock } from 'lucide-react';
import React from 'react';
import ReactPlayer from 'react-player';

interface YoutubePlayerProps {
  url: string;
  isLocked : boolean | undefined
}

const YoutubePlayer: React.FC<YoutubePlayerProps> = ({ url,isLocked }) => {
  return (
   <>
   {isLocked ? ( <>
    <div className='w-full sm:w-4/5 h-96 lg:w-3/5 mx-auto bg-slate-800 flex items-center justify-center'>
        <div className='flex flex-col  gap-3 items-center text-white text-sm'>
            <Lock/>
            Buy this course to access the course !

        </div>
     
    </div>
   
   </>) : ( <>
    <div className='w-full sm:w-4/5 h-96 lg:w-3/5 mx-auto'>
      <ReactPlayer url={url} controls={true} light={true} width='100%' height='100%' playing={false}/>
    </div> </>)}
   </>
  );
};

export default YoutubePlayer;
