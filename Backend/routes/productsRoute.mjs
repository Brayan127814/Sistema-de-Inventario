import {
    Router
} from 'express'
import {
    getAllProducts,
    getProductById,
    registerProduct,
    updateProductsByID
} from '../controller/ProductosController.mjs'
import validateRole from '../meddelware/validarRol.mjs'
import { autheticateToken } from '../meddelware/autheticateToken.mjs'

const routeProduct = Router()

// Rutas para productos
routeProduct.post('/register-product',autheticateToken,validateRole(['admin']), registerProduct)
routeProduct.get('/GetallProducts',validateRole(['admin','vendedor']), getAllProducts)
routeProduct.get('/GetallProductsById/:id',validateRole(['admin','vendedor']), getProductById)
routeProduct.put('/update-product/:id',validateRole(['admin']), updateProductsByID)


export default routeProduct