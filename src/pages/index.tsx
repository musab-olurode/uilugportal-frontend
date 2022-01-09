export async function getServerSideProps() {
	return {
		props: {},
		redirect: {
			destination: '/auth/signin',
			permanent: false,
		},
	};
}

const Home = () => {
	return <></>;
};

export default Home;
