import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getLoggedInUser } from '../helpers/api/auth';
import { ActionCreators } from '../helpers/enums';
import { obj } from '../interfaces/obj';
import { storeWrapper } from '../redux/store';

const withoutAuth = (
	GetServerSidePropsFunction: (
		context: GetServerSidePropsContext,
		data: obj
	) => Promise<GetServerSidePropsResult<any>>
) =>
	storeWrapper.getServerSideProps((store) => async (context: GetServerSidePropsContext) => {
		const token = context.req.cookies?.token || null;

		const { success, data } = await getLoggedInUser(token as string);

		if (success) {
			store.dispatch({
				type: ActionCreators.SERVER,
				payload: { user: data.user },
			});

			return {
				redirect: {
					destination: '/dashboard',
					permanent: false,
				},
			};
		}

		return await GetServerSidePropsFunction(context, {});
	});

export default withoutAuth;
