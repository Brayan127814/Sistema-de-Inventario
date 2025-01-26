import { Router } from 'express'
import { autheticateToken } from '../meddelware/autheticateToken.mjs'
import validateRole from '../meddelware/validarRol.mjs'
import { addCategory } from '../controller/controlleraCategory.mjs'

const categoriesRoute = Router()

// Rutas para categorias

// Listar todas las categorías
categoriesRoute.post('/register-categories',autheticateToken,validateRole(['admin']),addCategory)





export default categoriesRoute