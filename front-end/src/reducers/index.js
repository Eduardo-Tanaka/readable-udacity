import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import postReducer from './postReducer'
import categoryReducer from './categoryReducer'
import commentReducer from './commentReducer'

const reducer = combineReducers({
  postReducer		: postReducer,
  categoryReducer	: categoryReducer,
  commentReducer	: commentReducer,
  loadingBar 		: loadingBarReducer,
  router 			: routerReducer,
  form 				: formReducer,
});

export default reducer;