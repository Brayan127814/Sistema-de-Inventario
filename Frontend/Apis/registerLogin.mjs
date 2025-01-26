const api = "http://localhost:4000/users"

fetch(api)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))





//Manejo de api para registrar usuarios a las base de datos

export const addUsers = async (name, username, email, telefono, password) => {
    try {
        const response = await fetch(`${api}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                username,
                email,
                telefono,
                password
            })
        })
        //Validar su ocurre un error al momento de registrar el usuario
        if (!response.ok) {
            throw new Error(`Error al registrar el usuario: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error(`Ocurrio el siguiente error ${error}`)
        throw new Error(`Error al registrar el usuario: ${response.status}`)
    }
}
//Manejo de formulario para el inicio de sesión


export const userLogin = async (email, password) => {

    try {
        const response = await fetch(`${api}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })


        const data = await response.json()

        if (data.suecces) {
            localStorage.setItem("token", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))
            alert('Inicio de sesiòn exitosa')
            return data
        } else {
            return false
        }
    } catch (error) {
        console.error(`Ocurrio el siguiente error ${error}`)
        return false

    }
}

//Obtener usuario poe ID


export const getUserById = async (iduser) => {
    const token = localStorage.getItem('token')
    if (!token) {
        throw new Error('No has iniciado  sesión')
    }
    try {

        const response = await fetch(`${api}/getUserById/${iduser}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

        if (!response) {
            throw new Error(`Error al obtener el usuario: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {

            console.error(`Se presentó el siguiente error ${error}`)
            throw new Error(`Error al obtener el usuario: ${response.statusText}`)
    }
}