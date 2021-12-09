import { ClockIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import nucleusIcon from '../../public/images/nucleus.png';

const AssignmentCard = () => {
  return (
    <div className='card bg-gray-200 hover:bg-gray-300 hover:cursor-pointer'>
      <div className='card-body p-2'>
        <div className='flex justify-center'>
          <div>
            {' '}
            <p className='text-1xl font-extrabold text-center'>
              English lesson 2
            </p>
            <p className='text-gray-500'>Question And Answer</p>
            <div className='text-center'>
              <Image
                src={nucleusIcon}
                width={20}
                height={20}
                alt='assignment'
              />
            </div>
          </div>
        </div>
        <div className='flex justify-between mt-4'>
          <div className='badge badge-success text-xs text-white bg-green-400'>
            New
          </div>
          <span className='text-xs flex items-center'>
            <ClockIcon className='w-6 h-6 mr-2' />
            20th Jan 2020
          </span>
        </div>
        <div className='mt-4 flex items-center'>
          <span className='text-xs text-primary font-bold mr-2'>15%</span>
          <progress
            className='progress progress-primary'
            value='15'
            max='100'
          ></progress>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;
