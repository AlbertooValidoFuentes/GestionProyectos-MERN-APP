import mongoose from "mongoose"

const conectarDB = async () => {
    try {
        const connection = await mongoose.connect( process.env.MONGO_URI,  { // Conectamos con la base de datos.
                useNewUrlParser: true,
                useUnifiedTopology: true
            })

            const url = `${connection.connection.host}: ${connection.connection.port}`
            console.log(`MongoDB Conectado en: ${url}`)

    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1) // Forzamos que termine el proceso
    }
}

export default conectarDB