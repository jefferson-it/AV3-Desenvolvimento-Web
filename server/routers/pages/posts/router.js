import { Router } from "express";
import { isAuth } from "../../api/users/middleware.js";
import showHTML from "../../replace_params.js";
import { getCollection, toObjectId } from "../../../database/database.js";
import moment from "moment-timezone";

const PostsColl = getCollection('posts');
const UsersColl = getCollection('users');
const FeedBackColl = getCollection('feedbacks');
const postRouter = Router();

postRouter.get('/novo', isAuth.bind(null, '/login'), (req, res) => {
    res.send(showHTML('postar.html'))
})

postRouter.get('/editar/:id', isAuth.bind(null, '/login'), async (req, res) => {
    const { id } = req.params;

    const post = await PostsColl.findOne({ post_id: id, disable: false });

    if (!post) return res.status(404).send(
        showHTML('404.html')
    )

    res.send(showHTML('editar.html', {
        ...post
    }))
})

postRouter.get('/excluir/:id', isAuth.bind(null, '/login'), (req, res) => {
    const { id } = req.params;

    if (!post) return res.status(404).send(
        showHTML('404.html')
    )

    res.send(showHTML('excluir.html', {
        post_id: id
    }))
})

postRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const post = await PostsColl.findOne({
        post_id: id,
        $or: [
            { disable: false },
            { disable: { $exists: false } }
        ]
    });

    if (!post) return res.status(404).send(
        showHTML('404.html')
    )

    const [authorFound, comments] = await Promise.all([
        UsersColl.findOne({ _id: toObjectId(post.author) }, { projection: { name: 1 } }),
        FeedBackColl.countDocuments({ post_id: post.post_id })
    ]);
    const allFeedback = await FeedBackColl.find({ post_id: id }).limit(10).sort({ created_at: -1 }).toArray()
    const commentsText = await Promise.all(allFeedback.map(async v => {
        const authorName = (await UsersColl.findOne({ _id: toObjectId(v.author) }, { projection: { name: 1 } })).name;

        return `
            <div class="comment-header">
                <span class="comment-author">${authorName}</span>
                <span class="comment-date">${moment(v.created_at).format('DD [de] MMMM, YYYY')}</span>
            </div>
            <p class="comment-text">
               ${v.content}
            </p>`
    }));

    const isAuthor = post.author === req.session.user?.id

    const userLiked = req.session.user
        ? post.likes.some(id => id.equals(toObjectId(req.session.user.id)))
        : false;

    res.send(showHTML('visualizar-post.html', {
        ...req.htmlParams,
        ...post,
        id: post._id.toString(),
        likes: post.likes.length,
        comments,
        author: authorFound.name,
        created_at: moment(post.created_at).format('DD [de] MMMM, YYYY'),
        heart: userLiked ? 'fas fa-heart' : 'fa-regular fa-heart',
        labelLike: userLiked ? 'Curtido' : 'Curtir',
        'pre-load-comments': commentsText.join(''),
        button: isAuthor ? `<a href="/post/editar/${post.post_id}" class="btn btn-primary">Editar postagem</a>` : ''
    }))
})


export default postRouter