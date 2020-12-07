import mongoose from 'mongoose'
import { Work, IWorkAttrs, discriminatorKey } from './work'

const options = {
  discriminatorKey,
}

export interface IInternshipAttrs extends IWorkAttrs {
  duration: {
    count: number
    term?: string
  }
  compensation: {
    amount: number
    per?: string
  }
  startDate: Date
  partTimeAvailable?: boolean
}

interface IInternshipDoc extends IInternshipAttrs, mongoose.Document {
  createdAt?: string
  updatedAt?: string
}

const InternshipSchema = new mongoose.Schema(
  {
    duration: {
      count: { type: Number, required: true },
      term: { type: String, default: 'month' },
    },
    compensation: {
      amount: { type: Number, required: true },
      per: { type: String, default: 'month' },
    },
    startDate: { type: Date, required: true },
    partTimeAvailable: { type: Boolean, default: false },
  },
  options
)

const Internship = Work.discriminator<IInternshipDoc>(
  'Internship',
  InternshipSchema
)

export { Internship }
