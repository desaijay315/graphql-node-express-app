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


const data = {
    posts,
    comments,
    users
}

export { data as default };