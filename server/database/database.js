import moment from 'moment-timezone';
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

if (!process.env.MONGO_URL) {
    throw new Error('URL do banco de dados não implementada')
}

const mongodb = new MongoClient(process.env.MONGO_URL);

export const database = mongodb.db();
/**
 * @typedef {import('../@types/database/Database').collectionsMap} collectionsMap
 * @typedef {keyof collectionsMap} CollectionKey
 */

/**
 * @template {CollectionKey} K
 *
 * @param {K} name - Nome da coleção
 * @returns {collectionsMap[K]} - Retorna a coleção tipada correspondente
 */
export function getCollection(name) {
    return database.collection(name)
}


export function processQuery(query, schema = {}) {
    if (!query) return {};

    const newQuery = {};

    for (const [key, value] of Object.entries(query)) {
        if (key === '_id') {
            newQuery[key] = toObjectId(value);
        }
        else if (key in schema) {
            const type = schema?.[key]

            if (value) {
                switch (type) {
                    case 'string':
                        newQuery[key] = typeof value === 'string' ? value : value.toString();
                        break;
                    case 'number':
                        newQuery[key] = Number(value);
                        break;
                    case 'object-id':
                        newQuery[key] = toObjectId(value);
                        break
                    case 'boolean':
                        newQuery[key] = value === "true";
                        break;
                    case 'array':
                        newQuery[key] = value.split(',');
                        break;
                    case 'Moment':
                        newQuery[key] = moment(value);
                        break;
                    case 'Date':
                        newQuery[key] = new Date(value);
                        break;
                    default:
                        newQuery[key] = value;
                        break;
                }
            }

        } else if (
            (value.startsWith('{') && value.endsWith('}')) ||
            (value.startsWith('[') && value.endsWith(']'))
        ) {
            newQuery[key] = JSON.parse(value);
        } else {
            newQuery[key] = value;
        }
    }

    return newQuery;
}

export function processProjection(projection) {
    if (!projection) return undefined

    const itens = projection.split(',').reduce((a, b) => ({
        ...a,
        [b.trim()]: 1
    }), {})

    return itens
}
