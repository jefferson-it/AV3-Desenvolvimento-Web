import { Moment } from "moment-timezone"
import { ObjectId } from "mongodb"

export interface FeedBack {
    _id: ObjectId
    author: ObjectId
    content: string
    post_id: ObjectId
    created_at: Moment
}
