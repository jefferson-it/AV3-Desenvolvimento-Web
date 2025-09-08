import { getCollection } from "../../database/database.js";

const PostsColl = getCollection('posts');
const FeedBackColl = getCollection('feedbacks');

/**
 * @type {import("../../@types/Api").routerModule}
 */
export const newFeedBack = async (req, res) => {
    const { postId, content } = req.params;

    if (!content) return res.status(400).json({});

    const isValidId = uuid4.valid(id);

    if (!isValidId) return res.status(400).json({
        flash: {
            message: `O id ${id} é invalido`,
            type: 'danger'
        }
    })

    const post = await PostsColl.findOne({ post_id: postId }, {
        projection: {
            author: 1,
            post_id: 1
        }
    });

    if (!post || post.disable) return res.status(404).json({
        flash: {
            message: 'O post solicitado é inexistente',
            type: 'danger'
        }
    })

    /**
     * @type {import("../../@types/database/Feedback").FeedBack}
     */
    const feedBack = {
        author: req.session.user.id,
        created_at: new Date(),
        content,
        post_id: postId
    };

    const result = await FeedBackColl.insertOne(feedBack);

    res.json({
        id: result.insertedId,
        flash: {
            message: 'Comentário publicado com sucesso',
            type: 'success'
        }
    })
}