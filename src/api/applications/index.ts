import { Router } from 'express'
import { body } from 'express-validator'
import { requireAuth, validateRequest } from '../../middlewares'
import {
  create,
  details,
  index,
  applicationForWork,
} from './application.controller'

const router = Router()

/* apply to a job posting */
router.post(
  '/',
  requireAuth,
  [body('work').isString().withMessage('work posting is required')],
  validateRequest,
  create
)

/* get all job applications on a particular work */
router.get('/for-work/:workId', requireAuth, applicationForWork)

/* get details of a particular job application that I applied to */
router.get('/:id', requireAuth, details)

/* get details of all job application by me */
router.get('/', requireAuth, index)

export default router
