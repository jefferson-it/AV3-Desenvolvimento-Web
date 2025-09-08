import { getCollection, toObjectId } from "../../database/database";

const FeedBackColl = getCollection('feedbacks');

/**
 * @type {import("../../@types/Api").routerModule}
 */
export const getFeedBackInPost = async (req, res) => {
    const { postId } = req.params;
    const isValidId = uuid4.valid(id);

    if (!isValidId) return res.status(400).json({
        flash: {
            message: `O id ${id} é invalido`,
            type: 'danger'
        }
    })

    const list = FeedBackColl.find({ post_id: postId }).toArray();

    res.json(list)
}

export const getFeedBackOne = async (req, res) => {
    const { id } = req.params;
    const item = FeedBackColl.findOne({ _id: toObjectId(id) });

    res.json(item)
}