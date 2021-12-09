import React, { useState } from 'react';
import { createPortal } from 'react-dom';

const IFrame = ({ children, ...props }: { children: any }) => {
	const [contentRef, setContentRef] = useState(null);
	const mountNode = (contentRef as any)?.contentWindow?.document?.body;

	return (
		<iframe {...props} ref={setContentRef as any} className='w-full h-full'>
			{mountNode && createPortal(children, mountNode)}
			<div>test</div>
		</iframe>
	);
};

export default IFrame;
