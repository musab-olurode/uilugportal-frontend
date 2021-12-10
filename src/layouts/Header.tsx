import { MenuIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useStore } from 'react-redux';
import avatarImg from '../../public/images/avatar.png';
import { IUserProfile } from '../interfaces/UserProfile';

const Header = () => {
	const router = useRouter();
	const exclude = ['/auth/signin', '/dashboard/print/preview'];
	const store = useStore();
	const { server } = store.getState();

	const user: IUserProfile = server.user;

	useEffect(() => {}, []);

	const shouldHide = exclude.includes(router.pathname);

	return (
		<>
			<div className='max-w-[1530px] mx-auto'>
				<div className='flex flex-row justify-between'>
					<label
						htmlFor='my-drawer-2'
						className={`btn btn-ghost drawer-button lg:hidden !rounded-xl ${
							shouldHide ? 'hidden' : ''
						}`}>
						<MenuIcon className='!w-6 !h-6' />
					</label>
					{!shouldHide && (
						<div
							className='md:hidden flex justify-end mt-2 mr-2 hover:cursor-pointer'
							onClick={() => router.push('/dashboard/profile')}>
							<div className='avatar'>
								<div className='rounded-full w-10 h-10'>
									<Image src={user.avatar} width={60} height={60} alt='avatar' />
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
			<div id='main-loader' className='w-full'></div>
		</>
	);
};

export default Header;
