import express from "express"
import dotenv from "dotenv"
import conectarDB from "./config/db.js"
import usuarioRoutes from "./routes/usuarioRoutes.js"

const app = express()

// Para procesar la informaciónde tipo Json
app.use(express.json())

dotenv.config() // Variables de entorno

conectarDB() // Conectamos con la base de datos.

// Routing

app.use('/api/usuarios', usuarioRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`)
})