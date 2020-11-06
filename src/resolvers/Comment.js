const Comment = {
    author(parent, args, { data }, info) {
        return data.users.find(user => {
            return user.id === parent.author;
        });
    },
    post(parent, args, { data }, info) {
        return data.posts.find(post => post.id === parent.post);
    }
}

export default Comment;
