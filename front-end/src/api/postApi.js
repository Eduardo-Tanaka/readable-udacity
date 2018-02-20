import { url, headers } from './config'
import uuidv1 from 'uuid/v1'

class PostApi {
	static getAllPosts() {
		return fetch(`${url}/posts`, { headers })
		    .then((response) => {
				if (!response.ok) {
					throw Error(response.statusText)
				}
		      	return response
		    })
		    .then((response) => response.json())
	}

	static getPostsByCategory(category) {
		return fetch(`${url}/${category}/posts`, { headers })
		    .then((response) => {
				if (!response.ok) {
					throw Error(response.statusText)
				}
		      	return response
		    })
		    .then((response) => response.json())
	}

	static getPostDetail(id) {
		return fetch(`${url}/posts/${id}`, { headers })
		    .then((response) => {
				if (!response.ok) {
					throw Error(response.statusText)
				}
		      	return response
		    })
		    .then((response) => response.json())
	}

	static postVote(option, id) {
		return fetch(`${url}/posts/${id}`, { 
				method: 'POST', 
				headers, 
				body: JSON.stringify({ option: option }) 
			})
		    .then((response) => {
				if (!response.ok) {
					throw Error(response.statusText)
				}
		      	return response
		    })
		    .then((response) => response.json())
	}

	static addPost(post) {
		const { author, title, body, category } = post;
		return fetch(`${url}/posts/`, { 
				method: 'POST',
				body: JSON.stringify({
				    id: uuidv1(),
				    title: title,
				    body: body,
				    author: author,
				    timestamp: new Date().getTime(),
				    category: category
				}),
				headers 
			})
		    .then((response) => {
				if (!response.ok) {
					throw Error(response.statusText)
				}
		      	return response
		    })
		    .then((response) => response.json())
	}

	static deletePost(id) {
		return fetch(`${url}/posts/${id}`, { 
				method: 'DELETE',
				headers 
			})
		    .then((response) => {
				if (!response.ok) {
					throw Error(response.statusText)
				}
		      	return response
		    })
		    .then((response) => response.json())
	}

	static editPost(post) {
		const { title, body, category, id } = post;
		return fetch(`${url}/posts/${id}`, { 
				method: 'PUT',
				body: JSON.stringify({
				    title: title,
				    body: body,
				    category: category
				}),
				headers 
			})
		    .then((response) => {
				if (!response.ok) {
					throw Error(response.statusText)
				}
		      	return response
		    })
		    .then((response) => response.json())
	}
}

export default PostApi;