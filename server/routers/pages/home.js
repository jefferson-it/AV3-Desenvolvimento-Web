import { getCollection, toObjectId } from "../../database/database.js";
import showHTML from "../replace_params.js"
import moment from 'moment-timezone';
import 'moment/locale/pt-br.js'

moment.locale('pt-br')

const PostsColl = getCollection('posts');
const FeedBackColl = getCollection('feedbacks');
const UsersColl = getCollection('users');

/**
 * @type {import("../../@types/Api").routerModule}
 */
export const homePage = async (req, res) => {
    const posts = await PostsColl.aggregate([
        {
            $match: {
                $or: [
                    { disable: false },
                    { disable: { $exists: false } }
                ]
            }
        },
        { $sort: { created_at: -1 } },
        { $limit: 10 },
        {
            $project: {
                title: 1,
                author: 1,
                post_id: 1,
                likes: 1,
                created_at: 1,
                content: { $substr: ["$content", 0, 150] }
            }
        }
    ]).toArray();

    const postsCard = await Promise.all(posts.map(async post => {
        const { _id, created_at, title, post_id, author, likes, content = '' } = post; // fallback vazio

        const [authorFound, comments] = await Promise.all([
            UsersColl.findOne({ _id: toObjectId(author) }, { projection: { name: 1 } }),
            FeedBackColl.countDocuments({ post_id: post_id })
        ]);

        return cardModel({
            id: _id.toString(),
            title,
            post_id,
            likes: likes.length,
            content,
            author: authorFound?.name || 'Desconhecido',
            comments,
            created_at: moment(created_at).format('DD [de] MMMM, YYYY')
        });
    }));


    res.send(
        showHTML('home.html', {
            ...req.htmlParams,
            pre_render_posts: postsCard.length ? postsCard.join('') : '<p class="post-card">Nenhum post encontrado</p>',
        })
    )
}


function cardModel({ id, title, post_id, author, content, created_at, likes, comments }) {
    return `
        <div class="post-card">
            <a href="/post/${post_id}" class="post-title-link">
                <h2 class="post-title">${title}</h2>
            </a>
            <p class="post-excerpt">
                ${content.substring(0, 150)}...
            </p>
            <div class="post-meta">
                <span class="author">Por: ${author}</span>
                <span class="date">Publicado em: ${created_at}</span>
            </div>
            <div class="post-actions">
                <button class="action-btn"><i class="fas fa-heart"></i> ${likes} Curtida${likes > 1 ? 's' : ''}</button>
                <a href="/post/${id}" class="action-btn"><i class="fas fa-comment"></i> ${comments} Comentário${comments > 1 ? 's' : ''}</a>
            </div>
        </div>
        `
}

export async function profileButton(req) {
    return req.session.user ? `
        <p class="user-hello">Olá ${(await UsersColl.findOne({ _id: toObjectId(req.session.user.id) }, { projection: { name: 1 } })).name
        }</p>
    ` : `<a href="/login" class="btn btn-secondary">Conecte-se</a>`
}