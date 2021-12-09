import { GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { connect, useStore } from 'react-redux';
import Iframe from '../../../components/IFrame';
import withAuth from '../../../components/WithAuth';
import { State } from '../../../interfaces/State';
import { IUserProfile } from '../../../interfaces/UserProfile';
import Layout from '../../../layouts/Layout';

export const getServerSideProps = withAuth(
	async (context: GetServerSidePropsContext, results: any): Promise<any> => {
		return {
			props: {
				user: results.user,
			},
		};
	}
);

const PrintPreview: NextPage<State> = ({ server }) => {
	const user: IUserProfile = server.user;
	const router = useRouter();
	const store = useStore();
	let state = store.getState();

	const showPrintPreview = () => {
		return {
			__html: state.client.printable,
		};
	};

	useEffect(() => {
		if (!state.client.printable) {
			router.push('/dashboard/print');
		}
	}, []);

	return (
		<Layout title='Print Preview' user={user}>
			<Iframe>
				<div dangerouslySetInnerHTML={showPrintPreview()}></div>
			</Iframe>
		</Layout>
	);
};

export default connect((state: State) => state)(PrintPreview);
