import { Router } from 'express'
import { body } from 'express-validator'
import { signin, signup } from './local.controller'
import { validateRequest } from '../../middlewares'

const router = Router({
  mergeParams: true,
})

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 5, max: 20 })
      .withMessage('Password must be between 5 and 20 characters'),
  ],
  validateRequest,
  signup
)

router.post(
  '/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  signin
)

export default router
