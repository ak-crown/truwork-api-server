import { Router } from 'express'

import localStrategyRoutes from './local'
import { User } from '../models/user'

const router = Router({
  mergeParams: true,
})

router.use('/local', localStrategyRoutes)

router.get('/current-user', async (req, res) => {
  const user = await User.findOne({ _id: req.currentUser?.id })

  if (!user) return res.send({})

  return res.send({ currentUser: user })
})

router.post('/signout', async (req, res) => {
  req.session = null
  return res.send({})
})

export default router
