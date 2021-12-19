import Head from 'next/head';
import SideMenu from './SideMenu';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Page from './Page';
import { IUserProfile } from '../interfaces/UserProfile';

const Layout = ({ children, title, user }: { children: any; title: string; user?: IUserProfile }) => {
	return (
		<div>
			<Head>
				<link rel='preload' href='/fonts/poppins/Poppins-Regular.ttf' as='font' crossOrigin='' />
				<title>{title ?? 'Undergraduate Portal'}</title>
			</Head>
			<ToastContainer
				position='bottom-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='colored'></ToastContainer>
			<div className='container mx-auto overflow-auto'>
				<SideMenu>
					<Page user={user as IUserProfile}>{children}</Page>
					{/* <Footer /> */}
				</SideMenu>
			</div>
		</div>
	);
};

export default Layout;
