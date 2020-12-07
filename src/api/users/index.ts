import { Router } from 'express'
import { requireAuth } from '../../middlewares'
import { onboard } from './users.controller'

const router = Router()

router.post('/onboard', requireAuth, onboard)

export default router
