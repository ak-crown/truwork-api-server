import { Request, Response } from 'express'
import { Work } from '../../models/Work'
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from '../../errors'
import { Application } from '../../models/application'

export const create = async (req: Request, res: Response) => {
  await Work.create({
    postedBy: req.currentUser?.id,
    ...req.body,
  })

  return res.status(201).send({ message: 'Posting created!' })
}

export const myPostings = async (req: Request, res: Response) => {
  const postings = await Work.find({
    postedBy: req.currentUser?.id,
  }).populate('applications')

  return res.send({ postings })
}

export const aPosting = async (req: Request, res: Response) => {
  const posting = await Work.findById(req.params.id).populate({
    path: 'applications',
    populate: [
      {
        path: 'user',
        select: 'name',
      },
      {
        path: 'work',
        select: 'type',
      },
    ],
  })

  if (!posting) throw new NotFoundError()

  return res.send(posting)
}

export const edit = async (req: Request, res: Response) => {
  const { id } = req.params

  const work = await Work.findOne({ _id: id }).lean()

  if (!work) throw new BadRequestError('The requested Job does not exists')

  /* only the poster can make changes to the posting */
  if (work.postedBy.toString() !== req.currentUser?.id) {
    throw new NotAuthorizedError()
  }

  /* remove critical fields for safety */
  delete req.body._id
  delete req.body.__v

  /* Can not change who posted the work */
  delete req.body.postedBy

  await Work.findByIdAndUpdate(work._id, {
    ...work,
    ...req.body,
  })

  return res.send({ message: 'Updated' })
}

export const close = async (req: Request, res: Response) => {
  const posting = await Work.findOne({ _id: req.params.id })

  if (!posting) throw new NotFoundError()

  if (posting.postedBy.toString() !== req.currentUser?.id)
    throw new NotAuthorizedError()

  /* reject all applications in `in-progress` state */
  await Application.updateMany(
    { work: req.params.id, status: 'in-progress' },
    { status: 'rejected' }
  )

  /* close the job posting now */
  await Work.updateOne({ _id: req.params.id }, { status: 'closed' })

  return res.send({ message: 'Closed' })
}

export const index = async (req: Request, res: Response) => {
  const postings = await Work.find({ status: 'open' })

  return res.send(postings)
}
