import mongoose from "mongoose";
import bcript from 'bcrypt'

const usuarioSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    token: {
      type: String,
    },
    confirmado: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add hash in the passwords
usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next()
  }
  const salt = await bcript.genSalt(10)
  this.password = await bcript.hash(this.password, salt)
})

// compare the password in db and login
usuarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcript.compare(passwordFormulario, this.password)
}

const Usuario = mongoose.model("Usuario", usuarioSchema)

export default Usuario