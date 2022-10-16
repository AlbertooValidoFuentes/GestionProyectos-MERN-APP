import mongoose from "mongoose"
import bcrypt from "bcrypt"

const usuarioSchema = mongoose.Schema({ // ** Creamos el modelo del usuario
    nombre: {
        type: String, // ** Indicamos el tipo de datos.
        required: true, // ** Indicamos que es obligatorio.
        trim: true // ** Quitamos los espacios del principio y del final
    },
    password: {
        type: String, 
        required: true, 
        trim: true
    },
    email: {
        type: String, 
        required: true, 
        trim: true,
        unique: true // ** Le decimos que el correo no se puede repetir en la base de datos
    },
    token: {
        type: String
    },
    confirmado: {
        type: Boolean,
        default: false // ** Por defecto va a ser false
    },
}, {
    timestamps: true // ** Crea las columnas de creado y actualizado
})

// ** Se ejecuta antes de almacenar el registro, creamos el hash para las passwords
usuarioSchema.pre('save', async function(next) {

    // ** Le decimos que no cambie el password en caso de que el usario haga cambios en su información.
    if(!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10) 
    this.password = await bcrypt.hash(this.password, salt)
})

// ** Creo una funcion que comprueba el password
usuarioSchema.methods.comprobarPassword = async function(passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.password)
}


const Usuario = mongoose.model("Usuario", usuarioSchema) // ** Definimos el modelo

export default Usuario