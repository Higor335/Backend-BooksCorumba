import mongoose, { Schema } from 'mongoose';
export interface ProdutoInteface {
    id: number,
    titulo: string;
    autor: string;
    data: string;
    descricao: string;
    imagem: String;
    preco: number;
    precoPromocional: number;
}
const produtoSchema = new Schema(
    {
        id: Number,
        titulo: String,
        autor: String,
        data: String,
        descricao: String,
        imagem: String,
        preco: Number,
        precoPromocional: Number,
    }
);
export const Produto = mongoose.model('Produto', produtoSchema, 'produtos');
{
}