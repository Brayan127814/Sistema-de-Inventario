import user from "../models/users.mjs";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// creacionn de codigo para el login

export const login=async(req , res )=>{
    try {
        const {email, password}= req.body

        if(!email || !password ){
            return res.status(400).json({msg:'Todos los campos son obligatorios'})
        }
        
        //Obtener el ususario
        const  usuario = await user.findOne({
            where:{
                email
            }
        })

        if(!usuario){
            return res.status(400).json({msg:'Usuario no encontrado'})
        }

        //Comparar contraseñas 
        const isMatch = await bcrypt.compare(password,usuario.password)
        if(!isMatch){
            return res.status(400).json({msg:'Contraseña incorrecta'})
        }

        //Generar token de autenticacion
        const token = jwt.sign({id:usuario.id},process.env.KEY_SECRET,{
            expiresIn: 60 * 60 * 24 // 24 horas
        })

        res.json({suecces:true,token})
    }catch(error){
        console.log(error)
        res.status(500).json({mensajej:'Error interno del servidor'})
    }
}