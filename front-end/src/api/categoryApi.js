import { url, headers } from './config'

class CategoryApi {
	static getAllCategories() {
		return fetch(`${url}/categories`, { headers })
		    .then((response) => {
				if (!response.ok) {
					throw Error(response.statusText)
				}
		      	return response
		    })
		    .then((response) => response.json())
	}
}

export default CategoryApi;