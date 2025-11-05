import uuid4 from "uuid4";
import { getCollection } from "../../../database/database.js";
import { zPostsCreate } from "./validators.js";

const PostsColl = getCollection('posts');

/**
 * @type {import("../../@types/Api").routerModule}
 */
export const editPost = async (req, res) => {
    const parseResult = zPostsCreate.partial().safeParse(req.body);
    if (!parseResult.success) {
        const firstError = parseResult.error.issues[0];
        const fieldName = firstError.path.join('.') || 'campo';
        let message = `O campo ${fieldName} é inválido`;

        switch (firstError.code) {
            case 'invalid_type':
                message = `O campo ${fieldName} está vazio`;
                break;
            case 'too_small':
                message = `O campo ${fieldName} está muito curto`;
                break;
            case 'custom':
                message = firstError.message || `ErroW no campo ${fieldName}`;
                break;
        }

        return res.status(400).json({
            flash: {
                message,
                type: 'danger',
                fieldName
            }
        });
    }

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

    else if (post.author.toString() !== req.session.user.id.toString()) return res.status(403).json({
        flash: {
            message: 'Este post não é seu',
            type: 'danger'
        }
    })

    await PostsColl.updateOne({ post_id: id }, { $set: parseResult.data });


    res.json({
        flash: {
            message: 'Editado com sucesso',
            type: 'success'
        }
    })
}