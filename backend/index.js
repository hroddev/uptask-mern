// const express = require("express") old sintaxis
import dotenv from 'dotenv'
dotenv.config()

import express from "express"
import usuarioRoutes from './routes/usuarioRoutes.js'
import proyectoRoutes from './routes/proyectoRoutes.js'

import conectarBD from "./config/db.js"

const app = express()
app.use(express.json())

conectarBD()

// Routing
app.use("/api/usuarios", usuarioRoutes)
app.use("/api/proyectos", proyectoRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log("Servidor en puerto 4000")
})