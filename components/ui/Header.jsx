

import Image from 'next/image';



const Header = ({ openSide, setOpen, children }) => {
  
  return (
    <div className={`flex shadow-md p-3 ${openSide ? 'justify-end' : 'justify-between'} items-center z-100`}>
      {!openSide && (
        <div className='flex-start'>
          <Image
            src={'https://img.icons8.com/?size=100&id=3096&format=png&color=000000'}
            height={20}
            width={20}
            alt='menu'
            onClick={() => setOpen(true)}
          />
        </div>
      )}

      <div className='flex'>
        <div>
          <h1 className='text-md mt-2 font-bold '>{children}</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
