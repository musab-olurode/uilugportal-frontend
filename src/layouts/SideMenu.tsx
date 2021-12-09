import {
	ClipboardIcon,
	CogIcon,
	HomeIcon,
	LogoutIcon,
	PrinterIcon,
	UserIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { useStore } from 'react-redux';
import { logOut } from '../helpers/api/auth';
import { IUserProfile } from '../interfaces/UserProfile';
import { useLoadingProgress } from '../services/loadingProgress';
import Header from './Header';

const SideMenu = ({ children }: { children: any }) => {
	const router = useRouter();
	const exclude = ['/auth/signin', '/dashboard/print/preview'];
	const [cookies, setCookie, removeCookie] = useCookies(['token']);
	const { showLoading } = useLoadingProgress();
	const store = useStore();
	const { server } = store.getState();

	const user: IUserProfile = server.user;

	const doLogOut = async () => {
		showLoading(true);
		await logOut(cookies.token);
		removeCookie('token');
		showLoading(false);
		router.push('/auth/signin');
	};

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
					<li>
						<Link href='/dashboard/settings'>
							<a>
								<CogIcon className='h-6 w-6 mr-4' /> Settings
							</a>
						</Link>
					</li>
					<li>
						<a onClick={doLogOut}>
							<LogoutIcon className='h-6 w-6 mr-4' /> Logout
						</a>
					</li>
					<li className='text-white text-xs mt-auto'>
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
