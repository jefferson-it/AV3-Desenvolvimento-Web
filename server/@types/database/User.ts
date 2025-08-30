import { ObjectId } from "mongodb"

export interface User {
    _id: ObjectId
    name: string
    email: string
    password: string
}

interface Token {
    to: string
    type: 'auth' | 'data'
    jwt: string
    expire_at: Date
}