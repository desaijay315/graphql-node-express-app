const Subscription = {
    post: {
        subscribe(parent, args, ctx, info) {
            return ctx.pubsub.asyncIterator('post')
        }
    },
    user: {
        subscribe(parent, args, ctx, info) {
            return ctx.pubsub.asyncIterator('user')
        }
    }
}

export default Subscription;