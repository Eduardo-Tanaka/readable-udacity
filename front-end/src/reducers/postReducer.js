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

import { sortPosts, updateImmutableArray } from '../utils/utils'

const initialState = {
  posts: [],
  post: null,
  sort: 'popular'
}

function postReducer(state = initialState, action) {
	switch (action.type) {
	    case GET_POSTS :
			return {
				...state,
				posts: sortPosts(state.sort, action.posts),
			}

		case GET_POSTS_BY_CATEGORY :
			return {
				...state,
				posts: sortPosts(state.sort, action.posts),
			}

		case GET_POST_DETAIL :
			return {
				...state,
				post: action.post,
			}

		case POST_VOTE :
			return {
				...state,
				posts: sortPosts(state.sort, state.posts.map((item, index) => {
		          return updateImmutableArray(item, action.post)
		        })),
		        post: action.post
			}

		case SORT_POSTS :
			return {
				...state,
				posts: sortPosts(action.sort, action.posts.slice()),
				sort: action.sort
			}

		case ADD_POST :
			return {
				...state,
				posts: state.posts.concat(action.post),
			}

		case DELETE_POST :
			return {
				...state,
        		posts: state.posts.filter(el => el.id !== action.post.id),
			}

		case EDIT_POST :
			return {
				...state,
        		posts: state.posts,
        		post: action.post
			}

	  	default :
	    	return state
	}
}

export default postReducer