export async function isAuth(req, res, next) {
    if (!req.session.user) return res.json({
        flash: {
            message: 'Usuário não autenticado',
            type: 'danger'
        }
    })

    next();
}

export async function noNeedAuth(req, res, next) {
    if (req.session.user) return res.json({
        flash: {
            message: 'Esta ação é para usuário não autenticado',
            type: 'danger'
        }
    })

    next();
}