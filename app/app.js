import express from 'express'
import connectDB from './db/config.js'

const app = express()
const port = process.env.PORT

await connectDB();

app.use(express.json())

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})