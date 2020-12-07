import { Request, Response } from 'express'
import { Application } from '../../models/application'
import { Work } from '../../models/Work'
import { NotFoundError } from '../../errors'

export const create = async (req: Request, res: Response) => {
  const { work } = req.body

  const test = await Work.findOne({ _id: work, status: 'open' })

  if (!test) throw new NotFoundError()

  /* create a new application for the work posting */
  const application = await Application.build({
    work,
    user: req.currentUser!.id,
  })

  await application.save()

  /* add this new application to work posting */
  await Work.updateOne(
    { _id: work },
    {
      $push: {
        applications: application,
      },
    }
  )

  return res.status(201).send({ message: 'Applied' })
}

export const details = async (req: Request, res: Response) => {
  const { id } = req.params

  const application = await Application.findOne({
    _id: id,
    user: req.currentUser!.id,
  }).populate('work')

  if (!application) throw new NotFoundError()

  return res.send(application)
}

export const index = async (req: Request, res: Response) => {
  const applications = await Application.find({
    user: req.currentUser!.id,
  }).populate('work')

  return res.send(applications)
}

export const applicationForWork = async (req: Request, res: Response) => {
  const { workId } = req.params

  const applications = await Application.find({ work: workId }).populate(
    'user work'
  )

  return res.send(applications)
}
