import { type Moment } from 'moment-timezone';
import { ObjectId } from "mongodb"

export interface Post {
    _id: ObjectId
    author: ObjectId
    likes: Array<ObjectId>
    content: string
    post_id: string
    title: string
    disable?: boolean
    created_at: Moment
    updated_at: Moment
}
