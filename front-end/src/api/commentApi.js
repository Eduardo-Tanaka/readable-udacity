import { url, headers } from './config'
import uuidv1 from 'uuid/v1'

class CommentApi {
	static getComments(id) {
		return fetch(`${url}/posts/${id}/comments`, { headers })
		    .then((response) => {
				if (!response.ok) {
					throw Error(response.statusText)
				}
		      	return response
		    })
		    .then((response) => response.json())
	}

	static postVote(option, id) {
		return fetch(`${url}/comments/${id}`, { 
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

	static addComment(comment) {
		const { author, body, id } = comment;
		return fetch(`${url}/comments/`, { 
				method: 'POST', 
				headers, 
				body: JSON.stringify({ 
					id: uuidv1(),
				    body: body,
				    author: author,
				    timestamp: new Date().getTime(),
				    parentId: id
				}) 
			})
		    .then((response) => {
				if (!response.ok) {
					throw Error(response.statusText)
				}
		      	return response
		    })
		    .then((response) => response.json())
	}

	static deleteComment(id) {
		return fetch(`${url}/comments/${id}`, { 
				method: 'DELETE', 
				headers, 
			})
		    .then((response) => {
				if (!response.ok) {
					throw Error(response.statusText)
				}
		      	return response
		    })
		    .then((response) => response.json())
	}

	static editComment(comment) {
		const { body, id } = comment;
		return fetch(`${url}/comments/${id}`, { 
				method: 'PUT', 
				headers,
				body: JSON.stringify({ 
				    body: body,
				    timestamp: new Date().getTime(),
				}) 
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

export default CommentApi;