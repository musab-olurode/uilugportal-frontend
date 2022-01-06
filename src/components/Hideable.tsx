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
		<span onClick={() => toggleHidden(!shouldHide)} className='hover:cursor-pointer'>
			<span className={className ?? '-'} hidden={!shouldHide}>
				-&bull;-
			</span>
			{!shouldHide && value}
		</span>
	);
};

export default Hideable;
