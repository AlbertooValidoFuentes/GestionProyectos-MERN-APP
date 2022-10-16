import mongoose from "mongoose"

// * Creamos el modelo para los proyectos

const proyectosSchema = mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
        required: true
    },
    descripcion: {
        type: String,
        trim: true,
        required: true
    },
    fechaEntrega: {
        type: Date,
        default: Date.now()
    },
    cliente: {
        type: String,
        trim: true,
        required: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId, // * Colección usuarios
        ref: 'Usuario', // * Le indicamos el modelo.
        colaboradores: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Usuario'
            }
        ]
    }
}, {
    timestamps: true,

})

const Proyecto = mongoose.model('Proyecto', proyectosSchema)
export default Proyecto