import mongoose, { Schema } from 'mongoose';
export interface ClienteInteface {
    nome: string;
    email: string;
    senha: String;
}
const clienteSchema = new Schema(
    {
        nome: String,
        email: String,
        senha: String,
    }
);
export const Cliente = mongoose.model('Cliente', clienteSchema, 'Clientes');
{
}