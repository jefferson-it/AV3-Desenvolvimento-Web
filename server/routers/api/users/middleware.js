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

export function isAdmin(redirect = '', req, res, next) {

    if (!req.session || !req.session.user) {

        if (redirect) return res.redirect(redirect);

        return res.json({
            flash: {
                message: 'Usuário não autenticado',
                type: 'danger'
            }
        });
    }

    if (req.session.user.oc !== 1) res.status(403).json({
        flash: {
            message: 'Usuário não autorizado',
            type: 'danger'
        }
    });

    next();
}