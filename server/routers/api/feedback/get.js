import moment from "moment-timezone";
import { getCollection, toObjectId } from "../../../database/database.js";
import uuid4 from "uuid4";

const FeedBackColl = getCollection('feedbacks');
const UsersColl = getCollection('users');

/**
 * @type {import("../../@types/Api").routerModule}
 */
export const getFeedBackInPost = async (req, res) => {
    const { postId } = req.params;
    const isValidId = uuid4.valid(postId);

    if (!isValidId) return res.status(400).json({
        flash: {
            message: `O id ${postId} é invalido`,
            type: 'danger'
        }
    })

    const list = FeedBackColl.find({ post_id: postId }).toArray();

    res.json(list)
}

export const getFeedBackOne = async (req, res) => {
    const { id } = req.params;
    const { mode } = req.query;
    const item = await FeedBackColl.findOne({ _id: toObjectId(id) });

    if (mode === 'complete') {
        const authorName = (await UsersColl.findOne({ _id: toObjectId(item.author) }, { projection: { name: 1 } })).name;

        return res.json({
            ...item,
            authorName,
            date_str: moment(item.created_at).format('DD [de] MMMM, YYYY'),
        })
    }

    res.json(item)
}