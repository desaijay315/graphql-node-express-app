const { v4 } = require('uuid');

const Mutation = {
    createNewUser(parent, args, { data }, info) {
        const isEmailExists = data.users.some((user) => user.email === args.email)
        if (isEmailExists) {
            throw new Error('Email already Taken')
        }

        const user = {
            id: v4(),
            name: args.name,
            email: args.email,
            age: args.age
        }
        data.users.push(user)

        return user
    },
    updateUser(parent, args, { data }, info) {
        const user = data.users.find((user) => user.id === args.id)
        if (!user) {
            throw new Error('User does not exist!')
        }

        if (typeof args.email === 'string') {
            const isEmailExists = data.users.some((user) => user.email === args.email)
            if (isEmailExists) {
                throw new Error('Email already Taken')
            }
            user.email = args.email
        }

        if (typeof args.name === 'string') {
            user.name = args.name
        }

        if (typeof args.age !== 'undefined') {
            user.age = args.age
        }

        return user
    },
    deleteUser(parent, args, { data }, info) {
        const isUserExists = data.users.findIndex((user) => user.id === args.author)

        if (!isUserExists) {
            throw new Error('User does not exist!')
        }
        //splice will return the removed items from the array object
        const userdeleted = data.users.splice(isUserExists, 1)
        return userdeleted[0]
    },
    createPost(parent, args, { data }, info) {
        const userExists = data.users.some((user) => user.id === args.author)

        if (!userExists) {
            throw new Error('User does not exist!')
        }

        //use this
        const post = {
            id: v4(),
            title: args.title,
            body: args.body,
            published: args.published,
            author: args.author
        }


        data.posts.push(post)
        return post

    },
    updatePost(parent, args, { data }, info) {
        //posts exists
        const post = data.posts.find((post) => post.id === args.id)

        if (!post) {
            throw new Error('Post does not exist!')
        }

        //user exists - In the real world app, consider this as a session id and validate against the database.
        const userExists = data.users.some((user) => user.id === args.author)

        if (!userExists) {
            throw new Error('User does not exist!')
        }

        if (typeof args.title === 'string') {
            post.title = args.title
        }

        if (typeof args.body === 'string') {
            post.body = args.body
        }

        if (typeof args.published === 'boolean') {
            post.age = args.published
        }

        return post

    },
    createComment(parent, args, { data }, info) {
        //posts exists
        const post = data.posts.some((post) => post.id === args.post)

        if (!post) {
            throw new Error('Post does not exist!')
        }

        //user exists?

        const userExists = data.users.some((user) => user.id === args.author)

        if (!userExists) {
            throw new Error('User does not exist!')
        }

        //use this
        const comment = {
            id: v4(),
            body: args.body,
            author: args.author,
            post: args.post
        }


        data.comments.push(comment);
        return comment

    }
}

export default Mutation;