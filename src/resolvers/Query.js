const Query = {
    users(parent, args, { data }, info) {
        if (!args.query) {
            return data.users
        }
        return data.users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase())
        })
    },
    greeting(parent, args, ctx, info) {
        if (args.name) {
            return `Hello ${args.name}`
        } else {
            return `hello`
        }
    },
    getMyProfileData() {
        return {
            id: '1234',
            name: 'mike',
            email: 'a@a.com',
            age: 10
        }
    },
    post(parent, args, { data }, info) {
        if (!args.query) {
            return posts;
        }
        return data.posts.filter((post) => {
            const body = post.body.toLowerCase().includes(args.query.toLowerCase())
            const title = post.title.toLowerCase().includes(args.query.toLowerCase())
            return body || title;
        })
    },
    comments(parent, args, { data }, info) {
        return data.comments;
    },
}

export default Query;