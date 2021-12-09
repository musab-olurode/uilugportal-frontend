import Image from 'next/image';
import openBookIcon from '../../public/images/open-book.png';

const MaterialCard = () => {
  return (
    <div className='card bg-secondary hover:bg-pink-400 hover:cursor-pointer text-white'>
      <div className='card-body p-4 flex flex-row justify-between items-center'>
        <span className='text-3xl'>GNS 211</span>
        <Image src={openBookIcon} width={70} height={70} alt='assignment' />
      </div>
    </div>
  );
};

export default MaterialCard;
