import Head from 'next/head';
import React from 'react';

const PrivacyPolicy = () => {
	return (
		<>
			<Head>
				<title>Privacy Policy</title>
			</Head>
			<div className='mx-auto max-w-[60rem] px-4 sm:px-8 md:px-0'>
				<h2 className='text-5xl font-bold mb-7 mt-10'>Privacy Policy</h2>
				<p className='mb-4'>
					<span className='block mb-2'>Effective date: August 6, 2023</span>

					<strong className='block mb-2'>1. Introduction</strong>

					<span className='block mb-4'>
						Probitas (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) values
						your privacy and is committed to protecting your personal
						information. This Privacy Policy outlines how we collect, use,
						store, and disclose your data when you use the Probitas mobile
						application (the &quot;App&quot;).
					</span>

					<strong className='block mb-2'>2. Information We Collect</strong>

					<p className='block mb-4'>
						<span className='block mb-4'>
							We may collect the following personal information from you:
						</span>

						<ul className='list-disc list-inside'>
							<li>Full name</li>
							<li>Email address</li>
							<li>University of Ilorin student matric number</li>
							<li>Profile picture</li>
							<li>Posts and interactions within the App</li>
							<li>Customized calendar and timetable data</li>
							<li>
								User-submitted academic materials (e.g., past questions and
								study materials)
							</li>
						</ul>
					</p>

					<strong className='block mb-2'>3. How We Use Your Information</strong>

					<p className='block mb-4'>
						<span className='block mb-4'>
							We use your information for the following purposes:
						</span>

						<ul className='list-disc list-inside'>
							<li>
								Providing and Improving Services: We use your personal
								information to provide you with access to Probitas&apos;
								features and functionalities. This includes displaying your
								academic results and CGPA, personalized calendars, and
								timetables.
							</li>
							<li>
								Communication: We may use your email address to send you
								important updates, announcements, and notifications related to
								the App, university events, and relevant news.
							</li>
							<li>
								Posts: The integrated posts platform within Probitas allows you
								to connect and collaborate with other University of Ilorin
								students. Your posts are used solely for facilitating
								communication and collaboration.
							</li>
							<li>
								Academic Materials: We use the academic materials you upload to
								the App to build a repository of past questions and study
								materials, enhancing the learning experience for all users.
							</li>
							<li>
								Advertising: If you are an entrepreneur or business owner, we
								may use your advertising preferences to display targeted ads
								within the App. However, we do not share your personal
								information with advertisers.
							</li>
							<li>
								Analytics and Improvements: We may use non-personal information
								for analytical purposes, to improve the App&apos;s performance,
								and to identify usage trends.
							</li>
						</ul>
					</p>

					<strong className='block mb-2'>4. Data Security</strong>

					<p className='block mb-4'>
						We take data security seriously and have implemented appropriate
						measures to protect your personal information from unauthorized
						access, disclosure, or destruction.
					</p>

					<strong className='block mb-2'>5. Data Retention</strong>

					<p className='block mb-4'>
						We retain your personal information for as long as necessary to
						provide the services you requested or as required by law.
						Non-personal information may be retained for analytical purposes.
					</p>

					<strong className='block mb-2'>6. Third-Party Services</strong>

					<p className='block mb-4'>
						Probitas may integrate third-party services for analytics,
						advertising, or other functionalities. These third parties may
						collect information from you, subject to their respective privacy
						policies.
					</p>

					<strong className='block mb-2'>7. Children&apos;s Privacy</strong>

					<p className='block mb-4'>
						Probitas is not intended for children under the age of 13. We do not
						knowingly collect personal information from individuals under 13
						years of age.
					</p>

					<strong className='block mb-2'>8. Changes to this Policy</strong>

					<p className='block mb-4'>
						We may update this Privacy Policy from time to time. We will notify
						you of any changes by posting the new Privacy Policy on this page.
						You are advised to review this Privacy Policy periodically for any
						changes. Your continued use of Probitas after the changes are made
						will indicate your acceptance of the revised policy.
					</p>

					<strong className='block mb-2'>9. Contact Us</strong>

					<p className='block mb-4'>
						If you have any questions, concerns, or requests regarding this
						Privacy Policy, please contact us at{' '}
						<a
							className='text-primary underline'
							href='mailto:olurodemusab@gmail.com'>
							olurodemusab@gmail.com
						</a>
						.
					</p>

					<p className='block mb-4'>
						By using Probitas, you agree to the terms outlined in this Privacy
						Policy. Please read this policy carefully and regularly check for
						updates.
					</p>
				</p>
			</div>
		</>
	);
};

export default PrivacyPolicy;
