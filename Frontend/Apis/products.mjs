const url = "http://localhost:4000/Products"

fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))



//Registrar productos en la base de datos

export const addProducts = async (name, descripcion, precio, stop) => {
    const token = localStorage.getItem("token")
    if (!token) {
        throw new Error('No has iniciado  sesión')
    }

    try {
        const response = await fetch(`${urs}/register-product`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                descripcion,
                precio,
                stop
            })
        })

        if (!response.ok) {
            throw new Error(`Error al registrar el producto: ${response.statusText}`)
        }

        return await response.json()

    } catch (error) {
        console.error('Error al registrar el producto', error)
        throw new Error('Hubo un error al registrar el producto')
    }
}


//obtener todos los productos

export const allProducts = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
        throw new Error('No has iniciado sesión')
    }
    try {
        const response = await fetch(`${url}/GetallProduct`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })


        if (!response) {
            throw new Error('Error al obtener los productos ')
        }

        return response.json()
    } catch (error) {
        console.error(error)
        throw new Error('Hubo un error al obtener los productos')
    }
}

//Obtener un producto por s ID

export const byIdProduct = async (idProduct) => {
    const token = localStorage.getItem("token")
    if (!token) {
        throw new Error('No has iniciado sesión')
    }

    try {
        const response = await fetch(`${url}/GetallProductsById/${idProduct}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

        if (!response) {
            throw new Error('Producto no encontrado')
        }

        return await response.json()

    } catch (error) {
        console.error(error)
        throw new Error('Hubo un error al obtener el producto')

    }
}

// Actualizar productos
export const updateProducts = async (idProduct, name, descripcion, precio, stop) => {

    const token = localStorage.getItem("token")
    if (!token) {
        throw new Error(' No has iniciado sesión')


    }

    try {
        const response = await fetch(`${url}/update-product/${idProduct}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                descripcion,
                precio,
                stop
            })

        })

        if(!response){
            throw new Error(`Error al actualizar el producto: ${response.statusText}`)
        }
        return await response.json()
    } catch (error) {
        console.error(error)
        throw new Error('Hubo un error al actualizar el producto')
    }

}