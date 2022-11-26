import express from 'express';
import LivroController from '../controllers/LivroControllers';
const livroRoutes = express.Router();

livroRoutes.post('/livro/new', LivroController.create);
livroRoutes.get('/livro/list', LivroController.index);
livroRoutes.get('/livro/list/:id', LivroController.findOne);

export default livroRoutes;