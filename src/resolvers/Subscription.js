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
    },
    comment: {
        subscribe(parent, args, ctx, info) {
            const post = ctx.data.posts.find((post) => post.id === args.post && post.published)

            if (!post) {
                throw new Error('Post does not exist!')
            }
            return ctx.pubsub.asyncIterator('comment')
        }
    }
}

export default Subscription;