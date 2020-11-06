const User = {
    posts(parent, args, { data }, info) {
        return data.posts.filter((post) => {
            return post.author === parent.id
        })
    },
    comments(parent, args, { data }, info) {
        return data.comments.filter(comment => {
            return comment.author === parent.id;
        })
    }
}

export default User;