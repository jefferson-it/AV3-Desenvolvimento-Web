import { getCollection } from "../../database/database.js";
import { zUserLogin, } from "./validators.js";
import { compareSync } from "bcryptjs";
import pkg from 'jsonwebtoken';
const { sign } = pkg;


const UsersColl = getCollection('users');

/**
 * @type {import("../../@types/Api").routerModule}
 */
export const userLoginRouter = async (req, res) => {
    const parseResult = zUserLogin.safeParse(req.body);

    if (!parseResult.success) {
        const firstError = parseResult.error.issues[0];
        const fieldName = firstError.path.join('.') || 'campo';
        let message = `O campo ${fieldName} é inválido`;

        switch (firstError.code) {
            case 'invalid_type':
                message = `O campo ${fieldName} está vazio`;
                break;
            case 'too_small':
                message = `O campo ${fieldName} está muito curto`;
                break;
            case 'custom':
                message = firstError.message || `Erro personalizado no campo ${fieldName}`;
                break;
        }

        return res.status(400).json({
            flash: {
                message,
                type: 'danger',
                fieldName
            }
        });
    }

    const userTarget = await UsersColl.findOne({ email: parseResult.data.email });

    if (!userTarget) return res.status(400).json({
        flash: {
            type: 'danger',
            message: `Nenhum usuário com este email`,
            fieldName: 'email'
        }
    })


    if (!compareSync(parseResult.data.password, userTarget.password)) return res.status(401).json({
        flash: {
            type: 'danger',
            message: `Senha incorreta`,
            fieldName: 'password'
        }
    })

    const token = sign({
        username: user.username,
    }, process.env.SECRET, { expiresIn: '30m' });

    await UsersColl.updateOne({ _id: userTarget._id }, { $set: { token } });

    res.headers.set(
        'Set-Cookie',
        `tkn-auth=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=1800`
    );

    req.session.user = {
        token,
        id: userTarget._id
    }

    return res.json({
        flash: {
            message: 'Conectado com sucesso',
            type: 'success'
        },
        data: userTarget
    })
}