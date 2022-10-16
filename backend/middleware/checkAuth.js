import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario.js'

// * Comprobamos que todo esté correcto del user para acceder al perfil.
const checkAuth = async (req, res, next) => {
    let token;

    // * Validamos el token para ver si está todo correcto y almacenamos la información

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET) // * Verificamos el token

            // * Buscamos el usuario por el id y lo almacenamos en la variable
            // * Para poder tener una sesion con la información del usuario
            // * Con el Select le decimos que no almacene esos campos por seguridad
            req.usuario = await Usuario.findById(decoded.id)
                .select("-password -confirmado -token -createdAt -updatedAt -__v")

            return next()
        } catch (error) {
            return res.status(404).json({ msg: 'Hubo un error' })
        }
    }

    // * En caso de que el token no exista enviamos un error
    if (!token) {
        const error = new Error("Token no válido")
        res.status(401).json({ msg: error.message })
    }

    next() // * Usamos next para que ejecute el siguiente Middleware
}

export default checkAuth