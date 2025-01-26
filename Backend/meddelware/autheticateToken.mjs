import jwt from 'jsonwebtoken'
import role from '../models/role.mjs'
import user from '../models/users.mjs'

export const autheticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        const token = authHeader && authHeader.split(' ')[1]

        //validar que el token no este vacio

        if (!token) {
            return res.status(401).json({
                msg: 'Token no valido'
            })
        }
        //Verificar el token
        jwt.verify(token, process.env.KEY_SECRET, async (err, users) => {
            if (err) {
                return res.status(403).json({
                    msg: 'Token invalido'
                })
            }
            //Validar el rol
            try {

                const userRol = await user.findOne({
                    where: {
                        id: users.id
                    },
                    include: {
                        model: role,
                        attributes: ['name'] //Obtener sole el nombre del rol

                    },
                    attributes: ['name', 'roleID']
                })


                if (!userRol) {
                    return res.status(404).json({
                        msg: 'El usuario no existe'
                    })
                }

                //Extraer informacion importante
                const roleName = userRol.role ? userRol.role.name : null
                if (!roleName) {
                    return res.status(403).json({
                        msg: 'El usuario no tiene un rol'
                    })
                }
                //console.log('Rol del usuario', userRol.name)
                console.log('Role del usuario ', roleName)

                req.user = {
                    
                    name: userRol.name,
                    roleID: userRol.roleID,
                    roleName: roleName
                };

                next()


            } catch (error) {
                console.error(error)
                res.status(500).json({
                    mensaje: 'Error'
                })
            }
        })

    } catch (error) {
        console.error('Este es el error' + error)
        res.status(500).json({
            mensaje: 'Error'
        })
    }


}