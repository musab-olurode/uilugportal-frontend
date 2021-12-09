import { InformationCircleIcon } from '@heroicons/react/outline';

const ValidationError = ({ message }: { message: string }) => {
  return (
    <div className='alert alert-warning mt-2'>
      <div className='flex-1'>
        <InformationCircleIcon className='w-6 h-6 mr-2' />
        <label>{message}</label>
      </div>
    </div>
  );
};

export default ValidationError;
