import { getCollection, processProjection, processQuery } from "../../database/database.js";
const PostsColl = getCollection('posts');

export const PostSchema = {
    _id: 'object-id',
    author: 'object-id',
    likes: 'array',
    content: 'string',
    post_id: 'string',
    title: 'string',
    disable: 'boolean',
    created_at: 'Moment',
    updated_at: 'Moment'
}
export async function getListPost(req, res) {
    const { sort, view, ...query } = req.query;
    const finalQuery = processQuery({
        ...query,
    }, PostSchema);
    const projection = processProjection(view?.toString());

    const list = await PostsColl.find(finalQuery, { projection: projection }).toArray()

    res.json(list);
}

export async function getOnePost(req, res) {
    const { sort, view, ...query } = req.query;
    const finalQuery = processQuery({
        ...query,
        _id: req.params.id
    }, PostSchema);
    const projection = processProjection(view?.toString());

    const item = await PostsColl.findOne(finalQuery, { projection: projection })

    res.json(item);
}