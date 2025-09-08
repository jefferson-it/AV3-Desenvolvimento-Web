import uuid4 from "uuid4";
import { getCollection, toObjectId } from "../../database/database.js";

const PostsColl = getCollection('posts');

/**
 * @type {import("../../@types/Api").routerModule}
 */
export const likePost = async (req, res) => {
    const { id } = req.params;
    const isValidId = uuid4.valid(id);

    if (!isValidId) return res.status(400).json({
        flash: {
            message: `O id ${id} é invalido`,
            type: 'danger'
        }
    })

    const post = await PostsColl.findOne({ post_id: id }, {
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

    const data = await PostsColl.findOneAndUpdate(
        { post_id: id },
        [
            {
                $set: {
                    likes: {
                        $cond: [
                            { $in: [toObjectId(req.session.user.id), "$likes"] },
                            { $setDifference: ["$likes", [toObjectId(req.session.user.id)]] },
                            { $concatArrays: ["$likes", [toObjectId(req.session.user.id)]] }
                        ]
                    }
                }
            }
        ],
        { returnDocument: 'after', projection: { likes: 1, post_id: 1 } }
    );

    res.json({
        data,
        success: true
    })
}