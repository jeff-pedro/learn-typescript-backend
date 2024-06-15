import * as yup from "yup";
import { TipoRequestBodyAdotante } from "../../tipos/tiposAdotante";
import { NextFunction, Request, Response } from "express";

const adotanteBodyValidator: yup.ObjectSchema<Omit<TipoRequestBodyAdotante, "endereco">> =
    yup.object({
        nome: yup.string().defined().required(),
        senha: yup.string().defined().required().min(6),
        celular: yup.string().defined().required(),
        foto: yup.string().optional()
    });

const middlewareValidadorBodyAdotante = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await adotanteBodyValidator.validate(req.body, {
            abortEarly: false
        })
        return next();
    } catch (error) {
        const yupErrors = error as yup.ValidationError;

        const validationErrors: Record<string, string> = {};

        yupErrors.inner.forEach((error) => {
            if (!error.path) return;
            validationErrors[error.path] = error.message;
        })

        return res.status(400).json({ error: validationErrors })
    }
}

export {
    middlewareValidadorBodyAdotante
}