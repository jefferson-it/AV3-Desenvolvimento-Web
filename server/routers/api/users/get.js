import { getCollection, processProjection, processQuery } from "../../../database/database.js";

const UsersColl = getCollection('users');

export const UserSchema = {
    _id: 'object-id',
    name: 'string',
    email: 'string',
    password: 'string',
    username: 'string',
    token: 'string',
    created_at: 'Moment',
    updated_at: 'Moment'
}
export async function getListUser(req, res) {
    const { sort, view, ...query } = req.query;
    const finalQuery = processQuery({
        ...query,
    }, UserSchema);
    const projection = processProjection(view?.toString());

    const list = await UsersColl.find(finalQuery, { projection: projection }).toArray()

    res.json(list);
}

export async function getOneUser(req, res) {
    const { sort, view, ...query } = req.query;
    const finalQuery = processQuery({
        ...query,
        _id: req.params.id
    }, UserSchema);
    const projection = processProjection(view?.toString());

    const item = await UsersColl.findOne(finalQuery, { projection: projection })

    res.json(item);
}