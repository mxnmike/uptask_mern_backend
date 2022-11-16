import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoute.js'
import projectRoutes from './routes/projectRoutes.js'
import taskRoutes from './routes/taskRoutes.js'

dotenv.config()

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 4000

connectDB()

//Routing
app.use('/api/users', userRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/tasks', taskRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
