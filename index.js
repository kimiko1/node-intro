import express from 'express'
import 'dotenv/config'
import {movies} from './data/moviesData.js'
import movieRouter from './routes/movieRouter.js'
import  mongoose from 'mongoose'
import UserRouter from './routes/userRouter.js'
import CarRouter from './routes/carRouter.js'
import authRouter from './routes/authRouter.js'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT
const PASSWORD = process.env.MONGO_PASSWORD

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(movieRouter, UserRouter, CarRouter, authRouter)

const MONGO_URI = `mongodb+srv://kimiko:${PASSWORD}@cluster0.vgccc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(MONGO_URI)
const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"));

app.get('/', (request, response) => {
    response.send(`Welcome to my API`)
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))