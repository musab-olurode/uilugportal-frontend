import React, { createContext, ReactElement, useContext } from 'react';

type Props = {
	children: ReactElement | ReactElement[];
	startProgress: () => void;
	stopProgress: () => void;
};

type Progress = {
	start: () => void;
	done: () => void;
	showLoading: (shouldShow: boolean) => void;
};

const LoadingProgressContext = createContext<Progress>({
	start: () => {
		// do nothing
	},
	done: () => {
		// do nothing
	},
	showLoading: () => {
		// do nothing
	},
});

export const useLoadingProgress = (): Progress => {
	return useContext<Progress>(LoadingProgressContext);
};

export const LoadingProgressProvider: React.FC<Props> = ({
	children,
	startProgress,
	stopProgress,
}): ReactElement => {
	const start = () => {
		startProgress();
	};

	const done = () => {
		stopProgress();
	};

	const showLoading = (shouldShowLoading: boolean) => {
		shouldShowLoading ? start() : done();
	};

	return (
		<LoadingProgressContext.Provider
			value={{
				start,
				done,
				showLoading,
			}}>
			{children}
		</LoadingProgressContext.Provider>
	);
};
