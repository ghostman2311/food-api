import express from 'express'
import { UserSignUp, UserVerify } from '../controllers'
import { Authenticate } from '../middleware/commonAuth'

const router = express.Router()

router.post('/signup', UserSignUp)

router.use(Authenticate)

router.patch('/verify', UserVerify)

export { router as UserRoute}