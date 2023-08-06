import { GetServerSidePropsContext, NextPage } from 'next';
import { ChangeEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import DisplayResults from '../../components/DisplayResults';
import Hideable from '../../components/Hideable';
import withAuth from '../../components/WithAuth';
import { gradePoints } from '../../helpers';
import { getCalculatedCGPA, getResults } from '../../helpers/api/user';
import { obj } from '../../interfaces/obj';
import { IResult } from '../../interfaces/Result';
import { State } from '../../interfaces/State';
import { IUserProfile } from '../../interfaces/UserProfile';
import Layout from '../../layouts/Layout';
import { useLoadingProgress } from '../../services/loadingProgress';

export const getServerSideProps = withAuth(
	async (context: GetServerSidePropsContext, results: any): Promise<any> => {
		return {
			props: {
				user: results.user,
			},
		};
	}
);

const Results: NextPage<State> = ({ server }) => {
	const [sessions, setSessions] = useState<string[]>([]);
	const [results, setResults] = useState<obj<IResult[]>>({});
	const [resultsReleased, setResultsReleased] = useState<obj<number>>({
		count: 0,
		total: 0,
	});
	const user: IUserProfile = server.user;
	// eslint-disable-next-line no-unused-vars
	const [cookie, removeCookie] = useCookies(['token']);
	const { showLoading } = useLoadingProgress();
	const [GPA, setGPA] = useState<obj<number>>({});
	const [CGPA, setCGPA] = useState<number>(0);
	const [hideGP, setHideGP] = useState<boolean>(true);

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

	const selectSession = async (e: ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target;
		await getSessionResults(value);
	};

	const calculateGPA = (results: IResult[]) => {
		let prevSemester = '';
		let totalQPs: obj<number> = {};
		let totalUnits: obj<number> = {};
		let gpas: obj<number> = {};
		results.map((result) => {
			if (prevSemester !== result.semester) {
				prevSemester = result.semester;
				totalQPs[prevSemester] = 0;
				totalUnits[prevSemester] = 0;
				gpas[prevSemester] = 0;
			}
			if (result.grade) {
				let qp = gradePoints[result.grade as string] * Number(result.unit);
				totalQPs[result.semester] += qp;
			}
			totalUnits[prevSemester] += Number(result.unit);
		});
		Object.keys(gpas).map((key) => {
			gpas[key] = Number((totalQPs[key] / totalUnits[key]).toFixed(2));
		});
		setGPA(gpas);
	};

	const getSessionResults = async (session: string) => {
		showLoading(true);
		const response = await getResults({ session }, cookie.token);
		if (response.success) {
			let prevSemester = '';
			let restructuredResults: any = {};
			let resultsRelease = { count: 0, total: response.data.results.length };
			response.data.results.map((result: IResult) => {
				if (prevSemester !== result.semester) {
					prevSemester = result.semester;
					restructuredResults[prevSemester] = [];
				}
				if (result.grade) {
					resultsRelease.count++;
				}
				restructuredResults[prevSemester].push(result);
			});
			setResults(restructuredResults);
			setResultsReleased(resultsRelease);
			calculateGPA(response.data.results);
		} else {
			toast.error(response.message);
		}
		showLoading(false);
	};

	const getCGPA = async () => {
		const response = await getCalculatedCGPA(
			{ level: user.level },
			cookie.token
		);
		if (response.success) {
			setCGPA(response.data.cgpa);
		} else {
			console.log(response.message);
		}
	};

	useEffect(() => {
		let allSessions = getSessions();
		setSessions(allSessions);
		getSessionResults(allSessions[0]);
		getCGPA();
	}, []);

	return (
		<Layout title='Results' user={user}>
			<div>
				<div className='card shadow-lg mt-6 overflow-visible'>
					<div className='card-body p-5 flex flex-col md:flex-row'>
						<div className='flex-grow md:mr-5 mt-4 md:mt-0'>
							<p className='text-gray-400 dark:text-gray-300 font-bold text-2xl'>
								<span className='text-primary'>{`${resultsReleased.count}`}</span>{' '}
								of
								<span className='text-pink-500'>{` ${resultsReleased.total}`}</span>{' '}
								results have been released
							</p>
							<progress
								className='progress progress-secondary h-5 mt-4'
								value={(
									(resultsReleased.count / resultsReleased.total) *
									100
								).toString()}
								max='100'></progress>
						</div>
						<div className='dropdown dropdown-hover dropdown-end'>
							<div
								tabIndex={0}
								className='rounded-lg bg-gray-200 dark:bg-gray-400 font-bold text-3xl py-1 px-4 order-first md:order-2 text-center hover:cursor-pointer'
								onClick={() => setHideGP(!hideGP)}>
								C.G.P.A <br />{' '}
								<span className='text-primary'>
									<Hideable
										shouldHide={hideGP}
										value={CGPA}
										toggleHidden={setHideGP}
									/>
								</span>
							</div>
							<ul
								tabIndex={0}
								className='p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 font-bold text-md'>
								{Object.keys(GPA).map((semester, index) => {
									return (
										<li key={index}>
											<a className='flex flex-row !p-1'>
												<span className='text-sm'>{semester}</span>
												<div>
													G.P.A:{' '}
													<span className='text-primary'>
														{' '}
														<Hideable
															shouldHide={hideGP}
															value={GPA[semester]}
															toggleHidden={setHideGP}
														/>
													</span>
												</div>
											</a>
										</li>
									);
								})}
							</ul>
						</div>
					</div>
				</div>

				<div className='mt-6'>
					<div className='flex flex-col w-full mt-6'>
						<div className='flex flex-row justify-between items-baseline'>
							<div className='text-lg md:text-2xl font-bold self-baseline'>
								Session
							</div>
							<select
								className='select select-bordered'
								onChange={selectSession}
								defaultValue={sessions[0]}>
								{sessions.map((session, index) => {
									return (
										<option key={index} value={session}>
											{session}
										</option>
									);
								})}
							</select>
						</div>
						<div className='divider mt-0'></div>
						<DisplayResults results={results} />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default connect((state: State) => state)(Results);
