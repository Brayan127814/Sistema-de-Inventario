import { Router } from "express";
import { getAllVentaId, getAllVentas, registerVentas } from "../controller/ventasController.mjs";
import { autheticateToken } from "../meddelware/autheticateToken.mjs";

const routesVentas = Router()


routesVentas.post('/ventas-register', autheticateToken,registerVentas)
routesVentas.get('/getVentas/:id',autheticateToken,getAllVentaId)
routesVentas.get('/getAllVentas',autheticateToken,getAllVentas)




export default routesVentas