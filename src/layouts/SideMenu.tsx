import {
	ClipboardIcon,
	HomeIcon,
	LogoutIcon,
	MoonIcon,
	PrinterIcon,
	SunIcon,
	UserIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useStore } from 'react-redux';
import { logOut } from '../helpers/api/auth';
import { IUserProfile } from '../interfaces/UserProfile';
import { useLoadingProgress } from '../services/loadingProgress';
import Header from './Header';
import { themeChange } from 'theme-change';
import { getCurrentTheme } from '../helpers';

const SideMenu = ({ children }: { children: any }) => {
	const router = useRouter();
	const exclude = ['/auth/signin', '/dashboard/print/preview'];
	// eslint-disable-next-line no-unused-vars
	const [cookies, setCookie, removeCookie] = useCookies(['token']);
	const { showLoading } = useLoadingProgress();
	const store = useStore();
	const { server } = store.getState();
	const [currentTheme, setCurrentTheme] = useState<string>('light');

	const user: IUserProfile = server.user;

	const doLogOut = async () => {
		showLoading(true);
		await logOut(cookies.token);
		removeCookie('token');
		showLoading(false);
		router.push('/auth/signin');
	};

	useEffect(() => {
		themeChange(false);
		setCurrentTheme(getCurrentTheme() ?? 'light');
	}, []);

	return (
		<div className={`drawer ${!exclude.includes(router.pathname) ? 'drawer-mobile' : ''} h-screen`}>
			<input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
			<div className='drawer-content'>
				<Header />
				{children}
			</div>
			<div className={`drawer-side ${exclude.includes(router.pathname) ? '!hidden' : ''}`}>
				<label htmlFor='my-drawer-2' className='drawer-overlay'></label>
				<ul className='menu p-4 overflow-y-auto w-80 md:w-[200px] !bg-primary text-white pt-20 gap-y-5'>
					<li className='flex flex-row gap-x-2 py-2 items-center'>
						<span className='!p-0'>
							<SunIcon className='w-4 h-4 ml-1' />
							Light
						</span>
						<input
							data-toggle-theme='dark,light'
							data-act-class='ACTIVECLASS'
							type='checkbox'
							defaultChecked={currentTheme == 'light' ? false : true}
							className='toggle toggle-sm'
						/>
						<span className='!p-0'>
							<MoonIcon className='w-4 h-4 mr-1' />
							Dark
						</span>
					</li>
					<li>
						<Link href='/dashboard'>
							<a className=''>
								<HomeIcon className='h-6 w-6 mr-4' /> Home
							</a>
						</Link>
					</li>
					<li>
						<Link href='/dashboard/profile'>
							<a className=''>
								<UserIcon className='h-6 w-6 mr-4' /> Profile
							</a>
						</Link>
					</li>
					<li>
						<Link href='/dashboard/results'>
							<a className=''>
								<ClipboardIcon className='h-6 w-6 mr-4' /> Results
							</a>
						</Link>
					</li>
					<li>
						<Link href='/dashboard/print'>
							<a className=''>
								<PrinterIcon className='h-6 w-6 mr-4' /> Print
							</a>
						</Link>
					</li>
					{/* <li>
						<Link href='/dashboard/settings'>
							<a>
								<CogIcon className='h-6 w-6 mr-4' /> Settings
							</a>
						</Link>
					</li> */}
					<li>
						<a onClick={doLogOut}>
							<LogoutIcon className='h-6 w-6 mr-4' /> Logout
						</a>
					</li>
					<li className='text-white mt-auto'>
						<a
							href='https://github.com/musab-olurode/uilugportal-frontend'
							target='_blank'
							rel='noreferrer'>
							<svg
								width='24'
								height='24'
								fill='currentColor'
								className='mr-3 text-opacity-50 transform'>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d='M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z'></path>
							</svg>
							Contribute
						</a>
					</li>
					<li className='text-white text-xs'>
						<div className='text-nowrap'>
							{' '}
							Semester <span className='text-base'>{user?.semester.number}</span> of 2 (
							{user?.semester.type})
						</div>
						<progress
							className='progress progress-secondary'
							value={user?.semester.number === '1' ? '50' : '100'}
							max='100'></progress>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default SideMenu;
