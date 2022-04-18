import { GetServerSidePropsContext, NextPage } from 'next';
import Image from 'next/image';
import { connect } from 'react-redux';
import withAuth from '../../components/WithAuth';
import { State } from '../../interfaces/State';
import { IUserProfile } from '../../interfaces/UserProfile';
import Layout from '../../layouts/Layout';
import avatarImg from '../../../public/images/avatar.png';
import { normalizeName } from '../../helpers';
import ProfileDetailsSection from '../../components/ProfileDetailsSection';

export const getServerSideProps = withAuth(
	async (context: GetServerSidePropsContext, results: any): Promise<any> => {
		return {
			props: {
				user: results.user,
			},
		};
	}
);

const Profile: NextPage<State> = ({ server }) => {
	const user: IUserProfile = server.user;
	return (
		<Layout title='Profile' user={user}>
			<div>
				<div className='flex flex-col w-full mt-6'>
					<div className='h-12 md:h-24 bg-primary rounded-xl'></div>
					<div className='md:text-3xl font-bold flex flex-row items-center'>
						<div className='avatar md:ml-2 mr-2 mt-[-20px] md:mt-[-40px]'>
							<div className='rounded-full w-11 h-11 md:w-[90px] md:h-[90px]'>
								<Image
									src={user?.avatar ?? avatarImg}
									width={90}
									height={90}
									alt='avatar'
								/>
							</div>
						</div>
						<span>
							{normalizeName(user.fullName)}
							<p className='text-2xs md:text-xs text-gray-400'>
								{user.studentEmail}
							</p>
						</span>
					</div>
				</div>

				<div className='flex flex-col w-full mt-6'>
					<div className='text-lg md:text-2xl font-bold'>Personal Details</div>
					<div className='divider mt-0'></div>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
						<ProfileDetailsSection
							title='Matric Number'
							value={user.matricNumber}
						/>
						<ProfileDetailsSection title='Level' value={user.level} />
						<ProfileDetailsSection
							title='Full Name'
							value={normalizeName(user.fullName)}
						/>
						<ProfileDetailsSection
							title='Current Session'
							value={user.semester.year}
						/>
						<ProfileDetailsSection title='Faculty' value={user.faculty} />
						<ProfileDetailsSection title='Department' value={user.department} />
						<ProfileDetailsSection title='Programme' value={user.course} />
						<ProfileDetailsSection title='Sex' value={user.gender} />
						<ProfileDetailsSection
							title='Permanent/Home Address'
							value={user.address}
						/>
						<ProfileDetailsSection
							title='Student Email'
							value={user.studentEmail}
							customValueClass='text-sm'
						/>
						<ProfileDetailsSection
							title='Phone Number'
							value={user.phoneNumber}
						/>
						<ProfileDetailsSection
							title='Mode of Entry'
							value={user.modeOfEntry}
						/>
						<ProfileDetailsSection
							title='Studentship Status'
							value={user.studentShipStatus}
						/>
						<ProfileDetailsSection
							title='Charges Paid'
							value={user.chargesPaid}
						/>
						<ProfileDetailsSection
							title='Date of Birth'
							value={user.dateOfBirth}
						/>
						<ProfileDetailsSection
							title='State of Origin'
							value={user.stateOfOrigin}
						/>
						<ProfileDetailsSection
							title='LGA of Origin'
							value={user.lgaOfOrigin}
						/>
					</div>
				</div>

				<div className='flex flex-col w-full mt-6'>
					<div className='text-lg md:text-2xl font-bold'>
						Level Adviser Details
					</div>
					<div className='divider mt-0'></div>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
						<ProfileDetailsSection
							title='Full Name'
							value={normalizeName(user.levelAdviser.fullName)}
						/>
						<ProfileDetailsSection
							title='Phone Number'
							value={user.levelAdviser.phoneNumber}
						/>
						<ProfileDetailsSection
							title='Email'
							value={user.levelAdviser.email}
						/>
					</div>
				</div>

				<div className='flex flex-col w-full mt-6'>
					<div className='text-lg md:text-2xl font-bold'>
						Next Of Kin Details
					</div>
					<div className='divider mt-0'></div>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
						<ProfileDetailsSection
							title='Full Name'
							value={user.nextOfKin.fullName}
						/>
						<ProfileDetailsSection
							title='Relationship'
							value={user.nextOfKin.relationship}
						/>
						<ProfileDetailsSection
							title='Phone Number'
							value={user.nextOfKin.phoneNumber}
						/>
						<ProfileDetailsSection title='Email' value={user.nextOfKin.email} />
					</div>
				</div>

				<div className='flex flex-col w-full mt-6'>
					<div className='text-lg md:text-2xl font-bold'>Guardian Details</div>
					<div className='divider mt-0'></div>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
						<ProfileDetailsSection title='Full Name' value={user.lgaOfOrigin} />
						<ProfileDetailsSection
							title='Address'
							value={normalizeName(user.guardian.name)}
						/>
						<ProfileDetailsSection
							title='Phone'
							value={user.guardian.phoneNumber}
						/>
						<ProfileDetailsSection title='Email' value={user.guardian.email} />
					</div>
				</div>

				<div className='flex flex-col w-full mt-6'>
					<div className='text-lg md:text-2xl font-bold'>Sponsor Details</div>
					<div className='divider mt-0'></div>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
						<ProfileDetailsSection
							title='Full Name'
							value={user.sponsor.fullName as string}
						/>
						<ProfileDetailsSection
							title='Address'
							value={normalizeName(user.sponsor.address)}
						/>
						<ProfileDetailsSection
							title='Phone'
							value={user.sponsor.phoneNumber}
						/>
						<ProfileDetailsSection title='Email' value={user.sponsor.email} />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default connect((state: State) => state)(Profile);
