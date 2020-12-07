import { Router } from 'express'
import { requireAuth } from '../../middlewares'
import {
  create,
  myPostings,
  aPosting,
  edit,
  close,
  index,
} from './work.controller'

const router = Router()

/* Create a Work (Job, Gig, Internship) posting */
router.post('/', requireAuth, create)

/* Get all Work postings by me */
router.get('/posts', requireAuth, myPostings)

/* Get all Work posting available */
router.get('/posts/all', index)

/* get all details of a work post */
router.get('/post/:id', aPosting)

/* edit a particular job posting */
router.patch('/post/:id', requireAuth, edit)

/* delete a job posting */
router.delete('/post/:id', requireAuth, close)

export default router
