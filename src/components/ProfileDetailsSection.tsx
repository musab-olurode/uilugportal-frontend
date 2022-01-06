const ProfileDetailsSection = ({
	title,
	value,
	customValueClass,
}: {
	title: string;
	value: string;
	customValueClass?: string;
}) => {
	return (
		<div>
			<span className='text-lg text-gray-500 dark:text-gray-300 font-bold'>{title}:</span>
			<div className={`text-1xl text-primary-600 font-extrabold ${customValueClass}`}>
				{value || '-'}
			</div>
		</div>
	);
};

export default ProfileDetailsSection;
