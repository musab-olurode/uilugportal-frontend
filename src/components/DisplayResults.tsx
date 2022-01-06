import { obj } from '../interfaces/obj';
import { IResult } from '../interfaces/Result';
import NoRecordsCard from './NoRecordsCard';

const DisplayResults = ({ results }: { results: obj<IResult[]> }) => {
	return (
		<>
			{Object.keys(results).length == 0 ? (
				<NoRecordsCard message='No results to display' />
			) : (
				Object.keys(results).map((semester, index) => {
					return (
						<div key={index}>
							<div
								className={`text-2xl text-gray-500 dark:text-gray-300 font-bold text-center ${
									index == 1 && 'mt-5'
								}`}>
								{semester}
							</div>
							<div className='card shadow-lg rounded-b-none md:rounded-b-md'>
								<div className='card-body block overflow-x-auto p-1 pl-0 md:py-4'>
									<table className='table w-full table-compact'>
										<thead>
											<tr className='text-gray-500 font-bold dark:text-gray-400'>
												<th></th>
												<th>Title</th>
												<th>Code</th>
												<th>Status</th>
												<th>Unit</th>
												<th>CA</th>
												<th>Exam</th>
												<th>Total</th>
												<th>Grade</th>
											</tr>
										</thead>
										<tbody>
											{results[semester].map((results: IResult, index) => {
												return (
													<tr key={index} className='font-bold hover'>
														<th>{index + 1}</th>
														<th className='text-gray-500 dark:text-gray-300'>
															{results.title.toUpperCase() || 'N/A'}
														</th>
														<td className='text-success'>
															{results.code.toUpperCase() || 'N/A'}
														</td>
														<td className='text-accent'>
															{' '}
															{results.status.toUpperCase() || 'N/A'}
														</td>
														<td className='text-secondary'>
															{' '}
															{results.unit.toUpperCase() || 'N/A'}
														</td>
														<td className='text-primary '>
															{' '}
															{results.ca?.toUpperCase() || 'N/A'}
														</td>
														<td className='text-primary '>
															{' '}
															{results.exam?.toUpperCase() || 'N/A'}
														</td>
														<td className='text-primary '>
															{' '}
															{Number(results.exam) + Number(results.ca) ||
																'N/A'}
														</td>
														<td className='text-purple-500'>
															{' '}
															{results.grade?.toUpperCase() || 'N/A'}
														</td>
													</tr>
												);
											})}
										</tbody>
										<tfoot>
											<tr className='text-gray-500 font-bold dark:text-gray-400'>
												<th></th>
												<th>Title</th>
												<th>Code</th>
												<th>Status</th>
												<th>Unit</th>
												<th>CA</th>
												<th>Exam</th>
												<th>Total</th>
												<th>Grade</th>
											</tr>
										</tfoot>
									</table>
								</div>
							</div>
						</div>
					);
				})
			)}
		</>
	);
};

export default DisplayResults;
