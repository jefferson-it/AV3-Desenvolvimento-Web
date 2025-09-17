export async function isAuth(redirect = '', req, res, next) {

    if (!req.session || !req.session.user) {

        if (redirect) return res.redirect(redirect);

        return res.json({
            flash: {
                message: 'Usuário não autenticado',
                type: 'danger'
            }
        });
    }

    next();
}

export async function noNeedAuth(redirect = '', req, res, next) {
    if (req.session && req.session.user) {

        if (redirect) return res.redirect(redirect);

        return res.json({
            flash: {
                message: 'Esta ação é para usuário não autenticado',
                type: 'danger'
            }
        });
    }

    next();
}
