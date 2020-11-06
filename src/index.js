const { GraphQLServer } = require('graphql-yoga');

import data from './data/data';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import User from './resolvers/User';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        User,
        Post,
        Comment
    },
    context: {
        data
    }
});


const options = {
    port: 8005
}

server.start(options, ({ port }) =>
    console.log(
        `Server started, listening on port ${port} for incoming requests.`,
    ),
)