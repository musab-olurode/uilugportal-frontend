import { createStore, AnyAction, Store } from 'redux';
import { createWrapper, Context, HYDRATE } from 'next-redux-wrapper';
import { State } from '../interfaces/State';
import { ActionCreators } from '../helpers/enums';

let initialUser = {
	avatar: '',
	signature: '',
	matricNumber: '',
	fullName: '',
	session: '',
	faculty: '',
	department: '',
	course: '',
	level: '',
	gender: '',
	address: '',
	studentEmail: '',
	phoneNumber: '',
	modeOfEntry: '',
	studentShipStatus: '',
	chargesPaid: '',
	dateOfBirth: '',
	stateOfOrigin: '',
	lgaOfOrigin: '',
	levelAdviser: {
		fullName: '',
		email: '',
		phoneNumber: '',
	},
	nextOfKin: {
		fullName: '',
		address: '',
		relationship: '',
		phoneNumber: '',
		email: '',
	},
	guardian: {
		name: '',
		address: '',
		phoneNumber: '',
		email: '',
	},
	sponsor: {
		fullName: '',
		address: '',
		phoneNumber: '',
		email: '',
	},
	semester: {
		type: '',
		number: '',
		year: '',
	},
};

const reducer = (state: State = { server: {}, client: {}, user: initialUser }, action: AnyAction) => {
	switch (action.type) {
		case HYDRATE:
			return {
				...state,
				server: {
					...state.server,
					...action.payload.server,
				},
			};
		case ActionCreators.SERVER:
			return {
				...state,
				server: {
					...state.server,
					...action.payload,
				},
			};
		case ActionCreators.CLIENT:
			return {
				...state,
				client: {
					...state.client,
					...action.payload,
				},
			};
		default:
			return state;
	}
};

// create a makeStore function
const makeStore = (context: Context) => createStore(reducer);

// export an assembled wrapper
export const storeWrapper = createWrapper<Store<State>>(makeStore, {
	debug: false,
});
