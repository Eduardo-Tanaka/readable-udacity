import { 
	GET_CATEGORIES,
	ACTIVE_CATEGORY
} from '../actionTypes/categoryTypes'
import { toast } from 'react-toastify'

import CategoryApi from '../api/categoryApi'

// em produção trocar a mensagem de erro do toast caso caia no catch para mostrar uma mensagem mais amigável para o usuário

function getCategories(categories) {
  	return {
    	type: GET_CATEGORIES,
    	categories
  	}
}

export function fetchCategories() {
	return (dispatch) => {
	    return CategoryApi.getAllCategories()
		    .then((data) => dispatch(getCategories(data.categories)))
		    .catch((error) => {
		    	console.log(error)
		    	toast.error(error)
		    })
	}
}

function activeCategory(category) {
  	return {
    	type: ACTIVE_CATEGORY,
    	category
  	}
}

export function fetchActiveCategory(category) {
	let cat = category.split('/')[1]
	return (dispatch) => {
		toast.dismiss()
		if(cat === "") cat = "all"
		// caso caia na página de edição
		if(cat === "editpost") {
			toast.info("Editing post")
		// caso caia na página de novo post
		} else if(cat === "newpost"){
			toast.info("Writing new post")
		// escolha da categoria
		} else if(category.split('/').length === 2) {
			toast.info(cat + " category selected")
		// caso caia na página de detalhes
		} else {
			toast.info("Viewing post details")
		}
	    return dispatch(activeCategory(cat))
	}
}