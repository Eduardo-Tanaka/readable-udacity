import { 
	GET_CATEGORIES,
	ACTIVE_CATEGORY
} from '../actionTypes/categoryTypes'

const initialState = {
  categories: [],
  active: ''
}

function categoryReducer(state = initialState, action) {
	switch (action.type) {
	    case GET_CATEGORIES :
			return {
				...state,
				categories: action.categories,
			}

		case ACTIVE_CATEGORY :
			return {
				...state,
				active: action.category,
			}

	  	default :
	    	return state
	}
}

export default categoryReducer