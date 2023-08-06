import { ClipboardListIcon } from '@heroicons/react/outline';
import { GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { connect, useStore } from 'react-redux';
import { toast } from 'react-toastify';
import DisplayPaymentReceipts from '../../../components/DisplayPaymentReceipts';
import withAuth from '../../../components/WithAuth';
import { getPrintables } from '../../../helpers/api/user';
import { ActionCreators } from '../../../helpers/enums';
import { State } from '../../../interfaces/State';
import { IUserProfile } from '../../../interfaces/UserProfile';
import Layout from '../../../layouts/Layout';
import { useLoadingProgress } from '../../../services/loadingProgress';

export const getServerSideProps = withAuth(
	async (context: GetServerSidePropsContext, results: any): Promise<any> => {
		return {
			props: {
				user: results.user,
			},
		};
	}
);

const Print: NextPage<State> = ({ server }) => {
	const user: IUserProfile = server.user;
	// eslint-disable-next-line no-unused-vars
	const [cookie, removeCookie] = useCookies(['token']);
	const [sessions, setSessions] = useState<string[]>([]);
	const [printables, setPrintables] = useState<any>({});
	const { showLoading } = useLoadingProgress();
	const store = useStore();
	const router = useRouter();
	const [levels, setLevels] = useState<number[]>([]);
	const [selectedSession, setSelectedSession] = useState<string>();
	const [selectedlevel, setSelectedLevel] = useState<number>();
	const [isLoadingSelection, setIsLoadingSelection] = useState<boolean>(false);

	const getSessions = () => {
		let sessionYears: string[] = [];
		// subtract one to account for covid displacement
		let thisYear = new Date().getFullYear() - 1;
		for (let year = thisYear; year >= 2009; year--) {
			let session = `${year - 1}/${year}`;
			sessionYears.push(session.trim());
		}
		return sessionYears;
	};

	const getLevels = () => {
		let levels: number[] = [];
		for (let i = Number(user.level); i > 0; i -= 100) {
			let level = Number(i);
			levels.push(level);
		}
		return levels;
	};

	const getAllPrintables = async (
		session: string,
		levelForCourseForm: string
	) => {
		let newPrintables: any;
		showLoading(true);
		const response = await getPrintables(
			{
				session,
				levelForCourseForm,
				currentLevel: user.level,
				matricNumber: user.matricNumber,
			},
			cookie.token
		);
		if (response.success) {
			newPrintables = response.data.printables;
			setPrintables(response.data.printables);
		} else {
			toast.error(response.message);
		}
		showLoading(false);
		return newPrintables;
	};

	const previewPrintable = (printable: string) => {
		store.dispatch({
			type: ActionCreators.CLIENT,
			payload: { printable },
		});
		router.push('/dashboard/print/preview');
		setIsLoadingSelection(false);
	};

	const selectLevelForCourseForm = async (
		e: ChangeEvent<HTMLSelectElement>
	) => {
		const { value } = e.target;
		setSelectedLevel(Number(value));
	};

	const selectSessionForResults = async (e: ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target;
		setSelectedSession(value);
	};

	const getSelectedPrintables = async (type: string) => {
		setIsLoadingSelection(true);
		if (type === 'session') {
			let newPrintables = await getAllPrintables(
				selectedSession as string,
				selectedlevel?.toString() as string
			);
			previewPrintable(newPrintables.resultsPage);
		} else {
			let newPrintables = await getAllPrintables(
				selectedSession as string,
				selectedlevel?.toString() as string
			);
			previewPrintable(newPrintables.courseFormPage);
		}
	};

	useEffect(() => {
		let allSessions = getSessions();
		setSessions(allSessions);
		let allLevels = getLevels();
		setLevels(allLevels);
		getAllPrintables(allSessions[0], user.level);
		setSelectedSession(allSessions[0]);
		setSelectedLevel(allLevels[0]);
	}, []);

	return (
		<Layout title='Print' user={user}>
			<div>
				<div className='card shadow-lg mt-6'>
					<div className='card-body text-xl md:text-3xl flex-row items-center'>
						<ClipboardListIcon className='h-10 w-10 mr-4' />
						<div className='flex-grow flex flex-col md:flex-row md:justify-between items-center'>
							<span className='font-bold'>Course Form</span>
							<div>
								<select
									className='select select-bordered mr-4'
									onChange={selectLevelForCourseForm}
									defaultValue={levels[0]}>
									{levels.map((level, index) => {
										return (
											<option key={index} value={level}>
												{level}
											</option>
										);
									})}
								</select>
								<button
									className='btn btn-accent'
									onClick={() => getSelectedPrintables('level')}
									disabled={isLoadingSelection}>
									Print
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className='card shadow-lg mt-6 rounded-b-none md:rounded-b-md overflow-x-auto'>
					<div className='card-body text-xl md:text-3xl p-1 pl-0 md:py-4'>
						<div className='flex flex-row items-center'>
							<ClipboardListIcon className='h-10 w-10 mr-4' />
							<span>Payment Receipts</span>
						</div>
						<DisplayPaymentReceipts
							receipts={printables.paymentReceiptsWithPages}
							previewPrintable={previewPrintable}
							isLoadingSelection={isLoadingSelection}
						/>
					</div>
				</div>

				<div className='card shadow-lg mt-6'>
					<div className='card-body text-xl md:text-3xl flex-row items-center'>
						<ClipboardListIcon className='h-10 w-10 mr-4' />
						<div className='flex-grow flex flex-col md:flex-row justify-between items-center'>
							<span className='font-bold'>Results</span>
							<div>
								<select
									className='select select-bordered mr-4'
									onChange={selectSessionForResults}
									defaultValue={sessions[0]}>
									{sessions.map((session, index) => {
										return (
											<option key={index} value={session}>
												{session}
											</option>
										);
									})}
								</select>
								<button
									className='btn btn-accent'
									onClick={() => getSelectedPrintables('session')}
									disabled={isLoadingSelection}>
									Print
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default connect((state: State) => state)(Print);
