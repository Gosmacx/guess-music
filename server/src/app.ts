import express from "express";
import router from './api'
import cors from 'cors'

const PORT = 3030 as number
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(router)

app.listen(PORT, () => {
    console.log(`Server running on ${PORT} port.`)
})