import { TokenExpiredError } from "jsonwebtoken"

const url = "http://localhost:4000/categorias"


fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))





// Registrar categorías en la base de datos

export const addCategory =async (name ,description)=>{
    const token = localStorage.getItem("token")
    if(!token){
        throw new Error('No has iniciado sesión')
    }

    try {
        const response = await fetch(`${url}/register-category'`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({name, description})
        })

        if(!response){
            throw new Error('Error al registrar la categoría')
        }

        return await response.json()
    } catch (error) {
        console.error(error)
        throw new Error('Error al registrar categorías')
    }
}


//Consultar categorias

export const getCategories = async ()=>{
    const token = localStorage.getItem("token")
    if(!token){
        throw new Error('No has iniciado sesión')
    }

    try {
        const response = await fetch(`${url}/getCategory`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if(!response){
            throw new Error('Error al obtener las categorías')
        }

        return await response.json()
    } catch (error) {
        console.error(error)
        throw new Error('Error al obtener categorías')
    }
}  


//Actualizar categorías

export const updateCategory = async (id, name, description)=>{
    const token = localStorage.getItem("token")
    if(!token){
        throw new Error('No has iniciado sesión')
    }

    try {
        const response = await fetch(`${url}updateCategory/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({name, description})
        })

        if(!response.ok){
            throw new Error('Error al actualizar la categoría')
        }

        return await response.json()
    } catch (error) {
        console.error(error)
        throw new Error('Error al actualizar categorías')
    }
}