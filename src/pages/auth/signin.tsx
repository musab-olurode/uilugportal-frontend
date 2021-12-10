import Layout from '../../layouts/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import ValidationError from '../../components/ValidationError';
import PasswordInput from '../../components/PasswordInput';
import loginBg from '../../../public/images/login-img.png';
import Image from 'next/image';
import { useLoadingProgress } from '../../services/loadingProgress';
import { login } from '../../helpers/api/auth';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import withoutAuth from '../../components/WithoutAuth';

let loginSchema = Yup.object({
	username: Yup.string().required('Required'),
	password: Yup.string().required('Required'),
});

export const getServerSideProps = withoutAuth(async (): Promise<any> => {
	return {
		props: {},
	};
});

const SignIn = () => {
	const { showLoading } = useLoadingProgress();
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const [cookie, setCookie] = useCookies(['token']);

	const doLogin = async (values: any) => {
		showLoading(true);
		setLoading(true);
		const response = await login(values);
		if (response.success) {
			setCookie('token', response.data.token, {
				path: '/',
				maxAge: 3600, // Expires after 1hr
				sameSite: true,
			});
			router.push('/dashboard');
			setLoading(false);
		} else {
			toast.error(response.message);
			showLoading(false);
			setLoading(false);
		}
	};

	const loginData = useFormik({
		initialValues: {
			username: '',
			password: '',
		},
		onSubmit: async (values) => {
			await doLogin(values);
		},
		validationSchema: loginSchema,
	});

	return (
		<Layout title='Sign in'>
			<div className='grid grid-cols-1 md:grid-cols-5 h-full'>
				<div className='col-span-1 md:col-span-2 flex flex-col md:flex-row md:items-center'>
					<div className='h-[40%] bg-login-hero bg-auditorium-center bg-no-repeat bg-auditorium-size md:hidden'>
						<div className='bg-primary w-full h-full opacity-75'></div>
					</div>
					<div className='flex justify-center pt-10 md:pt-0 rounded-t-[2rem] bg-white mt-[-30px] z-50 md:w-full'>
						<form onSubmit={loginData.handleSubmit} className='w-[90%]'>
							<p className='text-4xl text-primary md:text-2xl md:text-base-content font-weight-bold mb-7 md:mb-4'>
								{' '}
								Sign in{' '}
							</p>
							<div className='form-group'>
								<input
									id='username'
									type='text'
									className='input input-primary'
									placeholder='Matric Number'
									{...loginData.getFieldProps('username')}
								/>
								{loginData.touched.username && loginData.errors.username ? (
									<ValidationError message={loginData.errors.username} />
								) : null}
							</div>
							<div className='form-group mt-2'>
								<PasswordInput
									id='password'
									placeholder='Password'
									{...loginData.getFieldProps('password')}
								/>
								{loginData.touched.password && loginData.errors.password ? (
									<ValidationError message={loginData.errors.password} />
								) : null}
							</div>
							<button
								type='submit'
								className='btn btn-primary btn-block capitalize mt-4'
								disabled={loading}>
								Sign in
							</button>
						</form>
					</div>
				</div>
				<div className='hidden md:block md:col-span-3 bg-primary'>
					<div className='flex flex-col h-full justify-center items-center'>
						<div className='flex flex-col justify-center'>
							<div className='flex justify-center'>
								<Image src={loginBg} alt='illustration' />
							</div>
							<div className='flex justify-center'>
								<span className='text-3xl text-white font-weight-bold w-[80%]'>
									The UNILORIN student portal for practically anyone with a functioning pair
									of eyes.
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default SignIn;
