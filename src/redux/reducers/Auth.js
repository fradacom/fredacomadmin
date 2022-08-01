import {
	AUTH_TOKEN,
	AUTHENTICATED,
	SHOW_AUTH_MESSAGE,
	HIDE_AUTH_MESSAGE,
	SIGNOUT_SUCCESS,
	SHOW_LOADING,
	HIDE_LOADING,
	SET_USER_DATA,
	SAVE_CATEGORIES,
	SAVE_CATEGORY
} from '../constants/Auth';

const initState = {
	loading: false,
	categories: [],
	message: '',
	authUser: null,
	showMessage: false,
	redirect: '/dashboard',
	token: localStorage.getItem(AUTH_TOKEN) ? localStorage.getItem(AUTH_TOKEN) : sessionStorage.getItem(AUTH_TOKEN),
}

const auth = (state = initState, action) => {
	switch (action.type) {
		case SET_USER_DATA: {
			return {
				...state,
				authUser: action.payload
			}
		}
		case SAVE_CATEGORIES: {
			return {
				...state,
				categories: action.categories
			}
		}
		case SAVE_CATEGORY: {
			return {
				...state,
				categories: [...state.categories, action.category]
			}
		}
		case AUTHENTICATED:
			return {
				...state,
				loading: false,
				redirect: '/dashboard',
				token: action.payload?.token,
				authUser: action.payload?.user,
			}
		case SHOW_AUTH_MESSAGE: 
			return {
				...state,
				message: action.message,
				showMessage: true,
				loading: false
			}
		case HIDE_AUTH_MESSAGE: 
			return {
				...state,
				message: '',
				showMessage: false,
			}
		case SIGNOUT_SUCCESS: {
			return {
				...state,
				token: null,
				redirect: '/',
				loading: false
			}
		}
		case SHOW_LOADING: {
			return {
				...state,
				loading: true
			}
		}
		case HIDE_LOADING: {
			return {
				...state,
				loading: false,
			}
		}
		default:
			return state;
	}
}

export default auth