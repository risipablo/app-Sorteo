
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const NombreModel = require('./models/participante')

require("dotenv").config();
const app = express();
app.use(express.json());

const corsOption = {
    origin: ['http://localhost:5173','https://app-sorteo-theta.vercel.app','https://app-sorteo.onrender.com'],
    methods: 'GET,POST,DELETE,PATCH',
    optionsSuccessStatus: 200
}

app.use(cors(corsOption))

mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log("Conexión con la base de datos"))
    .catch((err) => console.error("Conexión fallida: " + err))


app.get('/participantes', async (req,res) => {
    try {
        const nombres = await NombreModel.find();
        res.json(nombres)
    } catch (err) {
        res.status(500).json({ error: err.message})
    }
})

app.post('/add-participantes', async (req,res) => {
    const {nombre} = req.body;
    if(!nombre) {
        return res.status(400).json({ error: 'Faltas datos '})
    }
    try{
        const newNombre = new NombreModel({nombre})
        const result = await newNombre.save()
        res.json(result)
    } catch (err){
        console.error(err)
        res.status(500).json({ error: err.message})
    }
})

app.delete('/delete-participantes/:id', async (req,res) => {
    const {id} = req.params;
    try{
        const deleted = await NombreModel.findByIdAndDelete(id);
        res.json(deleted);
    } catch(err) {
        res.status(500).json({error: err.message})
    }
})

app.listen(3001, () => {
    console.log('Servidor funcionando en el puerto 3001');
})
