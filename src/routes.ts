import { Router } from 'express'

import authRoutes from './auth'
import userRoutes from './api/users'
import workRoutes from './api/work'
import applicationRoutes from './api/applications'

const router = Router({
  mergeParams: true,
})

router.get('/ping', (_, res) => {
  return res.send({
    message: 'Server is alive!',
  })
})

router.use('/api/auth', authRoutes)
router.use('/api/users', userRoutes)
router.use('/api/work', workRoutes)
router.use('/api/application', applicationRoutes)

export default router
