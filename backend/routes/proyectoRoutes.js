import express from "express";

// * Importamos el controller de Proyectos
import {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
    obtenerTareas
} from '../controllers/proyectoController.js'
import checkAuth from "../middleware/checkAuth.js";

// * Importamos middleware para comprobar si el usuario es correcto
import checkout from '../middleware/checkAuth.js'

const router = express.Router()

// * Rutas para proyectos

router
    .route('/')
    .get(checkout, obtenerProyectos)
    .post(checkout, nuevoProyecto)

router
    .route('/:id')
    .get(checkAuth, obtenerProyecto)
    .put(checkAuth, editarProyecto)
    .delete(checkAuth, eliminarProyecto)



export default router