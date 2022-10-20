import express from "express";
const router = express.Router()

import {
    registrar,
    autenticar,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfil
} from '../controllers/usuarioController.js'

import checkAuth from "../middleware/checkAuth.js"

// Autenticación, Registro y Confirmación de Usuarios

router.post('/', registrar) // ** Crea nuevo usuario
router.post('/login', autenticar) // ** Autenticamos al usuario
router.get('/confirmar/:token', confirmar) // * Usamos los dos puntos para generar un routing dinámico
router.post('/olvide-password', olvidePassword) // * Cambio de Password

router
    .route("/olvide-password/:token")
    .get(comprobarToken) // * Comprobamos el token para cambiar contraseña
    .post(nuevoPassword) // * Cambiamos el password

router.get('/perfil', checkAuth, perfil) // * Primero ejecuta checkAuth y luego perfil

export default router