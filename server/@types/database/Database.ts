import { Collection } from "mongodb"
import { FeedBack } from "./Feedback"
import { Post } from "./Post"
import { User } from "./User"

export interface collectionsMap {
    users: Collection<User>
    posts: Collection<Post>
    feedbacks: Collection<FeedBack>
}
