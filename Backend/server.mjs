import express from 'express'
import sequileze from './config/db.mjs'
import cors from 'cors'
import './relations/relations.mjs'
import user from './models/users.mjs'
import productos from './models/productos.mjs'
import ventas from './models/ventas.mjs'
import routeProduct from './routes/productsRoute.mjs'
import routeUser from './routes/userRoutes.mjs'
import routesVentas from './routes/routesVentas.mjs'
import categoriesRoute from './routes/routeCategories.mjs'






const app = express()
const PORT = process.env.PORT || 3000



//Middleware para parsear los datos en formato JSON
app.use(express.json())

app.use(cors())
//Rutas cd
app.use('/categorias',categoriesRoute)
app.use('/products', routeProduct)
app.use('/users',routeUser)
app.use('/ventas',routesVentas)


const init = async () => {
    try {
        await sequileze.sync({
            force: false
        });
        console.log('Database connected successfully');
        app.listen(PORT, () => {
            console.log('Server is running on port ' , PORT);
        })
    } catch (error) {
        console.error('Error al sincronizar la base de datos')
    }

}

init()