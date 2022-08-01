import fetch from 'auth/FetchInterceptor'

const RequestService = {}

RequestService.getPosts = function (params) {
	return fetch({
		url: 'posts',
		method: 'get',
		params
	})
}

RequestService.createCategory = function (data) {
	return fetch({
		url: '/categories',
		method: 'post',
		headers: {
      'public-request': 'true'
    },
		data: data
	})
}

RequestService.createPost = function (data) {
	return fetch({
		url: '/posts',
		method: 'post',
		headers: {
      'public-request': 'true'
    },
		data: data
	})
}


RequestService.getCategories = function (params) {
	return fetch({
		url: 'categories',
		method: 'get',
		params
	})
}


RequestService.deletePost = function (params) {
	return fetch({
		url: 'posts/'+params,
		method: 'delete',
	})
}

RequestService.deleteCategory = function (params) {
	return fetch({
		url: 'categories/'+params,
		method: 'delete',
	})
}


export default RequestService