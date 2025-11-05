import { getCollection, toObjectId } from "../../../database/database.js";

const FeedBackColl = getCollection('feedbacks');

/**
 * @type {import("../../../@types/Api.js").routerModule}
 */
export const deleteFeedback = async (req, res) => {
    const { id } = req.params;

    const comment = await FeedBackColl.findOne({ _id: toObjectId(id) }, {
        projection: {
            author: 1,
            post_id: 1
        }
    });

    if (!comment) return res.status(404).json({
        flash: {
            message: 'O comentário solicitado é inexistente',
            type: 'danger'
        }
    })

    else if (comment.author.toString() !== req.session.user.id.toString()) return res.status(403).json({
        flash: {
            message: 'Este post não é seu',
            type: 'danger'
        }
    })

    await FeedBackColl.updateOne({ _id: comment._id }, { $set: { disable: true } });

    res.json({
        flash: {
            message: 'Deletado com sucesso',
            type: 'success'
        }
    })
}