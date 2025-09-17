import uuid4 from "uuid4";
import { getCollection } from "../../../database/database.js";

const PostsColl = getCollection('posts');

/**
 * @type {import("../../@types/Api").routerModule}
 */
export const deletePost = async (req, res) => {
    const { id } = req.params;

    const isValidId = uuid4.valid(id);

    if (!isValidId) return res.status(400).json({
        flash: {
            message: `O id ${id} é invalido`,
            type: 'danger'
        }
    })

    const post = await PostsColl.findOne({ post_id: id, disable: false }, {
        projection: {
            author: 1,
            post_id: 1
        }
    });

    if (!post) return res.status(404).json({
        flash: {
            message: 'O post solicitado é inexistente ou desabilitado',
            type: 'danger'
        }
    })

    else if (post.author.toString() !== req.session.user.id.toString()) return res.status(403).json({
        flash: {
            message: 'Este post não é seu',
            type: 'danger'
        }
    })

    await PostsColl.updateOne({ post_id: id }, { $set: { disable: true } });

    res.json({
        flash: {
            message: 'Deletado com sucesso',
            type: 'success'
        },
        success: true
    })
}