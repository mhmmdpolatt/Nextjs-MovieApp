import React from 'react';

const SkeletonCard = () => {
  return (
    <div className='relative mt-4 mx-1 w-[45%] sm:w-[30%] md:w-[22%] lg:w-[18%] xl:w-[19%] min-w-[120px] animate-pulse bg-[#1a1a1a] rounded overflow-hidden'>
      
      {/* Görsel alanı */}
      <div className='w-full h-[250px] bg-gray-800'></div>

      {/* Overlay Katman */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 text-white flex flex-col justify-end gap-y-2'>
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-600 rounded w-1/2"></div>
        <div className="h-3 bg-gray-600 rounded w-1/3"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;