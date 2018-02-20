import { 
	GET_COMMENTS,
	POST_VOTE_COMMENT,
	ADD_COMMENT,
	DELETE_COMMENT,
	EDIT_COMMENT
} from '../actionTypes/commentTypes'
import { toast } from 'react-toastify'

import CommentApi from '../api/commentApi'

// em produção trocar a mensagem de erro do toast caso caia no catch para mostrar uma mensagem mais amigável para o usuário

function getComments(comments) {
  	return {
    	type: GET_COMMENTS,
    	comments
  	}
}

export function fetchComments(id) {
	return (dispatch) => {
	    return CommentApi.getComments(id)
		    .then((data) => dispatch(getComments(data)))
		    .catch((error) => {
		    	console.log(error)
		    	toast.error(error)
		    })
	}
}

function postVoteComment(comment) {
	return {
		type: POST_VOTE_COMMENT,
		comment
	}
}

export function fetchPostVoteComment(option, id) {
	return (dispatch) => {
	    return CommentApi.postVote(option, id)
		    .then((data) => {
		    	dispatch(postVoteComment(data))
		    	toast.success("Vote Saved!")
		    })
		    .catch((error) => {
		    	console.log(error)
		    	toast.error(error)
		    })
	}
}

function addComment(comment) {
	return {
		type: ADD_COMMENT,
		comment
	}
}

export function fetchAddComment(comment) {
	return (dispatch) => {
	    return CommentApi.addComment(comment)
		    .then((data) => {
		    	dispatch(addComment(data))
		    	toast.success("Comment Created")
		    })
		    .catch((error) => {
		    	console.log(error)
		    	toast.error(error)
		    })
	}
}

function deleteComment(comment) {
	return {
		type: DELETE_COMMENT,
		comment
	}
}

export function fetchDeleteComment(id) {
	return (dispatch) => {
	    return CommentApi.deleteComment(id)
		    .then((data) => {
		    	dispatch(deleteComment(data))
		    	toast.success("Comment Deleted")
		    })
		    .catch((error) => {
		    	console.log(error)
		    	toast.error(error)
		    })
	}
}

function editComment(comment) {
	return {
		type: EDIT_COMMENT,
		comment
	}
}

export function fetchEditComment(comment) {
	return (dispatch) => {
	    return CommentApi.editComment(comment)
		    .then((data) => {
		    	dispatch(editComment(data))
		    	toast.success("Comment Edited")
		    })
		    .catch((error) => {
		    	console.log(error)
		    	toast.error(error)
		    })
	}
}