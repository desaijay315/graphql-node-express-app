const { GraphQLServer } = require('graphql-yoga');
const { v4 } = require('uuid');


//dummy users data
const users = [{
    id: "1234",
    name: "jay desai",
    email: "jay@jay.com",
    age: 27
}, {
    id: "5678",
    name: "jhon",
    email: "jhon@jhon.com",
    age: 27
},
{
    id: "8910",
    name: "ram",
    email: "ram@ram.com",
    age: 27
}];

//array of posts
const posts = [{
    id: '123',
    title: 'my new blog',
    body: 'new blog body',
    published: true,
    author: '8910'
}, {
    id: '456',
    title: 'blog 2',
    body: 'blog body 2',
    published: false,
    author: '1234'
},
{
    id: '789',
    title: 'blog 3',
    body: 'blog body 3',
    published: true,
    author: '5678'
}];

// comments on the posts
const comments = [
    {
        id: '222',
        body: 'This post is amazing',
        author: '1234',
        post: '789'
    }
]



//Custom Types

const typeDefs = `
    type Query {
        greeting(name: String): String!
        users(query: String):[User!]!
        getMyProfileData: User!
        post(query: String):[Post!]!
        comments: [Comment!]!
    }

    type User{
        id: ID!
        name: String!
        email: String!
        age: Int
        posts:[Post!]!
        comments: [Comment!]!
    }

    type Post{
        id:ID!
        title:String!
        body:String!
        published:Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment{
        id:ID!
        body:String!
        author: User!
        post: Post!
    }

    type Mutation{
        createNewUser(name: String!, email: String!, age: Int): User!
        deleteUser(id: ID!): User!
        updateUser(id: ID!, name: String, email: String, age: Int): User!
        createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
        updatePost(id: ID!,title: String!, body: String!, published: Boolean!, author: ID!): Post!
        createComment(body: String!,author: ID!, post: ID!): Comment!
        updateComment(id: ID!, body: String!,author: ID!, post: ID!): Comment!
    }
`

const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users
            }
            return users.filter((user) => {
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
        post(parent, args, ctx, info) {
            if (!args.query) {
                return posts;
            }
            return posts.filter((post) => {
                const body = post.body.toLowerCase().includes(args.query.toLowerCase())
                const title = post.title.toLowerCase().includes(args.query.toLowerCase())
                return body || title;
            })
        },
        comments(parent, args, ctx, info) {
            return comments;
        },
    },

    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter(comment => comment.post === parent.id);
        }

    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter(comment => {
                return comment.author === parent.id;
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find(user => {
                return user.id === parent.author;
            });
        },
        post(parent, args, ctx, info) {
            return posts.find(post => post.id === parent.post);
        }
    },
    Mutation: {
        createNewUser(parent, args, ctx, info) {
            const isEmailExists = users.some((user) => user.email === args.email)
            if (isEmailExists) {
                throw new Error('Email already Taken')
            }

            const user = {
                id: v4(),
                name: args.name,
                email: args.email,
                age: args.age
            }
            users.push(user)

            return user
        },
        updateUser(parent, args, ctx, info) {
            const user = users.find((user) => user.id === args.id)
            if (!user) {
                throw new Error('User does not exist!')
            }

            if (typeof args.email === 'string') {
                const isEmailExists = users.some((user) => user.email === args.email)
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
        deleteUser(parent, args, ctx, info) {
            const isUserExists = users.findIndex((user) => user.id === args.author)

            if (!isUserExists) {
                throw new Error('User does not exist!')
            }
            //splice will return the removed items from the array object
            const userdeleted = users.splice(isUserExists, 1)
            return userdeleted[0]
        },
        createPost(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.author)

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


            posts.push(post)
            return post

        },
        updatePost(parent, args, ctx, info) {
            //posts exists
            const post = posts.find((post) => post.id === args.id)

            if (!post) {
                throw new Error('Post does not exist!')
            }

            //user exists - In the real world app, consider this as a session id and validate against the database.
            const userExists = users.some((user) => user.id === args.author)

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
        createComment(parent, args, ctx, info) {
            //posts exists
            const post = posts.some((post) => post.id === args.post)

            if (!post) {
                throw new Error('Post does not exist!')
            }

            //user exists?

            const userExists = users.some((user) => user.id === args.author)

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


            comments.push(comment);
            return comment

        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

// since the property name matches up with a variable with the same name, i am using object property shorthand

const options = {
    port: 8005
}

server.start(options, ({ port }) =>
    console.log(
        `Server started, listening on port ${port} for incoming requests.`,
    ),
)