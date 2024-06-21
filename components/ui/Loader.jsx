import React from 'react';

import Image from 'next/image';


const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-screen bg-white">
      <Image
        src="/loader.png"
        alt="Logo Loader"
        className="animate-spin h-18 w-16 mb-4"
        height={18}
        width={16}
      />
      <span className="text-lg font-bold text-gray-800">Loading, please wait...</span>
    </div>
  );
};

export default Loader;


