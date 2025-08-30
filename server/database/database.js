import { MongoClient, ObjectId } from 'mongodb';


/**
 * 
 * @param {ObjectId | string} id 
 * @returns {ObjectId | undefined}
 */
export function toObjectId(id) {
    if (!id) return undefined;

    return ObjectId.isValid(id) ? new ObjectId(id) : undefined
}

const mongodb = new MongoClient(process.env.MONGO_URL);

export const database = mongodb.db();