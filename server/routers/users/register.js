import { getCollection } from "../../database/database";
import { zUserRegister } from "./validators";
import { genSaltSync, hashSync } from "bcryptjs";
import { sign } from "jsonwebtoken";

const UsersColl = getCollection('users');

/**
 * @type {import("../../@types/Api").routerModule}
 */
export const userRegisterRouter = async (req, res) => {
    const parseResult = zUserRegister.safeParse(req.body);

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
                message = firstError.message || `Erro no campo ${fieldName}`;
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

    const existUsername = await UsersColl.findOne({ username: parseResult.data.username });

    if (existUsername) return res.status(400).json({
        flash: {
            type: 'danger',
            message: `Existe um usuário com o username ${parseResult.data.username}`,
            fieldName: 'username'
        }
    })

    const existEmail = await UsersColl.findOne({ email: parseResult.data.email });

    if (existEmail) return res.status(400).json({
        flash: {
            type: 'danger',
            message: `Email escolhido já registrado`,
            fieldName: 'email'
        }
    })


    /**
     * @type {import("../../@types/database/User").User}
     */
    const user = {
        ...parseResult.data.name,
        password: hashSync(req.body.password, genSaltSync(10)),
        created_at: new Date(),
        token: sign({
            username: user.username,
        }, process.env.SECRET, { expiresIn: '30m' })
    }

    const result = await UsersColl.insertOne(user)

    res.headers.set(
        'Set-Cookie',
        `tkn-auth=${user.token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=1800`
    );


    req.session.user = {
        token: user.token,
        id: user._id
    }

    return res.status(200).json({
        data: {
            id: result.insertedId
        }
    })
}