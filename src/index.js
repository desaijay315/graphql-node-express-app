import { GraphQLServer } from 'graphql-yoga';

//creating a new instance of pubsub
// const pubsub = new PubSub();

//import redis pubsub from graphql
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';


const options = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT ? process.env.REDIS_PORT : '6379',
    retryStrategy: times => {
        // reconnect after
        return Math.min(times * 50, 2000);
    }
};

const pubsub = new RedisPubSub({
    publisher: new Redis(options),
    subscriber: new Redis(options)
});


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


const opt = {
    port: 8005
}

server.start(opt, ({ port }) =>
    console.log(
        `Server started, listening on port ${port} for incoming requests.`,
    ),
);
