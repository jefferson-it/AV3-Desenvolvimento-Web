import type { Moment } from "moment-timezone"
import { ObjectId } from "mongodb"

export interface User {
    _id: ObjectId
    name: string
    email: string
    password: string
    username: string
    token: string,
    created_at: Moment
    updated_at: Moment
}
