// função de ordenação dos posts
export const sortPosts = (type, posts) => {
	return posts.sort((a, b) => {
  	if (type === 'date') {
    		return b.timestamp - a.timestamp
  	}
  	else if (type === 'popular') {
    		return b.voteScore - a.voteScore
  	}
    else if (type === 'unpopular') {
        return a.voteScore - b.voteScore
    }
    else if(type === 'hot') {
      return b.commentCount - a.commentCount
    }
	})
}

export function updateImmutableArray(item, action) {
	if(item.id !== action.id) {
  	// This isn't the item we care about - keep it as-is
  	return item;
	}

	// Otherwise, this is the one we want - return an updated value
	return {
		...item,
	  ...action
	}  
}