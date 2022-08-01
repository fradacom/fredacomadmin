import axios from 'axios'
import { API_BASE_URL, AUTH_PREFIX_PATH } from 'configs/AppConfig'
import history from '../history'
import { AUTH_TOKEN, REFRESH_TOKEN } from 'redux/constants/Auth'

const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000
})

// Config
const TOKEN_PAYLOAD_KEY = 'authorization'

// API Request interceptor
service.interceptors.request.use(config => {
	const jwtToken = localStorage.getItem(AUTH_TOKEN);
	const sessionToken = sessionStorage.getItem(AUTH_TOKEN);
	
	if (jwtToken) {
		config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${jwtToken}`
	}else{
		config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${sessionToken}`
	}

	 return config
}, 
(error) => {
  Promise.reject(error)
})

// API response interceptor
service.interceptors.response.use( (response) => {
	return response.data
}, 
async (error) => {
	// Remove token and redirect 
	const originalConfig = error.config;
	if (originalConfig.url !== "/auth/signin" && error.response) {
		if (error.response?.status === 401) {
			if(localStorage.getItem(REFRESH_TOKEN)){
				const data = {
					refreshToken: localStorage.getItem(REFRESH_TOKEN)
				};
				try {
					const response = await service.post(`${API_BASE_URL}/auth/token`, data);
					const { accessToken } = response.data;
					localStorage.setItem(AUTH_TOKEN, accessToken);
					return service(originalConfig);
				} catch (_error) {
					return Promise.reject(_error);
				}
			}else{
				localStorage.removeItem(AUTH_TOKEN);
				localStorage.removeItem(REFRESH_TOKEN);
				sessionStorage.removeItem(AUTH_TOKEN);
				history.push(`${AUTH_PREFIX_PATH}/login`);
				// window.location.reload();
				return Promise.reject(error);
			}
		}
	}
	return Promise.reject(error);

});

export default service