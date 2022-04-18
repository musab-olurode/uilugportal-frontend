import { PlusIcon, SearchIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { IUserProfile } from '../interfaces/UserProfile';
import avatarImg from '../../public/images/avatar.png';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useRouter } from 'next/router';
import TaskList from '../components/TaskList';
import TaskListItem from '../components/TaskListItem';

const Page = ({ children, user }: { children: any; user: IUserProfile }) => {
	const router = useRouter();
	const exclude = ['/auth/signin', '/dashboard/print/preview'];

	const shouldHide = exclude.includes(router.pathname);

	return (
		<>
			{shouldHide ? (
				<>{children}</>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-4 gap-x-1'>
					<div className='col-span-1 md:col-span-3 md:max-h-screen overflow-auto'>
						<div className='w-full px-4 md:px-0 md:w-[50%] my-4 md:ml-6'>
							<div className='form-control'>
								<div className='relative'>
									<input
										type='text'
										placeholder='What do you want to learn today'
										className='w-full !pr-16 input bg-gray-200 dark:bg-base-100 dark:border-gray-200 !rounded-xl disabled'
									/>
									<button className='absolute top-0 right-0 rounded-l-none btn btn-clear'>
										<SearchIcon className='w-6 h-6' />
									</button>
								</div>
							</div>
						</div>
						<div className='px-4'>{children}</div>
					</div>
					<div className='col-span-1 pr-2 md:pr-4 pl-1 mt-10 md:mt-0'>
						<div
							className='hidden md:flex justify-end mt-6 mb-3 hover:cursor-pointer'
							onClick={() => router.push('/dashboard/profile')}>
							<div className='avatar'>
								<div className='rounded-full w-10 h-10'>
									<Image
										src={user?.avatar ?? avatarImg}
										width={60}
										height={60}
										alt='avatar'
									/>
								</div>
							</div>
						</div>
						<div className='card shadow-md rounded-0 flex flex-row justify-center'>
							<Calendar value={new Date()} />
						</div>

						<div className='flex flex-col w-full mt-4'>
							{/* <div className='flex flex-row justify-between items-baseline'>
          </div> */}
							<div className='text-1xl font-bold text-center'>
								Your Tasks Today
							</div>
							<div className='divider mt-0'></div>
						</div>

						<TaskList>
							<TaskListItem title='Upload Assignment' />
							<TaskListItem title='Study for Quiz' />
							<TaskListItem title='Paragraph Corrections' />
							<TaskListItem title='Spell Check English' />
						</TaskList>

						<div className='text-center mt-2 mb-2'>
							<button className='btn btn-outline btn-primary btn-sm !rounded-2xl'>
								<PlusIcon className='w-4 h-4 mr-2' /> Create New
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Page;
