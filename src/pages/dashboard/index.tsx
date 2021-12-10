import { GetServerSidePropsContext, NextPage } from 'next';
import withAuth from '../../components/WithAuth';
import { normalizeName } from '../../helpers';
import { IUserProfile } from '../../interfaces/UserProfile';
import Layout from '../../layouts/Layout';
import Page from '../../layouts/Page';
import loginBg from '../../../public/images/login-img.png';
import Image from 'next/image';
import { State } from '../../interfaces/State';
import { connect } from 'react-redux';
import Link from 'next/link';
import AssignmentCard from '../../components/AssignmentCard';
import { InformationCircleIcon } from '@heroicons/react/outline';
import MaterialCard from '../../components/MaterialCard';
import NoRecordsCard from '../../components/NoRecordsCard';

export const getServerSideProps = withAuth(
	async (context: GetServerSidePropsContext, results: any): Promise<any> => {
		return {
			props: {
				user: results.user,
			},
		};
	}
);

const Dashboard: NextPage<State> = ({ server }) => {
	const user: IUserProfile = server.user;

	return (
		<Layout title='Dashboard' user={user}>
			<div className='card shadow-lg'>
				<div className='card-body flex-row'>
					<div className='flex-grow text-xl'>
						<p className='text-2xl font-bold mb-5 mt-3'>Welcome</p>
						Hi <span className='font-bold'>{normalizeName(user.fullName)}</span>, you&apos;ve
						managed to survive another day. Keep up the good work.
					</div>
					<div className='flex-none hidden md:block md:pt-4 w-[11rem] h-[11rem]'>
						<Image src={loginBg} alt='illustration' />
					</div>
				</div>
			</div>
			<div className='mt-16'>
				<div className='flex flex-col w-full'>
					<div className='flex flex-row justify-between items-baseline'>
						<span className='text-2xl font-bold'>Your Assignments</span>
						<Link href='/dashboard/assignments'>
							<a className='link link-hover text-primary-600 font-bold max-h-5'>view more</a>
						</Link>
					</div>
					<div className='divider mt-0'></div>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
						<AssignmentCard />
						<AssignmentCard />
						<AssignmentCard />
						{/* <NoRecordsCard message='No assignments added' /> */}
					</div>
				</div>
			</div>
			<div className='mt-10 mb-2'>
				<div className='flex flex-col w-full'>
					<div className='flex flex-row justify-between items-baseline'>
						<span className='text-2xl font-bold'>Materials for you</span>
						<Link href='/dashboard/materials'>
							<a className='link link-hover text-primary-600 font-bold max-h-5'>view more</a>
						</Link>
					</div>
					<div className='divider mt-0'></div>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
						<MaterialCard code='PHY142' />
						<MaterialCard code='GNS211' />
						<MaterialCard code='GBE132' />
						{/* <NoRecordsCard message='No materials added' /> */}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default connect((state: State) => state)(Dashboard);
