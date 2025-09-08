import { getCollection } from "../../database/database";
import { zPostsCreate } from "./validators";
import uuid4 from "uuid4";

const PostsColl = getCollection('posts');

/**
 * @type {import("../../@types/Api").routerModule}
 */
export const createPost = async (req, res) => {
    const parseResult = zPostsCreate.safeParse(req.body);

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

    /**
     * @type {import("../../@types/database/Post").Post}
     */
    const post = {
        ...parseResult.data,
        post_id: uuid4(),
        author: req.session.user.id,
        likes: [],
        created_at: new Date()
    };

    const result = await PostsColl.insertOne(post);

    res.json({
        id: result.insertedId,
        flash: {
            message: 'Postagem publicada com sucesso',
            type: 'success'
        }
    })
}