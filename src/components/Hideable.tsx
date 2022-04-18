import { EyeOffIcon } from '@heroicons/react/outline';
import clsx from 'clsx';

const Hideable = ({
	shouldHide,
	value,
	toggleHidden,
	className,
}: {
	shouldHide: boolean;
	value: string | number;
	// eslint-disable-next-line no-unused-vars
	toggleHidden: (state: boolean) => void;
	className?: string;
}) => {
	return (
		<span
			className='hover:cursor-pointer'
			onClick={() => toggleHidden(!shouldHide)}>
			<span className={clsx(className)} hidden={!shouldHide}>
				<EyeOffIcon className='w-9 h-9 mx-auto' />
			</span>
			{!shouldHide && value}
		</span>
	);
};

export default Hideable;
