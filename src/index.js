import { GraphQLServer, PubSub } from 'graphql-yoga';

//creating a new instance of pubsub
const pubsub = new PubSub();


import data from './data/data';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import User from './resolvers/User';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';
import Subscription from './resolvers/Subscription';

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        User,
        Post,
        Comment,
        Subscription
    },
    context: {
        data,
        pubsub
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