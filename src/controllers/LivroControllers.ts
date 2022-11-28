import { Request, Response } from 'express';
import { Produto } from '../models/Livro';
import * as Yup from 'yup';

// yarn add yup @types/yup
const userSchema = Yup.object().shape({
    id: Yup.string().required(),
    titulo: Yup.string().required(),
    autor: Yup.string().required(),
    data: Yup.string().required(),
    descricao: Yup.string().required(),
    imagem: Yup.string().required(),
    preco: Yup.number().required(),
    precoPromocional: Yup.number().required(),
});
const deleteUserSchema = Yup.object().shape({
    id: Yup.string().required(),
});

export default {
    async create(request: Request, response: Response) {
        const { id, titulo, autor, data, descricao, imagem, preco, precoPromocional} = request.body;

        if (
            !(await userSchema.isValid({
                id,
                titulo,
                autor,
                data,
                descricao,
                imagem,
                preco,
                precoPromocional,
            }))
        ) {
            return response
                .status(401)
                .json({ message: 'dados fornecidos incorretamente' });
        }

        const existing = await Produto.findOne({ titulo });
        if (!existing) {
            const user = await Produto.create({
                id,
                titulo,
                autor,
                descricao,
                imagem,
                preco,
                precoPromocional,
            });
            return response.status(200).json({
                message: 'Produto criado com sucesso',
                user,
            });
        }
        return response
            .status(201)
            .json({ message: 'Produto ja existe no BD' });
    },
    async index(request: Request, response: Response) {
        // atribui à existing
        // o retorno da chamada do método find
        // no modelo User
        const existing = await Produto.find();
        if (!existing) {
            return response
                .status(401)
                .json({ message: 'Nenhum Produto encontrado' });
        }
        return response.status(200).json(existing);
    },
    //findById
    async findOne(request: Request, response: Response) {
        const id = request.params.id as string;
        const id_ = parseInt(id)
        const produto = await Produto.findOne({
            id: id_
        });
        if (produto) {
            return response.status(200).json({produto});
        }
        return response.status(400).json({ message: 'Produto nao encontrado' });
    },
};