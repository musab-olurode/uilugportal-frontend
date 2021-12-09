import { InformationCircleIcon } from '@heroicons/react/outline';

const NoRecordsCard = ({ message }: { message: string }) => {
	return (
		<div className='grid h-20 card bg-base-300 sm:col-span-2 md:col-span-3 rounded-box place-items-center text-base'>
			<div className='flex'>
				<InformationCircleIcon className='h-6 w-6 mr-2 text-green-500' />
				{message}
			</div>
		</div>
	);
};

export default NoRecordsCard;
