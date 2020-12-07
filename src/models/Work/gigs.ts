import mongoose from 'mongoose'
import { Work, IWorkAttrs, discriminatorKey } from './work'

const options = {
  discriminatorKey,
}

export interface IGigAttrs extends IWorkAttrs {
  duration: {
    count: number
    term: string
  }
  compensation: {
    amount: number
    per: string
  }
  startDate: Date
  partTimeAvailable?: boolean
}

interface IGigDoc extends IGigAttrs, mongoose.Document {
  createdAt?: string
  updatedAt?: string
}

const GigSchema = new mongoose.Schema(
  {
    duration: {
      count: { type: Number, required: true },
      term: { type: String, required: true },
    },
    compensation: {
      amount: { type: Number, required: true },
      per: { type: String, required: true },
    },
    startDate: { type: Date, required: true },
    partTimeAvailable: { type: Boolean, default: false },
  },
  options
)

const Gig = Work.discriminator<IGigDoc>('Gig', GigSchema)

export { Gig }
