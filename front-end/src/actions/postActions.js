import { 
	GET_POSTS,
	GET_POSTS_BY_CATEGORY,
	GET_POST_DETAIL,
	POST_VOTE,
	SORT_POSTS,
	ADD_POST,
	DELETE_POST,
	EDIT_POST
} from '../actionTypes/postTypes'
import { toast } from 'react-toastify';

import PostApi from '../api/postApi'

// em produção trocar a mensagem de erro do toast caso caia no catch para mostrar uma mensagem mais amigável para o usuário

function getPosts(posts) {
  	return {
    	type: GET_POSTS,
    	posts
  	}
}

export function fetchPosts() {
	return (dispatch) => {
	    return PostApi.getAllPosts()
		    .then((data) => {
		    	dispatch(getPosts(data))
		    })
		    .catch((error) => {
		    	console.log(error)
		    	toast.error(error)
		    })
	}
}

function getPostsByCategory(posts) {
  	return {
    	type: GET_POSTS_BY_CATEGORY,
    	posts
  	}
}

export function fetchPostsByCategory(category) {
	return (dispatch) => {
	    return PostApi.getPostsByCategory(category)
		    .then((data) => {
		    	dispatch(getPostsByCategory(data))
		    })
		    .catch((error) => {
		    	console.log(error)
		    	toast.error(error)
		    })
	}
}

function getPostDetail(post) {
	return {
		type: GET_POST_DETAIL,
		post
	}
}

export function fetchPostDetail(id) {
	return (dispatch) => {
	    return PostApi.getPostDetail(id)
		    .then((data) => dispatch(getPostDetail(data)))
		    .catch((error) => {
		    	console.log(error)
		    	toast.error(error)
		    })
	}
}

function postVote(post) {
	return {
		type: POST_VOTE,
		post
	}
}

export function fetchPostVote(option, id) {
	return (dispatch) => {
	    return PostApi.postVote(option, id)
		    .then((data) => {
		    	dispatch(postVote(data))
			    toast.success("Vote Saved!")
		    })
		    .catch((error) => {
		    	console.log(error)
		    	toast.error(error)
		    })
	}
}

export function sortPosts(sort, posts) {
	toast.info("ordered posts by " + sort)
	return {
		type: SORT_POSTS,
		posts,
		sort
	}
}

function addPost(post) {
	return {
		type: ADD_POST,
		post
	}
}

export function fetchAddPost(post) {
	toast.dismiss()
	return (dispatch) => {
	    return PostApi.addPost(post)
		    .then((data) => {
		    	dispatch(addPost(data))
		    	toast.success("Post Created.")
		    })
		    .catch((error) => {
		    	console.log(error)
		    	toast.error(error)
		    })
	}
}

function deletePost(post) {
	return {
		type: DELETE_POST,
		post
	}
}

export function fetchDeletePost(id) {
	toast.dismiss()
	return (dispatch) => {
	    return PostApi.deletePost(id)
		    .then((data) => {
		    	dispatch(deletePost(data))
		    	toast.success("Post Deleted")
		    })
		    .catch((error) => {
		    	console.log(error)
		    	toast.error(error)
		    })
	}
}

function editPost(post) {
	return {
		type: EDIT_POST,
		post
	}
}

export function fetchEditPost(post) {
	toast.dismiss()
	return (dispatch) => {
	    return PostApi.editPost(post)
		    .then((data) => {
		    	dispatch(editPost(data))
		    	toast.success("Post Edited")
		    })
		    .catch((error) => {
		    	console.log(error)
		    	toast.error(error)
		    })
	}
}