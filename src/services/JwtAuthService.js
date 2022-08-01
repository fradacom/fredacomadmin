import fetch from 'auth/FetchInterceptor'

const JwtAuthService = {}

JwtAuthService.login = function (data) {
	return fetch({
		url: '/user/login',
		method: 'post',
		headers: {
      'public-request': 'true'
    },
		data: data
	})
}



JwtAuthService.user = function (params) {
	return fetch({
		url: 'auth/user',
		method: 'get',
		params
	})
}


export default JwtAuthService