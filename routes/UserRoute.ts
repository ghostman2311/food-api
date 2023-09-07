import express from 'express'
import { UserSignUp } from '../controllers'

const router = express.Router()

router.post('/signup', UserSignUp)



export { router as UserRoute}