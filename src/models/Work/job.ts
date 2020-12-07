import mongoose from 'mongoose'
import { Work, IWorkAttrs, discriminatorKey } from './work'

const options = {
  discriminatorKey,
}

export interface IJobAttrs extends IWorkAttrs {
  compensation: {
    min: number
    max: number
  }
}

interface IJobDoc extends IJobAttrs, mongoose.Document {
  createdAt?: string
  updatedAt?: string
}

const JobSchema = new mongoose.Schema(
  {
    compensation: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
  },
  options
)

const Job = Work.discriminator<IJobDoc>('Job', JobSchema)

export { Job }
