const validateRole = (allowedRoles) => {
    return (req, res, next) => {
        //Validar que el usuario este autenticado
        if (!req.user) {
            return res.status(401).json({
                msg: 'No esta autenticado'
            })
        }
        //Validar que el rol del usuario sea permitido

        if (!allowedRoles.includes(req.user.roleName)){
            console.log(`Acceso denegado ${req.user.roleName}`)
            return res.status(403).json({
                msg: 'No tiene permisos para esta acción'
            })
        }
        //Si el rol está atorizado
        next()
    }
}

export default validateRole