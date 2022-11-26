import { Request, Response } from 'express';
import { Cliente } from '../models/Cliente';
import * as Yup from 'yup';

// yarn add yup @types/yup
const userSchema = Yup.object().shape({
    nome: Yup.string().required(),
    email: Yup.string().required(),
    senha: Yup.string().required(),
});
const deleteUserSchema = Yup.object().shape({
    id: Yup.string().required(),
});

export default {
    async create(request: Request, response: Response) {
        const { nome, email, senha} = request.body;

        if (
            !(await userSchema.isValid({
                nome,
                email,
                senha,
            }))
        ) {
            return response
                .status(401)
                .json({ message: 'dados fornecidos incorretamente' });
        }

        const existing = await Cliente.findOne({ nome });
        if (!existing) {
            const user = await Cliente.create({
                nome,
                email,
                senha,
            });
            return response.status(200).json({
                message: 'Cliente criado com sucesso',
                user,
            });
        }
        return response
            .status(201)
            .json({ message: 'Cliente ja existe no BD' });
    },
    async index(request: Request, response: Response) {
        // atribui à existing
        // o retorno da chamada do método find
        // no modelo User
        const existing = await Cliente.find();
        if (!existing) {
            return response
                .status(401)
                .json({ message: 'Nenhum Cliente encontrado' });
        }
        return response.status(200).json(existing);
    },
    //findById
    async findOne(request: Request, response: Response) {
        const { id } = request.params;
        const cliente = await Cliente.find({
            $or: [{ _id: id }],
        });
        if (cliente) {
            return response.status(200).json(cliente);
        }
        return response.status(400).json({ message: 'Cliente nao encontrado' });
    },
};