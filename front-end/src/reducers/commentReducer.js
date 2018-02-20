import { 
	GET_COMMENTS,
	POST_VOTE_COMMENT,
	ADD_COMMENT,
	DELETE_COMMENT,
	EDIT_COMMENT
} from '../actionTypes/commentTypes'

import { sortPosts, updateImmutableArray } from '../utils/utils'

const initialState = {
  comments: [],
}

function commentReducer(state = initialState, action) {
	switch (action.type) {
	    case GET_COMMENTS :
			return {
				...state,
				comments: sortPosts('popular', action.comments)
			}

		case POST_VOTE_COMMENT :
			return {
				...state,
				comments: sortPosts('popular', state.comments.map((item, index) => {
		          return updateImmutableArray(item, action.comment)
		        })),
			}

		case ADD_COMMENT :
			return {
				...state,
				comments: state.comments.concat(action.comment),
			}

		case DELETE_COMMENT:
			return {
				...state,
        		comments: state.comments.filter(el => el.id !== action.comment.id),
			}

		case EDIT_COMMENT:
			return {
				...state,
        		comments: state.comments.map((item, index) => {
		          return updateImmutableArray(item, action.comment)
		        }),
			}


	  	default :
	    	return state
	}
}

export default commentReducer