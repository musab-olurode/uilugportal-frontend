import Layout from '../../layouts/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import ValidationError from '../../components/ValidationError';
import PasswordInput from '../../components/PasswordInput';
import loginBg from '../../../public/images/login-img.png';
import loginMobileBg from '../../../public/images/auditorium-bg.png';
import Image from 'next/image';
import { useLoadingProgress } from '../../services/loadingProgress';
import { login } from '../../helpers/api/auth';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import withoutAuth from '../../components/WithoutAuth';

let loginSchema = Yup.object({
	matricNumber: Yup.string().required('Required'),
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
	// eslint-disable-next-line no-unused-vars
	const [_, setCookie] = useCookies(['token']);

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
			console.log(response);

			toast.error(response.message);
			showLoading(false);
			setLoading(false);
		}
	};

	const loginData = useFormik({
		initialValues: {
			matricNumber: '',
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
				<div className='col-span-1 md:col-span-2 flex flex-col md:flex-row md:items-center relative'>
					<div className='h-[40%] bg-auditorium-center bg-no-repeat bg-auditorium-size md:hidden flex overflow-hidden relative'>
						<Image
							src={loginMobileBg}
							alt='auditorium'
							width={900}
							height={500}
							className='aspect-video object-cover rotate-1 scale-105'
						/>
						<div className='bg-primary w-full h-full opacity-60 absolute'></div>
					</div>
					<div className='flex justify-center pt-10 md:pt-0 rounded-t-[2rem] bg-base-100 mt-[-30px] z-50 md:w-full'>
						<form onSubmit={loginData.handleSubmit} className='w-[90%]'>
							<p className='text-4xl text-primary md:text-2xl md:text-base-content font-weight-bold mb-7 md:mb-4'>
								{' '}
								Sign in{' '}
							</p>
							<div className='form-group'>
								<input
									id='matricNumber'
									type='text'
									className='input input-primary'
									placeholder='Matric Number'
									{...loginData.getFieldProps('matricNumber')}
								/>
								{loginData.touched.matricNumber &&
								loginData.errors.matricNumber ? (
									<ValidationError message={loginData.errors.matricNumber} />
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
					<a
						className='w-full flex justify-end absolute bottom-16 md:bottom-2 right-5'
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
				</div>
				<div className='hidden md:block md:col-span-3 bg-primary'>
					<div className='flex flex-col h-full justify-center items-center'>
						<div className='flex flex-col justify-center'>
							<div className='flex justify-center'>
								<Image src={loginBg} alt='illustration' />
							</div>
							<div className='flex justify-center'>
								<span className='text-3xl text-white font-weight-bold w-[80%]'>
									The UNILORIN student portal for practically anyone with a
									functioning pair of eyes.
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
