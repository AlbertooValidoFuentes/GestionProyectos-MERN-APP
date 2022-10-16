// * Importamos el modelo del usuario
import Usuario from "../models/Usuario.js"
import generarId from "../helpers/generarId.js"
import generarJWT from "../helpers/generarJWT.js"

// * Archivo donde creamos los controllers para las rutas.

const registrar = async (req, res) => {

    // * Evitar registros duplicados
    const { email } = req.body
    const existeUsuario = await Usuario.findOne({ email })

    if (existeUsuario) {
        const error = new Error('Usuario ya registrado')
        return res.status(400).json({ msg: error.message })
    }

    // * Creamos un usuarios y lo almacenamos en la base de datos.
    try {
        const usuario = new Usuario(req.body)
        usuario.token = generarId()

        // * Usamos await para esperar hasta que se guarde el registro.
        const usuarioAlmacenado = await usuario.save()
        res.json(usuarioAlmacenado)

    } catch (error) {
        console.log(error)
    }
}

// ** Autenticamos a los usuarios
const autenticar = async (req, res) => {

    const { email, password } = req.body

    // ** Comprobamos si el usuario existe
    const usuario = await Usuario.findOne({ email })
    if (!usuario) {
        const error = new Error('El usuario no existe')
        return res.status(404).json({ msg: error.message })
    }

    // ** Comprobamos si el usuario esta confirmado
    if (!usuario.confirmado) {
        const error = new Error('Tu cuenta no ha sido confirmada')
        return res.status(403).json({ msg: error.message })
    }

    // ** Comprobamos el password
    if (await usuario.comprobarPassword(password)) {
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id) // ** Generamos token
        })
    } else {
        const error = new Error('La contraseña es incorrecta')
        return res.status(403).json({ msg: error.message })
    }
}

const confirmar = async (req, res) => {
    const { token } = req.params
    const usuarioConfirmar = await Usuario.findOne({ token }) // * Comprobamos que el token exista en la base de dato.

    if (!usuarioConfirmar) {
        const error = new Error('Token no válido')
        return res.status(403).json({ msg: error.message })
    }

    try {
        usuarioConfirmar.confirmado = true
        usuarioConfirmar.token = ""

        await usuarioConfirmar.save() // * Almacenamos el usuario con los cambios en la base de datos
        res.json({ msg: "Usuario Confirmado Correctamente" })

    } catch (error) {
        console.log(error)
    }
}

const olvidePassword = async (req, res) => {
    const { email } = req.body
    const usuario = await Usuario.findOne({ email })
    if (!usuario) {
        const error = new Error('El usuario no existe')
        return res.status(404).json({ msg: error.message })
    }

    try {
        usuario.token = generarId() // * Generamos el token de nuevo.
        await usuario.save()
        res.json({ msg: "Hemos enviado un email con las instrucciones." })
    } catch (error) {
        console.log(first)
    }
}

const comprobarToken = async (req, res) => {
    const { token } = req.params
    const tokenValido = await Usuario.findOne({ token })

    if (tokenValido) {
        res.json({ msg: "Token válido y el usuario existe" })
    } else {
        const error = new Error('Token no válido')
        return res.status(404).json({ msg: error.message })
    }
}

const nuevoPassword = async (req, res) => {
    const { token } = req.params // * Enviado por url
    const { password } = req.body // * Enviado por el user

    const usuario = await Usuario.findOne({ token })

    if (usuario) {
        usuario.password = password
        usuario.token = '' // * Reseteamos el token por seguridad
        try {
            await usuario.save()
            res.json({ mag: "Password modificado correctamente" })
        } catch (error) {
            console.log(error)
        }
    } else {
        const error = new Error('Token no válido')
        return res.status(404).json({ msg: error.message })
    }
}

const perfil = async (req, res) => {
    const {usuario} = req

    res.json(usuario)
}

export {
    registrar,
    autenticar,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfil
}