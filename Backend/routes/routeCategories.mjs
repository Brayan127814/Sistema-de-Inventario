import { Router } from 'express'
import { autheticateToken } from '../meddelware/autheticateToken.mjs'
import validateRole from '../meddelware/validarRol.mjs'
import { addCategory, getCategories, getCategoriesID, updateCategory } from '../controller/controlleraCategory.mjs'

const categoriesRoute = Router()

// Rutas para categorias

// Listar todas las categorías
categoriesRoute.post('/register-category',autheticateToken,validateRole(['admin']),addCategory)
categoriesRoute.get('/getCategory',autheticateToken,validateRole(["admin","vendedor"]),getCategories)
categoriesRoute.get('/getCategoryID/:id',autheticateToken,validateRole(["admin","vendedor"]),getCategoriesID)
categoriesRoute.put("/updateCategory/:id",autheticateToken,validateRole(["admin"]),updateCategory)





export default categoriesRoute